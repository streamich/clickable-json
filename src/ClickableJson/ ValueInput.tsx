import * as React from 'react';
import {useTheme} from 'nano-theme';
import AutosizeInput from '../AutosizeInput';
import * as css from '../css';

export const valueColor = (isDark: boolean, value: unknown): string | undefined => {
  switch (typeof value) {
    case 'boolean':
      return css.ValueColor.bool[~~isDark];
    case 'string':
      return css.ValueColor.str[~~isDark];
    case 'number':
      return value === Math.round(value) ? css.ValueColor.num[~~isDark] : css.ValueColor.float[~~isDark];
    case 'object':
      return value === null ? css.ValueColor.nil[~~isDark] : undefined;
  }
  return;
};

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

export interface ValueInputProps {
  value: unknown;
  onChange?: (value: unknown) => void;
}

export const  ValueInput: React.FC<ValueInputProps> = (props) => {
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
    <AutosizeInput
      inputRef={(el) => ((inputRef as any).current = el)}
      inputClassName={css.input}
      inputStyle={focused ? {color: inputColor(!theme.isLight, proposed) || theme.g(0.1), background: theme.bg, borderColor: theme.g(.7)} : {color: valueColor(!theme.isLight, value)}}
      value={focused ? proposed : json}
      onChange={(e) => setProposed(e.target.value)}
      onFocus={() => setFocused(true)}
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
  );
};
