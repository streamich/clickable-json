import * as React from 'react';
import type {ConNode} from 'json-joy/es2020/json-crdt';
import type {NodeRef} from '../NodeRef';
import {ClickableJson} from '../../ClickableJson';

export interface JsonCrdtConNodeProps {
  node: NodeRef<ConNode>;
}

export const JsonCrdtConNode: React.FC<JsonCrdtConNodeProps> = ({node}) => {
  return (
    <span>
      <ClickableJson readonly compact collapsed doc={node.node.view()} />
    </span>
  );
};
