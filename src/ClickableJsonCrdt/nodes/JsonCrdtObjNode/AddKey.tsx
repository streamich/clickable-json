import * as React from 'react';
import {NodeRef} from '../../NodeRef';
import {ObjectInsert} from '../../../inserts/ObjectInsert';
import {useIsFocused} from '../../../context/focus';
import {createValue, id} from '../../utils';
import {useJsonCrdt} from '../../context';
import {CrdtTypeSwitch} from '../../../buttons/CrdtTypeSwitch';
import type {ObjNode} from 'json-joy/es2020/json-crdt';

export interface AddKeyProps {
  node: NodeRef<ObjNode>;
}

export const AddKey: React.FC<AddKeyProps> = ({node}) => {
  const {model} = useJsonCrdt();
  const isFocused = useIsFocused(id(node));
  const type = React.useRef<'any' | 'con' | 'vec' | 'val'>('any');

  const handleSubmit = React.useCallback(
    (key: string, json: string) => {
      const valueId = createValue(model, json, type.current);
      const nodeApi = model.api.wrap(node.node);
      nodeApi.set({[key]: valueId});
    },
    [node.node, type],
  );

  return (
    <ObjectInsert
      visible={isFocused}
      beforeValue={<CrdtTypeSwitch type={type} />}
      onSubmit={handleSubmit}
    />
  );
};
