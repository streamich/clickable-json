import * as React from 'react';
import {useT} from 'use-t';
import * as css from '../css';
import {ValueInput} from './ValueInput';
import {AddAction} from '../buttons/Action/AddAction';

export interface ArrayInsertProps {
  visible?: boolean;
  withType?: boolean;
  onSubmit: (value: string, type: string) => void;
}

export const ArrayInsert: React.FC<ArrayInsertProps> = ({visible, withType, onSubmit}) => {
  const [t] = useT();
  const [editing, setEditing] = React.useState(false);

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
    <span className={css.insArrBlock} style={{display: visible ? undefined : 'none'}}>
      <span className={css.insArrDot} />
      <span className={css.insArrLine} />
      <span className={css.insArrButton}>
        <AddAction tooltip={t('Insert')} onClick={() => setEditing(true)} />
      </span>
    </span>
  );
};
