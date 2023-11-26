import * as React from 'react';
import {ClickableJsonCrdt, ClickableJsonCrdtProps} from '.';
import {Model} from 'json-joy/es2020/json-crdt';
import {s} from 'json-joy/es2020/json-crdt-patch';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof Text> = {
  title: 'ClickableJsonCrdt',
  component: ClickableJsonCrdt as any,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

const Demo: React.FC<{view?: unknown} & Omit<ClickableJsonCrdtProps, 'model'>> = ({view, ...rest}) => {
  const model = React.useMemo(() => {
    const model = Model.withLogicalClock();
    if (view !== undefined) model.api.root(view);
    return model;
  }, []);

  return (
    <div style={{padding: '32px 64px'}}>
      <ClickableJsonCrdt {...rest} model={model} />
    </div>
  );
};

const schema1 = {
  foo: s.con([123, [null]]),
  bar: true,
  baz: {x: 1, val: s.val(s.con(true))},
  emptyObject: {},
  qux: s.vec(s.con(1), s.con(-2), s.con('three'), s.con({four: 4})),
  arr: [s.con(0), 'hello world', -5, s.val(s.val(s.con(null))), s.val(s.con({foo: 'bar'}))],
  bin: s.bin(new Uint8Array([1, 2, 3, 4, 5])),
};

export const Primary: StoryObj<typeof meta> = {
  render: () => <Demo view={schema1} />,
  parameters: {
    layout: 'fullscreen',
  },
};

export const ShowRoot: StoryObj<typeof meta> = {
  render: () => <Demo view={schema1} showRoot />,
  parameters: {
    layout: 'fullscreen',
  },
};

export const EmptyDoc: StoryObj<typeof meta> = {
  render: () => <Demo />,
  parameters: {
    layout: 'fullscreen',
  },
};

export const ConstantRoot: StoryObj<typeof meta> = {
  render: () => <Demo view={s.con(123456789)} />,
  parameters: {
    layout: 'fullscreen',
  },
};

export const ConstantRootJson: StoryObj<typeof meta> = {
  render: () => <Demo view={s.con({foo: [123, 'bar']})} />,
  parameters: {
    layout: 'fullscreen',
  },
};


export const LongBinary: StoryObj<typeof meta> = {
  render: () => <Demo view={{binaryData: s.bin(new Uint8Array([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136,
    137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 255, 254, 253, 252, 251, 250, 249,
    248, 247, 246, 245, 244, 243, 242, 241, 240, 239, 238, 128, 127, 126, 125, 124, 123,
    122, 121, 120, 119, 118, 117, 116, 115, 114, 113, 112, 111, 128, 127, 126, 125, 124,
    123, 122, 121, 120, 119, 118, 117, 116, 115, 114, 113, 112, 111, 128, 127, 126, 125,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136,
    137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 255, 254, 253, 252, 251, 250, 249,
    248, 247, 246, 245, 244, 243, 242, 241, 240, 239, 238, 128, 127, 126, 125, 124, 123,
    122, 121, 120, 119, 118, 117, 116, 115, 114, 113, 112, 111, 128, 127, 126, 125, 124,
    123, 122, 121, 120, 119, 118, 117, 116, 115, 114, 113, 112, 111, 128, 127, 126, 125,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136,
    137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 255, 254, 253, 252, 251, 250, 249,
    248, 247, 246, 245, 244, 243, 242, 241, 240, 239, 238, 128, 127, 126, 125, 124, 123,
    122, 121, 120, 119, 118, 117, 116, 115, 114, 113, 112, 111, 128, 127, 126, 125, 124,
    123, 122, 121, 120, 119, 118, 117, 116, 115, 114, 113, 112, 111, 128, 127, 126, 125,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136,
    137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 255, 254, 253, 252, 251, 250, 249,
    248, 247, 246, 245, 244, 243, 242, 241, 240, 239, 238, 128, 127, 126, 125, 124, 123,
    122, 121, 120, 119, 118, 117, 116, 115, 114, 113, 112, 111, 128, 127, 126, 125, 124,
    123, 122, 121, 120, 119, 118, 117, 116, 115, 114, 113, 112, 111, 128, 127, 126, 125,
  ]))}} />,
  parameters: {
    layout: 'fullscreen',
  },
};
