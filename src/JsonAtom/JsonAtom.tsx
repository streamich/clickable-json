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
  let formatted = '∅';

  if (Array.isArray(value)) {
    color = blue;
    formatted = '[' + value.length + ']';
  } else if (value && typeof value === 'object') {
    color = blue;
    formatted = '{' + Object.keys(value).length + '}';
  } else {
    color = valueColor(!theme.isLight, value) ?? color;
    formatted = React.useMemo(
      () =>
        value === null
          ? 'null'
          : typeof value === 'boolean'
            ? value
              ? 'true'
              : 'false'
            : typeof value === 'string'
              ? JSON.stringify(value)
              : String(value),
      [value, theme],
    );
  }

  return (
    <span style={{color}} onClick={onClick}>
      {formatted}
    </span>
  );
};
