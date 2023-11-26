import * as React from 'react';
import {useT} from 'use-t';
import * as css from '../css';
import {ValueInput} from './ValueInput';

export interface ArrayInsertProps {
  visible?: boolean;
  withType?: boolean;
  onSubmit: (value: string, type: string) => void;
}

export const ArrayInsert: React.FC<ArrayInsertProps> = ({visible, withType, onSubmit}) => {
  const [t] = useT();
  const [editing, setEditing] = React.useState(false);
  const insButtonClass = css.useInsButton();

  const handleSubmit = (value: string, type: string) => {
    setEditing(false);
    onSubmit(value, type);
  };

  if (editing) {
    return (
      <ValueInput
        focus
        withType={withType}
        visible={visible}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(false)}
      />
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
