import * as React from 'react';
import {NodeRef} from '../../NodeRef';
import {ObjectInsert} from '../../../inserts/ObjectInsert';
import {useIsFocused} from '../../../context/focus';
import {id} from '../../utils';
import {useJsonCrdt} from '../../context';
import {CrdtTypeSwitch} from '../../../buttons/CrdtTypeSwitch';
import type {ObjNode} from 'json-joy/es2020/json-crdt';

export interface AddKeyProps {
  node: NodeRef<ObjNode>;
}

export const AddKey: React.FC<AddKeyProps> = ({node}) => {
  const {model} = useJsonCrdt();
  const isFocused = useIsFocused(id(node));
  const type = React.useRef<string>('any');

  const handleSubmit = React.useCallback(
    (key: string, json: string) => {
      let value: unknown = json;
      try {
        value = JSON.parse(json);
      } catch {}
      const api = model.api;
      const nodeApi = api.wrap(node.node);
      nodeApi.set({
        [key]:
          type.current === 'any'
            ? value
            : type.current === 'con'
              ? api.builder.const(value)
              : type.current === 'vec'
                ? api.builder.vec()
                : type.current === 'val'
                  ? api.builder.val()
                  : api.builder.const(undefined),
      });
      if (type.current === 'vec') {
        if (json) {
          const valueVec = Array.isArray(value) ? value : [value];
          nodeApi.tup(key).set(valueVec.map((x, i) => [i, api.builder.maybeConst(x)]));
        }
      } else if (type.current === 'val') {
        nodeApi.val(key).set(json ? api.builder.maybeConst(value) : api.builder.const(undefined));
      }
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
