import * as React from 'react';
import {ClickableJsonCrdt} from '.';
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

const model = Model.withLogicalClock();
// model.api.root(s.con([123, null]));
// model.api.root(s.val(s.con([123, null])));
// model.api.root({foo: s.con([123, null]), bar: true, baz: {x: 1}});
model.api.root({
  foo: s.con([123, [null]]),
  bar: true,
  baz: {x: 1},
  qux: s.vec(s.con(1), s.con(-2), s.con('three'), s.con({four: 4})),
  arr: [s.con(0), 'hello world'],
});

console.log(model + '');

export const Primary: StoryObj<typeof meta> = {
  render: () => (
    <div style={{padding: '32px 64px'}}>
      <ClickableJsonCrdt model={model} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
