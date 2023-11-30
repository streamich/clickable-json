import * as React from 'react';
import {theme} from 'nano-theme';
import {useT} from 'use-t';
import {NodeRef} from '../../NodeRef';
import * as css from '../../../css';
import {FlexibleInput} from '../../../FlexibleInput';
import {selectOnFocus} from '../../../utils/selectOnFocus';
import {inputStyle} from '../../../ClickableJson/utils';
import {CancelAction} from '../../../buttons/Action/CancelAction';
import {SubmitAction} from '../../../buttons/Action/SubmitAction';
import {useJsonCrdt} from '../../context';
import {StrBinding} from '../../../json-crdt-bindings/input';
import type {StrNode} from 'json-joy/es2020/json-crdt';

export interface StrEditProps {
  node: NodeRef<StrNode>;
  onCancel?: () => void;
  onDone: () => void;
}

export const StrEdit: React.FC<StrEditProps> = ({node, onCancel, onDone}) => {
  const [t] = useT();
  const inputRef = React.useRef<HTMLInputElement>();
  const {model} = useJsonCrdt();
  const [clone, api] = React.useMemo(() => {
    const clone = model.clone();
    clone.api.flush();
    const str = clone.index.get(node.node.id)! as StrNode;
    const api = clone.api.wrap(str);
    return [clone, api];
  }, []);
  const value = React.useSyncExternalStore(api.events.subscribe, api.events.getSnapshot);

  React.useEffect(() => {
    if (!inputRef.current) return;
    const unbind = StrBinding.bind(api, inputRef.current);
    return () => {
      unbind();
    };
  }, [model]);

  const handleSubmit = () => {
    model.applyPatch(clone.api.flush());
    onDone();
  };

  const style = inputStyle(theme, !theme.isLight, '""');
  style.margin = '-3px -3px -3px -5px';
  style.padding = '2px 4px';
  style.border = `1px solid ${theme.g(0.85)}`;

  return (
    <span className={css.input} style={style}>
      <FlexibleInput
        focus
        inp={(el) => {
          (inputRef as any).current = el;
        }}
        value={value}
        multiline
        uncontrolled
        typebefore={'"'}
        typeahead={'"'}
        onSubmit={handleSubmit}
        onFocus={(e) => selectOnFocus(e.target)}
        onCancel={() => {
          if (onCancel) onCancel();
        }}
      />
      <CancelAction onClick={onCancel} tooltip={t('Cancel')} />
      <span className={css.bottomRightActionPos}>
          <SubmitAction onClick={handleSubmit} tooltip={t('Done (Ctrl + Enter)')} />
      </span>
    </span>
  );
};
