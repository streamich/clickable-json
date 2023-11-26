import * as React from 'react';
import {NodeRef} from '../../NodeRef';
import {ArrayInsert} from '../../../inserts/ArrayInsert';
import {useIsFocused} from '../../../context/focus';
import {createValue, id} from '../../utils';
import {CrdtTypeSwitch} from '../../../buttons/CrdtTypeSwitch';
import type {ArrNode} from 'json-joy/es2020/json-crdt';
import {useJsonCrdt} from '../../context';

export interface InsertElementProps {
  node: NodeRef<ArrNode>;
  index: number;
}

export const InsertElement: React.FC<InsertElementProps> = ({node, index}) => {
  const {model} = useJsonCrdt();
  const isFocused = useIsFocused(id(node));
  const type = React.useRef<'any' | 'con' | 'vec' | 'val'>('any');

  const handleSubmit = React.useCallback(
    (json: string) => {
      const valueId = createValue(model, json, type.current);
      const nodeApi = model.api.wrap(node.node);
      nodeApi.ins(index, [valueId]);
    },
    [node.node, type],
  );

  return (
    <ArrayInsert
      visible={isFocused}
      beforeValue={<CrdtTypeSwitch type={type} />}
      onSubmit={handleSubmit}
    />
  );
};
