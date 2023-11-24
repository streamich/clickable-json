import * as React from 'react';
import {useTheme} from 'nano-theme';
import {JsonProperty} from './JsonProperty';
import {ValueInput} from './ValueInput';
import {valueColor} from './utils';
import type {OnChange} from './types';

export interface JsonValueProps {
  pointer: string;
  property?: string | number;
  doc: unknown;
  parentCollapsed?: boolean;
  comma?: boolean;
  onChange?: OnChange;
}

export const JsonValue: React.FC<JsonValueProps> = (props) => {
  const {pointer, property, doc, parentCollapsed, comma, onChange} = props;
  const theme = useTheme();
  const value = React.useMemo(
    () =>
      doc === null
        ? 'null'
        : typeof doc === 'boolean'
          ? doc
            ? 'true'
            : 'false'
          : typeof doc === 'string'
            ? JSON.stringify(doc)
            : String(doc),
    [doc, theme],
  );

  const handleChange = (newValue: unknown) => {
    if (onChange) onChange([{op: 'replace', path: pointer, value: newValue}]);
  };

  return (
    <>
      {typeof property === 'string' && (
        <JsonProperty key={'k' + String(parentCollapsed)} pointer={pointer} onChange={onChange} />
      )}
      {!onChange ? (
        <span style={{color: valueColor(!theme.isLight, doc)}}>{value}</span>
      ) : (
        <ValueInput key={String(parentCollapsed)} value={doc} onChange={handleChange} />
      )}
      {!!comma && ','}
    </>
  );
};
