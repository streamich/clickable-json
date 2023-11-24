import * as React from 'react';
import {theme, useTheme} from 'nano-theme';
import {valueColor} from '../ClickableJson/utils';

const blue = theme.color.sem.blue[0];

export interface JsonAtomProps {
  value: unknown;
}

export const JsonAtom: React.FC<JsonAtomProps> = (props) => {
  const {value} = props;
  const theme = useTheme();

  if (Array.isArray(value)) {
    return <span style={{color: blue}}>{'['}{value.length}{']'}</span>;
  } else if (value && typeof value === 'object') {
    return <span style={{color: blue}}>{'{'}{Object.keys(value).length}{'}'}</span>;
  }

  const formatted = React.useMemo(
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

  return (
    <span style={{color: valueColor(!theme.isLight, value)}}>{formatted}</span>
  );
};
