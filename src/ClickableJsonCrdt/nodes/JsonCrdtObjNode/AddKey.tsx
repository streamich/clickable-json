import * as React from 'react';
import {NodeRef} from '../../NodeRef';
import {ObjectInsert} from '../../../inserts/ObjectInsert';
import {useIsFocused} from '../../../context/focus';
import {id} from '../../utils';
import {useJsonCrdt} from '../../context';
import type {ObjNode} from 'json-joy/es2020/json-crdt';

export interface AddKeyProps {
  node: NodeRef<ObjNode>;
}

export const AddKey: React.FC<AddKeyProps> = ({node}) => {
  const {model} = useJsonCrdt();
  const isFocused = useIsFocused(id(node));

  const handleSubmit = React.useCallback(
    (key: string, json: string) => {
      let value: unknown = json;
      try {
        value = JSON.parse(json);
      } catch {}
      const api = model.api;
      const nodeApi = api.wrap(node.node);
      nodeApi.set({[key]: value});
    },
    [node.node],
  );

  return <ObjectInsert visible={isFocused} onSubmit={handleSubmit} />;
};
