import * as React from 'react';
import {useTheme} from 'nano-theme';
import AutosizeInput from '../AutosizeInput';
import * as css from '../css';
import {JsonProperty} from './JsonProperty';
import type {OnChange} from './types';

const inputColor = (isDark: boolean, input: string): string | undefined => {
  input = input.trim();
  if (input === 'true' || input === 'false') return css.ValueColor.bool[~~isDark];
  if (input === 'null') return css.ValueColor.nil[~~isDark];
  if (input.length < 24) {
    if (input[0] === '-' || (input[0] >= '0' && input[0] <= '9')) {
      try {
        const parsed = JSON.parse(input);
        if (typeof parsed === 'number') {
          if (parsed === Math.round(parsed)) return css.ValueColor.num[~~isDark];
          else return css.ValueColor.float[~~isDark];
        }
      } catch {}
    }
  }
  if (input[0] === '[' || input[0] === '{') return undefined;
  return css.ValueColor.str[~~isDark];
};

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
    [doc, theme],
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
    [doc, theme],
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
          inputStyle={focused ? {color: inputColor(!theme.isLight, proposed) || theme.g(0.1), background: theme.bg, borderColor: theme.g(.7)} : undefined}
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
