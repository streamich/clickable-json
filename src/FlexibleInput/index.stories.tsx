import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {FlexibleInput as Component} from '.';

const meta: Meta<typeof Text> = {
  title: 'FlexibleInput',
  component: Component as any,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    value: 'Typ',
    typeahead: 'e something here',
  } as any,
};

const InteractiveDemo: React.FC = () => {
  const [value, setValue] = React.useState('Hello World');
  return (
    <div>
      <Component
        value={value}
        typeahead={value === 'n' ? 'ull' : value === 'f' ? 'alse' : ''}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>Value: {value}</div>
    </div>
  );
};

export const Interactive: StoryObj<typeof meta> = {
  args: {},
  render: () => <InteractiveDemo />,
};
