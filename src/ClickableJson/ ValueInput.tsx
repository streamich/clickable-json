import * as React from 'react';
import {useTheme} from 'nano-theme';
import AutosizeInput from '../AutosizeInput';
import * as css from '../css';
import {inputStyle, valueColor} from './utils';

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
    <AutosizeInput
      inputRef={(el) => ((inputRef as any).current = el)}
      inputClassName={css.input}
      inputStyle={focused ? inputStyle(theme, !theme.isLight, proposed) : {color: valueColor(!theme.isLight, value)}}
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
