import * as React from 'react';
import {rule, theme} from 'nano-theme';
import {NodeRef} from '../../NodeRef';
import {JsonCrdtRegion} from '../../JsonCrdtRegion';
import * as css from '../../../css';
import {FlexibleInput} from '../../../FlexibleInput';
import {selectOnFocus} from '../../../utils/selectOnFocus';
import {inputStyle} from '../../../ClickableJson/utils';
import type {StrNode} from 'json-joy/es2020/json-crdt';
import {CancelAction} from '../../../buttons/Action/CancelAction';

export interface StrEditProps {
  node: NodeRef<StrNode>;
  onCancel?: () => void;
}

export const StrEdit: React.FC<StrEditProps> = ({node, onCancel}) => {
  const inputRef = React.useRef<HTMLInputElement>();
  const [value, setValue] = React.useState(node.node.view());

  const handleSubmit = () => {};

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
