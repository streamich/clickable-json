import * as React from 'react';
import {theme, useTheme} from 'nano-theme';
import {valueColor} from '../ClickableJson/utils';

const blue = theme.color.sem.blue[0];

export interface JsonAtomProps {
  value: unknown;
  onClick?: React.MouseEventHandler;
}

export const JsonAtom: React.FC<JsonAtomProps> = (props) => {
  const {value, onClick} = props;
  const theme = useTheme();

  let color = theme.g(0.2);
  let formatted: React.ReactNode = '∅';

  if (Array.isArray(value)) {
    color = blue;
    formatted = '[' + value.length + ']';
  } else if (value instanceof Uint8Array) {
    color = theme.g(0.45);
    formatted = (
      <span>
        <span style={{color: theme.red(1), fontSize: '0.8em', fontWeight: 'bold'}}>0x</span>
        {[...value].map((n) => (n < 16 ? '0' + n.toString(16) : n.toString(16))).join(' ')}
      </span>
    );
  } else if (value && typeof value === 'object') {
    color = blue;
    formatted = '{' + Object.keys(value).length + '}';
  } else {
    color = valueColor(!theme.isLight, value) ?? color;
    formatted = typeof value === 'string' ? JSON.stringify(value) : String(value);
  }

  return (
    <span style={{color}} onClick={onClick}>
      {formatted}
    </span>
  );
};
