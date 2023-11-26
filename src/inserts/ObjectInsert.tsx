import * as React from 'react';
import {useT} from 'use-t';
import * as css from '../css';
import {inputStyle, typeahead} from '../ClickableJson/utils';
import {useTheme} from 'nano-theme';
import {FlexibleInput} from '../FlexibleInput';

export interface ObjectInsertProps {
  visible?: boolean;
  beforeValue?: React.ReactNode;
  onSubmit: (key: string, value: string) => void;
}

export const ObjectInsert: React.FC<ObjectInsertProps> = ({visible, beforeValue, onSubmit}) => {
  const [t] = useT();
  const [editing, setEditing] = React.useState(false);
  const [property, setProperty] = React.useState('');
  const [value, setValue] = React.useState('');
  const inputPropertyRef = React.useRef<HTMLInputElement>(null);
  const inputValueRef = React.useRef<HTMLInputElement>(null);
  const insButtonClass = css.useInsButton();
  const theme = useTheme();

  const handleSubmit = () => {
    if (inputValueRef.current) inputValueRef.current.blur();
    onSubmit(property, value);
    setProperty('');
    setValue('');
    setEditing(false);
  };

  if (!visible) return null;

  if (editing) {
    const keyInput = (
      <span
        className={css.property + css.input}
        style={{
          color: theme.g(0.1),
          background: theme.bg,
          display: visible ? undefined : 'none',
          margin: '-1px 0 -1px -2px',
          padding: '3px 4px',
          border: `1px solid ${theme.g(0.85)}`,
          fontWeight: 'bold',
        }}
      >
        <FlexibleInput
          focus
          inp={(el) => ((inputPropertyRef as any).current = el)}
          value={property}
          onChange={(e) => setProperty(e.target.value)}
          onSubmit={() => {
            if (inputValueRef.current) inputValueRef.current.focus();
          }}
          onCancel={() => {
            if (property) setProperty('');
            else if (value) setValue('');
            else setEditing(false);
          }}
        />
      </span>
    );

    const valueInput = (
      <span
        className={css.input}
        style={{
          ...inputStyle(theme, !theme.isLight, value),
          display: visible ? undefined : 'none',
          margin: '-1px 0 -1px -2px',
          padding: '3px 4px',
          border: `1px solid ${theme.g(0.85)}`,
        }}
      >
        <FlexibleInput
          inp={(el) => ((inputValueRef as any).current = el)}
          value={value}
          typeahead={typeahead(value)}
          onChange={(e) => setValue(e.target.value)}
          onSubmit={handleSubmit}
          onCancel={() => {
            if (value) setValue('');
            else if (inputPropertyRef.current) inputPropertyRef.current.focus();
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

    return (
      <span style={{display: visible ? undefined : 'none'}}>
        {keyInput}
        <span className={css.colon}>
          <span>{':'}</span>
        </span>
        {beforeValue}
        {valueInput}
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
