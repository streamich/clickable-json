import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {ClickableJson} from '.';
import {applyPatch, Operation} from 'json-joy/lib/json-patch';

const meta: Meta<typeof Text> = {
  title: 'ClickableJson',
  component: ClickableJson as any,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

const doc1 = {
  support: 'https://github.com/sponsors/streamich',
  license: 'use it if you support me',
  foo: null,
  test: 123,
  developer: {
    name: '@streamich',
  },
};

const doc2 = {
  id: 'pj7ryzaia1',
  model: 1.6,
  cid: 'og6f0o9v1c',
  type: 'p',
  created: 1596445997247,
  modified: 1596445997381,
  pid: '92lmu7fs9a',
  depth: 1,
  mime: 'image/png',
  ext: 'png',
  file: 'image.png',
  w: 624,
  h: 1390,
  omark: [{x1: 0.027777777777777776, y1: 0.8438848920863309, x2: 0.25, y2: 0.8827338129496403}],
  isPost: true,
  isMature: false,
  parent: null,
  poster: {
    id: 'xxsdfasdf-asdf-asdf-asdf-asdfasdfasdf',
    name: 'Muhammad',
    list: [1, -5, true, false, null, 'asdf'],
  },
};

export const Primary: StoryObj<typeof meta> = {
  args: {
    doc: doc1,
    onChange: (patch: unknown) => console.log('onChange', patch),
  } as any,
};

export const Post: StoryObj<typeof meta> = {
  args: {
    doc: doc2,
    onChange: (patch: unknown) => console.log('onChange', patch),
  } as any,
};

export const Readonly: StoryObj<typeof meta> = {
  args: {
    doc: doc1,
  } as any,
};

export const FormalAndCompact: StoryObj<typeof meta> = {
  args: {
    doc: doc1,
    formal: true,
    compact: true,
  } as any,
};

const Demo: React.FC<{doc: unknown}> = (props) => {
  const [doc, setDoc] = React.useState<unknown>(props.doc);
  const onChange = (patch: Operation[]) => {
    const result = applyPatch(doc, patch, {mutate: false});
    setDoc(result.doc);
  };
  return (
    <div style={{padding: '32px 64px'}}>
      <ClickableJson doc={doc} onChange={onChange} />
    </div>
  );
};

export const Interactive: StoryObj<typeof meta> = {
  render: () => <Demo doc={doc1} />,
  parameters: {
    layout: 'fullscreen',
  },
};

export const InteractiveEmpty: StoryObj<typeof meta> = {
  render: () => <Demo doc={null} />,
  parameters: {
    layout: 'fullscreen',
  },
};

export const InteractiveLarge: StoryObj<typeof meta> = {
  render: () => <Demo doc={doc2} />,
  parameters: {
    layout: 'fullscreen',
  },
};
