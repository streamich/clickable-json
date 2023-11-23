import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {ClickableJsonCrdt} from '.';
import {Model} from 'json-joy/es2020/json-crdt';
import {s} from 'json-joy/es2020/json-crdt-patch';

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

const doc1 = {
  support: 'https://github.com/sponsors/streamich',
  license: 'use it if you support me',
  foo: null,
  test: 123,
  developer: {
    name: '@streamich',
  },
};

const model = Model.withLogicalClock();
// model.api.root(s.con([123, null]));
// model.api.root(s.val(s.con([123, null])));
model.api.root({foo: s.con([123, null]), bar: true});

console.log(model + '');

export const Primary: StoryObj<typeof meta> = {
  render: () => <ClickableJsonCrdt model={model} />,
};
