import * as React from 'react';
import {useT} from 'use-t';
import {escapeComponent} from 'json-joy/lib/json-pointer';
import AutosizeInput from '../AutosizeInput';
import {context} from './context';
import * as css from '../css';

export interface JsonObjectInsertProps {
  pointer: string;
  visible?: boolean;
}

export const JsonObjectInsert: React.FC<JsonObjectInsertProps> = ({pointer, visible}) => {
  const [t] = useT();
  const {onChange} = React.useContext(context);
  const [editing, setEditing] = React.useState(false);
  const [property, setProperty] = React.useState('');
  const [value, setValue] = React.useState('');
  const inputPropertyRef = React.useRef<HTMLInputElement>(null);
  const inputValueRef = React.useRef<HTMLInputElement>(null);
  const insButtonClass = css.useInsButton();

  if (!onChange) return null;

  const onSubmit = () => {
    let newValue;
    try {
      newValue = JSON.parse(value);
    } catch {
      newValue = String(value);
    }
    onChange([{op: 'add', path: pointer + '/' + escapeComponent(property), value: newValue}]);
    setProperty('');
    setValue('');
    setEditing(false);
  };

  if (editing) {
    return (
      <span style={{display: visible ? undefined : 'none'}}>
        <AutosizeInput
          inputRef={(el) => {
            (inputPropertyRef as any).current = el;
            if (el) el.focus();
          }}
          inputClassName={css.property + css.input + css.inputActive}
          value={property}
          onChange={(e) => setProperty(e.target.value)}
          onFocus={() => {}}
          onBlur={() => {
            if (inputValueRef.current) inputValueRef.current.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              if (property) setProperty('');
              else if (value) setValue('');
              else setEditing(false);
            } else if (e.key === 'Enter') {
              if (inputValueRef.current) inputValueRef.current.focus();
            }
          }}
        />
        <span className={css.colon}>
          <span>{':'}</span>
        </span>
        <AutosizeInput
          inputRef={(el) => {
            (inputValueRef as any).current = el;
          }}
          inputClassName={css.str + css.input + css.inputActive}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => {}}
          onBlur={() => {
            // setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              if (value) setValue('');
              else if (inputPropertyRef.current) inputPropertyRef.current.focus();
            } else if (e.key === 'Enter') {
              if (inputValueRef.current) inputValueRef.current.blur();
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
      <button className={css.insButton + insButtonClass + css.insArrButton}>+</button>
      <span className={css.tooltip + css.insArrTooltip}>{t('Add key')}</span>
    </span>
  );
};
