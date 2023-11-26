import * as React from 'react';
import {useTheme} from 'nano-theme';
import * as css from '../css';
import {inputStyle, typeahead} from '../ClickableJson/utils';
import {FlexibleInput} from '../FlexibleInput';
import {CrdtTypeSwitch} from '../buttons/CrdtTypeSwitch';

export interface ValueInputProps {
  visible?: boolean;
  types?: string[];
  onSubmit: (value: string, type: string) => void;
  onCancel?: React.KeyboardEventHandler<HTMLInputElement>;
}

export const ValueInput: React.FC<ValueInputProps> = ({visible, types, onSubmit, onCancel}) => {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const type = React.useRef<string>(types && types.length ? types[0] : '');

  const handleSubmit = () => {
    if (inputRef.current) inputRef.current.blur();
    setValue('');
    onSubmit(value, type.current);
  };

  const style = inputStyle(theme, !theme.isLight, value);
  style.display = visible ? undefined : 'none';
  style.margin = '-1px 0 -1px -2px';
  style.padding = '3px 4px';
  style.border = `1px solid ${theme.g(0.85)}`;

  let beforeValue: React.ReactNode = null;

  if (types && types.length) {
    beforeValue = (
      <CrdtTypeSwitch type={type} onSubmit={handleSubmit} onClick={e => { if (inputRef.current) inputRef.current.focus(); }} />
    );
  }

  return (
    <span className={css.input} style={style}>
      {beforeValue}
      <FlexibleInput
        focus
        inp={(el) => ((inputRef as any).current = el)}
        value={value}
        typeahead={typeahead(value)}
        onChange={(e) => setValue(e.target.value)}
        onSubmit={handleSubmit}
        onCancel={(e) => {
          setValue('');
          if (onCancel) onCancel(e);
        }}
        onTab={(e) => {
          const ahead = typeahead(value);
          if (ahead) {
            e.preventDefault();
            setValue(value + ahead);
          }
        }}
      />
    </span>
  );
};
