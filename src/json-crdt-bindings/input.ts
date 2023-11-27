import type {Model, StrApi, ApiPath} from "json-joy/es2020/json-crdt";
import diff from 'fast-diff';

const enum DIFF_CHANGE_TYPE {
  DELETE = -1,
  EQUAL = 0,
  INSERT = 1,
}

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
    const changes = diff(view, value);
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
    // console.log(str.view(), value);
    // console.log(this.model.tick);
  }

  public syncFromEvent(event: InputEvent) {
    const {str, input} = this;
    this.selectionStart = input.selectionStart;
    this.selectionEnd = input.selectionEnd;
  }

  public bindFromInput() {
    this.input.addEventListener('input', this.onInput);
  }

  private readonly onInput = (event: Event) => {
    // this.syncFromEvent(event as InputEvent);
    this.syncFromInput();

  };

  public unbind = () => {
    this.input.removeEventListener('input', this.onInput);
  };
}
