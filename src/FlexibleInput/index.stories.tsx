import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {FlexibleInput as Component, FlexibleInputProps} from '.';

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

const InteractiveDemo: React.FC<Omit<FlexibleInputProps, 'value' | 'onChange'> & {noDemoDebug?: boolean}> = ({
  noDemoDebug,
  ...props
}) => {
  const [value, setValue] = React.useState('Hello World');
  return (
    <div>
      <div style={{border: '1px solid #bbb', borderRadius: 4, display: 'inline-block', padding: '4px 8px'}}>
        <Component
          {...props}
          value={value}
          typeahead={props.typeahead || (value === 'n' ? 'ull' : value === 'f' ? 'alse' : '')}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {!noDemoDebug && <div>Value: {value}</div>}
    </div>
  );
};

export const Interactive: StoryObj<typeof meta> = {
  args: {},
  render: () => <InteractiveDemo />,
};

export const Multiline: StoryObj<typeof meta> = {
  args: {},
  render: () => <InteractiveDemo multiline noDemoDebug />,
};

export const MinWidth: StoryObj<typeof meta> = {
  args: {},
  render: () => <InteractiveDemo minWidth={200} />,
};

export const MaxWidth: StoryObj<typeof meta> = {
  args: {},
  render: () => <InteractiveDemo maxWidth={200} />,
};

export const ExtraWidth: StoryObj<typeof meta> = {
  args: {},
  render: () => <InteractiveDemo extraWidth={100} />,
};
