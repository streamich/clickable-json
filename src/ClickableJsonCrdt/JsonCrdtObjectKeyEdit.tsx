import * as React from 'react';
import {ObjectLayoutProps} from '../ObjectLayout';
import {JsonCrdtProperty} from './JsonCrdtProperty';
import {ValueInput} from '../inserts/ValueInput';
import {CancelAction} from '../buttons/Action/CancelAction';
import {FocusRegion} from '../FocusRegion';
import {useStyles} from '../context/style';
import {createValue} from './utils';
import {useJsonCrdt} from './context';
import type {NodeRef} from './NodeRef';
import type {JsonNode, ObjApi} from 'json-joy/es2020/json-crdt';

export interface JsonCrdtObjectKeyEditProps extends ObjectLayoutProps {
  node: NodeRef<JsonNode>;
  onCancel?: () => void;
}

export const JsonCrdtObjectKeyEdit: React.FC<JsonCrdtObjectKeyEditProps> = ({node, onCancel}) => {
  const {compact} = useStyles();
  const {model} = useJsonCrdt();

  const handleSubmit = (json: string, type: string) => {
    const isObjKeyEdit = node.parent && node.parent.node.name() === 'obj';
    if (isObjKeyEdit) {
      const valueId = createValue(model, json, type as any, true);
      const nodeApi = model.api.wrap(node.parent.node) as ObjApi;
      nodeApi.set({[node.step]: valueId});
      if (onCancel) onCancel();
    }
  };

  return (
    <FocusRegion compact={compact}>
      <JsonCrdtProperty node={node} />
      <span style={{display: 'inline-block', margin: '-3px 0', position: 'relative'}}>
        <ValueInput focus withType visible={true} onSubmit={handleSubmit} onCancel={onCancel} />
        {!!onCancel && <CancelAction onClick={() => onCancel()} />}
      </span>
    </FocusRegion>
  );
};
