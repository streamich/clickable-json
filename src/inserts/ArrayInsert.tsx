import * as React from 'react';
import {useT} from 'use-t';
import {useTheme} from 'nano-theme';
import * as css from '../css';
import {inputStyle, typeahead} from '../ClickableJson/utils';
import {FlexibleInput} from '../FlexibleInput';
import {CrdtTypeSwitch} from '../buttons/CrdtTypeSwitch';

export interface ArrayInsertProps {
  visible?: boolean;
  types?: string[];
  onSubmit: (value: string, type: string) => void;
}

export const ArrayInsert: React.FC<ArrayInsertProps> = ({visible, types, onSubmit}) => {
  const [t] = useT();
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const insButtonClass = css.useInsButton();
  const theme = useTheme();
  const type = React.useRef<string>(types && types.length ? types[0] : '');

  const handleSubmit = () => {
    if (inputRef.current) inputRef.current.blur();
    setValue('');
    setEditing(false);
    onSubmit(value, type.current);
  };

  if (editing) {
    const style = inputStyle(theme, !theme.isLight, value);
    style.display = visible ? undefined : 'none';
    style.margin = '-1px 0 -1px -2px';
    style.padding = '3px 4px';
    style.border = `1px solid ${theme.g(0.85)}`;

    let beforeValue: React.ReactNode = null;

    if (types && types.length) {
      beforeValue = (
        <CrdtTypeSwitch type={type} onSubmit={handleSubmit} />
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
