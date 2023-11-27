import type {Model, StrApi, ApiPath} from "json-joy/es2020/json-crdt";
import {ITimestampStruct} from "json-joy/es2020/json-crdt-patch/clock";
import diff from 'fast-diff';
import {invokeFirstOnly} from "../utils/invokeFirstOnly";

const enum DIFF_CHANGE_TYPE {
  DELETE = -1,
  EQUAL = 0,
  INSERT = 1,
}

type SimpleChange = [position: number, remove: number, insert: string];

const applyChange = (str: string, [position, remove, insert]: SimpleChange): string =>
  str.slice(0, position) + insert + str.slice(position + remove);

const indexToId = (str: StrApi, index: number): ITimestampStruct | void => {
  return str.node.find(index)
};

const idToIndex = (str: StrApi, id: ITimestampStruct): number => {
  const chunk = str.node.findById(id);
  if (!chunk) return -1;
  const pos = str.node.pos(chunk);
  return pos + (id.time - chunk.id.time)
};

export class JsonCrdtBinding {
  public static bind = (model: Model, path: ApiPath, input: HTMLInputElement, polling?: boolean): (() => void) => {
    const str = model.api.str(path);
    const binding = new JsonCrdtBinding(model, str, input);
    binding.syncFromModel();
    binding.bind(polling);
    return binding.unbind;
  };

  /** Selection start before `input` event execution. */
  protected selectionStart: number | null = null;
  /** Selection end before `input` event execution. */
  protected selectionEnd: number | null = null;

  protected readonly firstOnly = invokeFirstOnly();

  constructor(protected readonly model: Model, protected readonly str: StrApi, protected readonly input: HTMLInputElement) {}

  // ------------------------------------------------------ Model-to-Input sync

  public syncFromModel() {
    const {input, str} = this;
    input.value = str.view();
  }

  protected readonly onModelChange = () => {
    this.firstOnly(() => {
      const input = this.input;
      const {selectionStart, selectionEnd, selectionDirection} = input;
      console.log(selectionStart, selectionEnd);
      const startId: ITimestampStruct | void = typeof selectionStart === 'number' ? indexToId(this.str, selectionStart) : undefined;
      const endId: ITimestampStruct | void = typeof selectionEnd === 'number' ? indexToId(this.str, selectionEnd) : undefined;
      this.syncFromModel(); // TODO: need "beforeChange" event...
      const startPos = startId ? idToIndex(this.str, startId) : null;
      const endPos = endId ? idToIndex(this.str, endId) : null;
      console.log(startPos, endPos);
      console.log('model changed ....');
      // this.syncFromModel
    });
  };

  // ------------------------------------------------------ Input-to-Model sync

  public syncFromInput() {
    const {str, input} = this;
    const view = str.view();
    const value = input.value;
    if (value === view) return;
    const caretPos: number | undefined = (typeof input.selectionStart === 'number') && (input.selectionStart === input.selectionEnd)
      ? input.selectionStart : undefined;
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
        const {selectionStart, selectionEnd} = this;
        if (typeof selectionStart !== 'number' || typeof selectionEnd !== 'number') return;
        if (selectionStart === selectionEnd) return;
        const min = Math.min(selectionStart, selectionEnd);
        const max = Math.max(selectionStart, selectionEnd);
        const str = this.str;
        const view = str.view();
        const input = this.input;
        const value = input.value;
        if (view.length - value.length !== max - min) return;
        return [min, max - min, ''];
      }
      case 'insertFromPaste': {
        const {selectionStart, selectionEnd} = this;
        if (typeof selectionStart !== 'number' || typeof selectionEnd !== 'number') return;
        const min = Math.min(selectionStart, selectionEnd);
        const max = Math.max(selectionStart, selectionEnd);
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
      this.selectionStart = input.selectionStart;
      this.selectionEnd = input.selectionEnd;
    });
  };

  private readonly onSelectionChange = (event: Event) => {
    const input = this.input;
    this.selectionStart = input.selectionStart;
    this.selectionEnd = input.selectionEnd;
  };

  // ------------------------------------------------------------------ Polling

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
