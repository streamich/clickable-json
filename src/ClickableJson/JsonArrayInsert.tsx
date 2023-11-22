import * as React from 'react';
import {useT} from 'use-t';
import AutosizeInput from '../AutosizeInput';
import {context} from './context';
import * as css from '../css';
import {inputStyle} from './utils';
import {useTheme} from 'nano-theme';

export interface JsonArrayInsertProps {
  pointer: string;
  visible?: boolean;
}

export const JsonArrayInsert: React.FC<JsonArrayInsertProps> = ({pointer, visible}) => {
  const [t] = useT();
  const {onChange} = React.useContext(context);
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const insButtonClass = css.useInsButton();
  const theme = useTheme();

  if (!onChange) return null;

  const onSubmit = () => {
    let newValue;
    try {
      newValue = JSON.parse(value);
    } catch {
      newValue = String(value);
    }
    onChange([{op: 'add', path: pointer, value: newValue}]);
    setValue('');
    setEditing(false);
  };

  if (editing) {
    return (
      <span style={{display: visible ? undefined : 'none'}}>
        <AutosizeInput
          inputRef={(el) => {
            (inputRef as any).current = el;
            if (el) el.focus();
          }}
          inputClassName={css.input}
          inputStyle={inputStyle(theme, !theme.isLight, value)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => {}}
          onBlur={() => {
            setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              if (value) setValue('');
              else setEditing(false);
            } else if (e.key === 'Enter') {
              if (inputRef.current) inputRef.current.blur();
              onSubmit();
            }
          }}
        />
      </span>
    );
  }

  return (
    <span className={css.insArrBlock} style={{display: visible ? undefined : 'none'}} onClick={() => setEditing(true)}>
      <span className={css.insArrDot} />
      <span className={css.insArrLine} />
      <button className={css.insArrButton + css.insButton + insButtonClass}>+</button>
      <span className={css.tooltip + css.insArrTooltip}>{t('Insert')}</span>
    </span>
  );
};
