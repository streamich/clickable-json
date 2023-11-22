import * as React from 'react';
import {useTheme} from 'nano-theme';
import * as css from '../css';
import {inputStyle, valueColor} from './utils';
import {FlexibleInput} from '../FlexibleInput';

export interface ValueInputProps {
  value: unknown;
  onChange?: (value: unknown) => void;
}

export const ValueInput: React.FC<ValueInputProps> = (props) => {
  const {value, onChange} = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const json = React.useMemo(
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
  const [proposed, setProposed] = React.useState(json);
  const [focused, setFocused] = React.useState(false);
  React.useEffect(() => {
    setProposed(json);
  }, [json]);

  const onSubmit = (e: React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (e) e.stopPropagation();
    let newValue;
    try {
      newValue = JSON.parse(proposed);
    } catch {
      newValue = String(proposed);
    }
    if (onChange) onChange(newValue);
  };

  return (
    <div
      className={css.input}
      style={
        focused
          ? inputStyle(theme, !theme.isLight, proposed)
          : {color: valueColor(!theme.isLight, value), background: value === false ? theme.red(0.06) : undefined}
    }>
      <FlexibleInput
        inp={(el) => ((inputRef as any).current = el)}
        value={focused ? proposed : json}
        onChange={(e) => setProposed(e.target.value)}
        onFocus={(e) => {
          const input = e.target;
          const value = input.value;
          const length = value.length;
          // Nicely select short strings. Always select very short strings, for
          // a bit longer strings check if there are any spaces or newlines. The
          // characters should allow to select UUIDs.
          if (length < 40 && (value === proposed)) {
            setTimeout(() => {
              if (value[0] === '"' && value[length - 1] === '"') {
                if (length < 17 || (value.indexOf('\n') === -1 && value.indexOf(' ') === -1)) {
                  input.setSelectionRange(1, length - 1, 'forward');
                }
              }
            }, 155);
          }
          setFocused(true);
        }}
        onBlur={() => setFocused(false)}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter') {
            if (inputRef.current) inputRef.current.blur();
            onSubmit(e);
          } else if (e.key === 'Escape') {
            if (json !== proposed) setProposed(json);
            else if (inputRef.current) inputRef.current.blur();
          }
        }}
      />
    </div>
  );
};
