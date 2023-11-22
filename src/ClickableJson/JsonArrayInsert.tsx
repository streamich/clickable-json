import * as React from 'react';
import {useT} from 'use-t';
import {context} from './context';
import * as css from '../css';
import {inputStyle, typeahead} from './utils';
import {useTheme} from 'nano-theme';
import {FlexibleInput} from '../FlexibleInput';

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
    const style = inputStyle(theme, !theme.isLight, value);
    style.display = visible ? undefined : 'none';
    style.margin = '-1px 0 -1px -2px';
    style.padding = '3px 4px';
    style.border = `1px solid ${theme.g(0.85)}`;

    return (
      <span className={css.input} style={style}>
        <FlexibleInput
          focus
          inp={(el) => ((inputRef as any).current = el)}
          value={value}
          typeahead={typeahead(value)}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => {}}
          onBlur={() => {
            setEditing(false);
          }}
          onSubmit={() => {
            if (inputRef.current) inputRef.current.blur();
            onSubmit();
          }}
          onCancel={() => {
            if (value) setValue('');
            else setEditing(false);
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
