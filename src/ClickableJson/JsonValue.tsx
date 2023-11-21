import * as React from 'react';
import AutosizeInput from '../AutosizeInput';
import * as css from '../css';
import {JsonProperty} from './JsonProperty';
import type {OnChange} from './types';
import {useTheme} from 'nano-theme';

export interface JsonValueProps {
  pointer: string;
  property?: string | number;
  doc: unknown;
  comma?: boolean;
  onChange?: OnChange;
}

export const JsonValue: React.FC<JsonValueProps> = (props) => {
  const {pointer, property, doc, comma, onChange} = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const className = React.useMemo(
    () =>
      doc === null
        ? css.nil
        : typeof doc === 'boolean'
          ? (theme.isLight ? css.bool : css.boolDark)
          : typeof doc === 'string'
            ? css.str
            : doc === Math.round(Number(doc))
              ? (theme.isLight ? css.num : css.numDark)
              : (theme.isLight ? css.float : css.floatDark),
    [doc],
  );
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
    [doc],
  );
  const [proposed, setProposed] = React.useState(value);
  const [focused, setFocused] = React.useState(false);
  React.useEffect(() => {
    setProposed(value);
  }, [value]);

  const onSubmit = (e: React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (e) e.stopPropagation();
    let newValue;
    try {
      newValue = JSON.parse(proposed);
    } catch {
      newValue = String(proposed);
    }
    if (onChange) onChange([{op: 'replace', path: pointer, value: newValue}]);
  };

  return (
    <>
      {typeof property === 'string' && <JsonProperty pointer={pointer} onChange={onChange} />}
      {!onChange ? (
        <span className={className}>{value}</span>
      ) : (
        <AutosizeInput
          inputRef={(el) => ((inputRef as any).current = el)}
          inputClassName={className + css.input}
          value={focused ? proposed : value}
          onChange={(e) => setProposed(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
              if (inputRef.current) inputRef.current.blur();
              onSubmit(e);
            } else if (e.key === 'Escape') {
              if (value !== proposed) setProposed(value);
              else if (inputRef.current) inputRef.current.blur();
            }
          }}
        />
      )}
      {!!comma && ','}
    </>
  );
};
