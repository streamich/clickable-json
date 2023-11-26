import * as React from 'react';
import {NodeRef} from '../../NodeRef';
import {ObjectInsert} from '../../../inserts/ObjectInsert';
import {useIsFocused} from '../../../context/focus';
import {id} from '../../utils';
import {useJsonCrdt} from '../../context';
import {TypeSwitch} from '../../TypeSwitch';
import type {ObjNode} from 'json-joy/es2020/json-crdt';

const valueTypes = ['auto', 'con', 'vec', 'val'] as const;

export interface AddKeyProps {
  node: NodeRef<ObjNode>;
}

export const AddKey: React.FC<AddKeyProps> = ({node}) => {
  const {model} = useJsonCrdt();
  const isFocused = useIsFocused(id(node));
  const [type, setType] = React.useState(0);

  const handleSubmit = React.useCallback(
    (key: string, json: string) => {
      let value: unknown = json;
      try {
        value = JSON.parse(json);
      } catch {}
      const api = model.api;
      const nodeApi = api.wrap(node.node);
      const valueType = valueTypes[type];
      nodeApi.set({
        [key]: valueType === 'auto'
          ? value
          : valueType === 'con'
            ? api.builder.const(value)
            : valueType === 'vec'
              ? api.builder.vec()
              : valueType === 'val'
                ? api.builder.val()
                : api.builder.const(undefined),
      });
      if (valueType === 'vec') {
        if (json) {
          const valueVec = Array.isArray(value) ? value : [value];
          nodeApi.tup(key).set(valueVec.map((x, i) => [i, api.builder.maybeConst(x)]));
        }
      } else if (valueType === 'val') {
        nodeApi.val(key).set(json ? api.builder.maybeConst(value) : api.builder.const(undefined));
      }
    },
    [node.node, type],
  );

  return (
    <ObjectInsert
      visible={isFocused}
      beforeValue={(
        <span style={{display: 'inline-block', padding: '0 4px 0 0', margin: '0 0 0 -4px'}}>
          <TypeSwitch
            value={valueTypes[type]}
            onClick={() => setType(n => (n + 1) % valueTypes.length)}
            onKeyDown={(e) => {
              switch (e.key) {
                case 'ArrowDown':
                case 'ArrowRight': {
                  e.preventDefault();
                  setType(n => (n + 1) % valueTypes.length);
                  break;
                }
                case 'ArrowUp':
                case 'ArrowLeft': {
                  e.preventDefault();
                  setType(n => (n - 1 + valueTypes.length) % valueTypes.length);
                  break;
                }
              }
            }}
          />
        </span>
      )}
      onSubmit={handleSubmit}
    />
  );
};
