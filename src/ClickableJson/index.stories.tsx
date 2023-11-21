import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {ClickableJson} from '.';

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
  foo: 'bar',
  test: null,
  inner: {
    name: 'Vadim',
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
    list: [1, true, false, null, 'asdf'],
  },
};

export const Primary: StoryObj<typeof meta> = {
  args: {
    value: doc1,
    onChange: (patch: unknown) => console.log('onChange', patch),
  } as any,
};
