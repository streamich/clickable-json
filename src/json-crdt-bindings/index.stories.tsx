import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Model} from 'json-joy/es2020/json-crdt';
import {JsonCrdtBinding} from './input';

const Demo: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const model = React.useMemo(() => Model.withLogicalClock(), [1]);
  React.useSyncExternalStore(model.api.subscribe, () => model.tick);
  React.useEffect(() => {
    if (!inputRef.current) return;
    const input = inputRef.current;
    model.api.root({text: 'Hell'});
    const unbind = JsonCrdtBinding.bind(model, ['text'], input);
    return () => {
      unbind();
    };
  }, [model]);


  return (
    <div>
      <input ref={inputRef} type="text" />
      <pre style={{fontSize: '10px'}}>
        <code>
          {model + ''}
        </code>
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
  args: {
  },
};
