import type {Model, StrApi, ApiPath} from "json-joy/es2020/json-crdt";
import diff from 'fast-diff';

const enum DIFF_CHANGE_TYPE {
  DELETE = -1,
  EQUAL = 0,
  INSERT = 1,
}

type SimpleChange = [position: number, remove: number, insert: string];

const applyChange = (str: string, [position, remove, insert]: SimpleChange): string =>
  str.slice(0, position) + insert + str.slice(position + remove);

export class JsonCrdtBinding {
  public static bind = (model: Model, path: ApiPath, input: HTMLInputElement): (() => void) => {
    const str = model.api.str(path);
    const binding = new JsonCrdtBinding(model, str, input);
    binding.syncFromModel();
    binding.bindFromInput();
    return binding.unbind;
  };

  protected selectionStart: number | null = null;
  protected selectionEnd: number | null = null;

  constructor(protected readonly model: Model, protected readonly str: StrApi, protected readonly input: HTMLInputElement) {}

  public syncFromModel() {
    const {input, str} = this;
    input.value = str.view();
  }

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

  public bindFromInput() {
    this.input.addEventListener('input', this.onInput);
  }

  private readonly onInput = (event: Event) => {
    const input = this.input;
    const change = this.changeFromEvent(event as InputEvent);
    let needsStateSync = true;
    if (change) {
      const view = this.str.view();
      const value = input.value;
      const expected = applyChange(view, change);
      if (expected === value) {
        needsStateSync = false;
        const str = this.str;
        const [position, remove, insert] = change;
        if (remove) str.del(position, remove);
        if (insert) str.ins(position, insert);
      }
    }
    if (needsStateSync) this.syncFromInput();
    this.selectionStart = input.selectionStart;
    this.selectionEnd = input.selectionEnd;
  };

  public unbind = () => {
    this.input.removeEventListener('input', this.onInput);
  };
}
