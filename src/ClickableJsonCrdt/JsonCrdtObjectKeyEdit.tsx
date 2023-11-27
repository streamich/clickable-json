import * as React from 'react';
import {ObjectLayoutProps} from '../ObjectLayout';
import {JsonCrdtProperty} from './JsonCrdtProperty';
import {ValueInput} from '../inserts/ValueInput';
import {CancelAction} from '../buttons/Action/CancelAction';
import {FocusRegion} from '../FocusRegion';
import {useStyles} from '../context/style';
import type {NodeRef} from './NodeRef';
import type {JsonNode} from 'json-joy/es2020/json-crdt';

export interface JsonCrdtObjectKeyEditProps extends ObjectLayoutProps {
  node: NodeRef<JsonNode>;
  onCancel?: () => void;
}

export const JsonCrdtObjectKeyEdit: React.FC<JsonCrdtObjectKeyEditProps> = ({node, onCancel}) => {
  const {compact} = useStyles();

  return (
    <FocusRegion
      compact={compact}
    >
      <JsonCrdtProperty node={node} />
      <span style={{display: 'inline-block', margin: '-3px 0', position: 'relative'}}>
        <ValueInput
          focus
          withType
          visible={true}
          onSubmit={() => {}}
          onCancel={onCancel}
        />
        {!!onCancel && <CancelAction onClick={() => onCancel()} />}
      </span>
    </FocusRegion>
  );
};
