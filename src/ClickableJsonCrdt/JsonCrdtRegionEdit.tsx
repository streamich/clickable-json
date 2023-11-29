import * as React from 'react';
import {ObjectLayoutProps} from '../ObjectLayout';
import {JsonCrdtProperty} from './JsonCrdtProperty';
import {ValueInput} from '../inserts/ValueInput';
import {CancelAction} from '../buttons/Action/CancelAction';
import {FocusRegion} from '../FocusRegion';
import {useStyles} from '../context/style';
import {createValue, isContainer} from './utils';
import {useJsonCrdt} from './context';
import type {NodeRef} from './NodeRef';
import type {JsonNode, ObjApi, ValApi, VecApi} from 'json-joy/es2020/json-crdt';

export interface JsonCrdtRegionEditProps extends ObjectLayoutProps {
  node: NodeRef<JsonNode>;
  onCancel?: () => void;
}

export const JsonCrdtRegionEdit: React.FC<JsonCrdtRegionEditProps> = ({node, onCancel}) => {
  const {compact} = useStyles();
  const {model} = useJsonCrdt();

  const handleSubmit = (json: string, type: string) => {
    if (node.parent && node.parent.node.name() === 'obj') {
      const valueId = createValue(model, json, type as any, true);
      const nodeApi = model.api.wrap(node.parent.node) as ObjApi;
      nodeApi.set({[node.step]: valueId});
    } else if (node.parent && node.parent.node.name() === 'val') {
      const valueId = createValue(model, json, type as any, true);
      const nodeApi = model.api.wrap(node.parent.node) as ValApi;
      nodeApi.set(valueId);
    } else if (node.parent && node.parent.node.name() === 'vec') {
      const valueId = createValue(model, json, type as any, true);
      const nodeApi = model.api.wrap(node.parent.node) as VecApi;
      nodeApi.set([[+node.step, valueId]]);
    }
    if (onCancel) onCancel();
  };

  const view = node.node.view();
  const value = isContainer(view) ? '' : JSON.stringify(view);

  return (
    <FocusRegion compact={compact}>
      <JsonCrdtProperty node={node} />
      <span style={{display: 'inline-block', margin: '-3px 0', position: 'relative'}}>
        <ValueInput focus withType visible={true} initialType={node.node.name() === 'con' ? 'con' : 'any'} initialValue={value} onSubmit={handleSubmit} onCancel={onCancel} />
        {!!onCancel && <CancelAction onClick={() => onCancel()} />}
      </span>
    </FocusRegion>
  );
};
