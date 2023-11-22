import * as React from 'react';
import {useTheme} from 'nano-theme';
import {JsonProperty} from './JsonProperty';
import {ValueInput, valueColor} from './ ValueInput';
import type {OnChange} from './types';

export interface JsonValueProps {
  pointer: string;
  property?: string | number;
  doc: unknown;
  comma?: boolean;
  onChange?: OnChange;
}

export const JsonValue: React.FC<JsonValueProps> = (props) => {
  const {pointer, property, doc, comma, onChange} = props;
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
      {typeof property === 'string' && <JsonProperty pointer={pointer} onChange={onChange} />}
      {!onChange ? (
        <span style={{color: valueColor(!theme.isLight, doc)}}>{value}</span>
      ) : (
        <ValueInput value={doc} onChange={handleChange} />
      )}
      {!!comma && ','}
    </>
  );
};
