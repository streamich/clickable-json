import * as React from 'react';
import {theme} from 'nano-theme';
import {NodeRef} from '../../NodeRef';
import * as css from '../../../css';
import {FlexibleInput} from '../../../FlexibleInput';
import {selectOnFocus} from '../../../utils/selectOnFocus';
import {inputStyle} from '../../../ClickableJson/utils';
import {CancelAction} from '../../../buttons/Action/CancelAction';
import {useJsonCrdt} from '../../context';
import {StrBinding} from '../../../json-crdt-bindings/input';
import type {Model, StrNode} from 'json-joy/es2020/json-crdt';

export interface StrEditProps {
  node: NodeRef<StrNode>;
  onCancel?: () => void;
  onDone: () => void;
}

export const StrEdit: React.FC<StrEditProps> = ({node, onCancel, onDone}) => {
  const inputRef = React.useRef<HTMLInputElement>();
  const cloneRef = React.useRef<Model>();
  const [value, setValue] = React.useState(node.node.view());
  const {model} = useJsonCrdt();
  React.useEffect(() => {
    if (!inputRef.current) return;
    const clone = cloneRef.current = model.clone();
    clone.api.flush();
    const str = clone.index.get(node.node.id)! as StrNode;
    const api = clone.api.wrap(str);
    const unbind = StrBinding.bind(api, inputRef.current);
    return () => {
      unbind();
    };
  }, [model]);

  const handleSubmit = () => {
    const clone = cloneRef.current;
    if (!clone) return;
    model.applyPatch(clone.api.flush());
    onDone();
  };

  const style = inputStyle(theme, !theme.isLight, value);
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
        typebefore={'"'}
        typeahead={'"'}
        onChange={(e) => setValue(e.target.value)}
        onSubmit={handleSubmit}
        onFocus={(e) => selectOnFocus(e.target)}
        onCancel={() => {
          setValue('');
          if (onCancel) onCancel();
        }}
      />
      <CancelAction onClick={onCancel} />
    </span>
  );
};
