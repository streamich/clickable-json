import diff from 'fast-diff';
import {invokeFirstOnly} from '../utils/invokeFirstOnly';
import {Selection} from './Selection';
import {applyChange, idToIndex, indexToId} from './util';
import {SimpleChange} from './types';
import type {StrApi} from 'json-joy/es2020/json-crdt';

const enum DIFF_CHANGE_TYPE {
  DELETE = -1,
  EQUAL = 0,
  INSERT = 1,
}

export class StrBinding {
  public static bind = (str: StrApi, input: HTMLInputElement, polling?: boolean): (() => void) => {
    const binding = new StrBinding(str, input);
    binding.syncFromModel();
    binding.bind(polling);
    return binding.unbind;
  };

  protected readonly selection = new Selection();
  protected readonly firstOnly = invokeFirstOnly();

  constructor(
    protected readonly str: StrApi,
    protected readonly input: HTMLInputElement,
  ) {}

  // ---------------------------------------------------------------- Selection
  // We constantly keep track of the selection state, which is stored in the
  // Selection class. The selection state is updated on every input event and
  // selectionchange event, and in other cases. The selection state, keeps track
  // of, both, the local and remote selection state.

  protected saveSelection() {
    const {str, input, selection} = this;
    const {selectionStart, selectionEnd, selectionDirection} = input;
    const {start, end} = selection;
    const now = Date.now();
    const tick = str.api.model.tick;
    // Return early to avoid excessive RGA queries.
    if (start === selectionStart && end === selectionEnd && (tick === selection.tick || now - selection.ts < 3000))
      return;
    selection.start = selectionStart;
    selection.end = selectionEnd;
    selection.dir = selectionDirection;
    selection.ts = now;
    selection.tick = tick;
    selection.startId = typeof selectionStart === 'number' ? indexToId(this.str, selectionStart ?? 0) ?? null : null;
    selection.endId = typeof selectionEnd === 'number' ? indexToId(this.str, selectionEnd ?? 0) ?? null : null;
  }

  // ------------------------------------------------------ Model-to-Input sync
  // We can always sync the model to the input. However, it is done only in
  // two cases: (1) on initial binding, and (2) when the model receives remote
  // changes. The latter is done by listening to the changes event on the str
  // instance.

  public syncFromModel() {
    const {input, str} = this;
    input.value = str.view();
  }

  protected readonly onModelChange = () => {
    this.firstOnly(() => {
      this.syncFromModel();
      const {input, selection} = this;
      const start = selection.startId ? idToIndex(this.str, selection.startId) : null;
      const end = selection.endId ? idToIndex(this.str, selection.endId) : null;
      input.setSelectionRange(start, end, selection.dir ?? undefined);
    });
  };

  // ------------------------------------------------------ Input-to-Model sync
  // The main synchronization is from the input to the model. This is done by
  // listening to the input event, most of the time, using the
  // `changeFromEvent()`. However, some changes might be too complex, in which
  // case the implementation bails out of granular input synchronization and
  // instead synchronizes the whole input value with the model. The whole state
  // synchronization is done by `syncFromInput()`, which uses the char-by-char
  // diffing algorithm to compute the changes.

  public syncFromInput() {
    const {str, input} = this;
    const view = str.view();
    const value = input.value;
    if (value === view) return;
    const caretPos: number | undefined =
      typeof input.selectionStart === 'number' && input.selectionStart === input.selectionEnd
        ? input.selectionStart
        : undefined;
    const changes = diff(view, value, caretPos);
    const changeLen = changes.length;
    let pos: number = 0;
    for (let i = 0; i < changeLen; i++) {
      const change = changes[i];
      const [type, text] = change;
      switch (type) {
        case DIFF_CHANGE_TYPE.DELETE: {
          str.del(pos, text.length);
          break;
        }
        case DIFF_CHANGE_TYPE.EQUAL: {
          pos += text.length;
          break;
        }
        case DIFF_CHANGE_TYPE.INSERT: {
          str.ins(pos, text);
          pos += text.length;
          break;
        }
      }
    }
  }

  protected changeFromEvent(event: InputEvent): SimpleChange | undefined {
    const {input} = this;
    const {data, inputType, isComposing} = event;
    if (isComposing) return;
    switch (inputType) {
      case 'deleteContentBackward': {
        break;
      }
      case 'deleteByCut': {
        const {start, end} = this.selection;
        if (typeof start !== 'number' || typeof end !== 'number') return;
        if (start === end) return;
        const min = Math.min(start, end);
        const max = Math.max(start, end);
        const str = this.str;
        const view = str.view();
        const input = this.input;
        const value = input.value;
        if (view.length - value.length !== max - min) return;
        return [min, max - min, ''];
      }
      case 'insertFromPaste': {
        const {start, end} = this.selection;
        if (typeof start !== 'number' || typeof end !== 'number') return;
        const min = Math.min(start, end);
        const max = Math.max(start, end);
        const str = this.str;
        const view = str.view();
        const input = this.input;
        const value = input.value;
        const newMax = Math.max(input.selectionStart ?? 0, input.selectionEnd ?? 0);
        if (newMax <= min) return;
        const remove = max - min;
        const insert = value.slice(min, newMax);
        if (value.length !== view.length - remove + insert.length) return;
        return [min, remove, insert];
      }
      case 'insertText': {
        if (!data || data.length !== 1) return;
        const {selectionStart, selectionEnd} = input;
        if (selectionStart === null || selectionEnd === null) return;
        if (selectionStart !== selectionEnd) return;
        if (selectionStart <= 0) return;
        return [selectionStart - 1, 0, data];
      }
    }
    return;
  }

  private readonly onInput = (event: Event) => {
    this.firstOnly(() => {
      const input = this.input;
      const change = this.changeFromEvent(event as InputEvent);
      if (change) {
        const view = this.str.view();
        const value = input.value;
        const expected = applyChange(view, change);
        if (expected === value) {
          const str = this.str;
          const [position, remove, insert] = change;
          if (remove) str.del(position, remove);
          if (insert) str.ins(position, insert);
        }
      }
      this.syncFromInput();
      this.saveSelection();
    });
  };

  private readonly onSelectionChange = () => {
    this.saveSelection();
  };

  // ------------------------------------------------------------------ Polling
  // Some changes to the input are not captured by the `input`, nor `change`
  // events. For example, when input is modified programmatically
  // `input.value = '...'`. To capture such changes, on can opt-in to polling
  // by calling `bind(true)`. The polling interval can be configured by
  // setting the `pollingInterval` property.

  public pollingInterval: number = 1000;
  private pollingRef: number | null | unknown = null;

  private readonly pollChanges = () => {
    this.pollingRef = setTimeout(() => {
      this.firstOnly(() => {
        try {
          const {input, str} = this;
          const view = str.view();
          const value = input.value;
          if (view !== value) this.syncFromInput();
        } catch {}
        if (this.pollingRef) this.pollChanges();
      });
    }, this.pollingInterval);
  };

  public stopPolling() {
    if (this.pollingRef) clearTimeout(this.pollingRef as any);
    this.pollingRef = null;
  }

  // ------------------------------------------------------------------ Binding

  private unsubscribeModel: (() => void) | null = null;

  public readonly bind = (polling?: boolean) => {
    const input = this.input;
    input.addEventListener('input', this.onInput);
    document.addEventListener('selectionchange', this.onSelectionChange);
    if (polling) this.pollChanges();
    this.unsubscribeModel = this.str.events.changes.listen(this.onModelChange);
  };

  public readonly unbind = () => {
    const input = this.input;
    input.removeEventListener('input', this.onInput);
    document.removeEventListener('selectionchange', this.onSelectionChange);
    this.stopPolling();
    if (this.unsubscribeModel) this.unsubscribeModel();
  };
}
