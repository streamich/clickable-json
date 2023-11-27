import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Model} from 'json-joy/es2020/json-crdt';
import {StrBinding} from './input';

const Demo: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const model = React.useMemo(() => Model.withLogicalClock(), [1]);
  React.useSyncExternalStore(model.api.subscribe, () => model.tick);
  React.useEffect(() => {
    if (!inputRef.current) return;
    const input = inputRef.current;
    model.api.root({text: 'Hell'});
    const unbind = StrBinding.bind(model.api.str(['text']), input, true);
    return () => {
      unbind();
    };
  }, [model]);

  return (
    <div>
      <input ref={inputRef} type="text" />
      <div>
        <button
          onClick={() => {
            const input = inputRef.current;
            if (!input) return;
            input.value += '!';
          }}
        >
          Append "!" to input
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            const str = model.api.str(['text']);
            str.ins(str.view().length, '?');
          }}
        >
          Append "?" to model
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setTimeout(() => {
              const str = model.api.str(['text']);
              str.ins(str.view().length, '?');
            }, 2000);
          }}
        >
          Append "?" to model after 2s
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setTimeout(() => {
              const str = model.api.str(['text']);
              str.ins(0, '1. ');
            }, 2000);
          }}
        >
          Prepend "1. " to model after 2s
        </button>
      </div>
      <pre style={{fontSize: '10px'}}>
        <code>{model.root + ''}</code>
      </pre>
    </div>
  );
};

const meta: Meta<typeof Text> = {
  title: 'Input Binding Demo',
  component: Demo as any,
  argTypes: {},
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {},
};
