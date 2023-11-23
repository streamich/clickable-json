import * as React from 'react';
import type {NodeRef} from './NodeRef';
import {ConNode, ValNode} from 'json-joy/es2020/json-crdt';
import {JsonCrdtConNode} from './nodes/JsonCrdtConNode';
import {JsonCrdtValNode} from './nodes/JsonCrdtValNode';

export interface JsonCrdtNodeProps {
  node: NodeRef<any>;
}

export const JsonCrdtNode: React.FC<JsonCrdtNodeProps> = (props) => {
  const {node} = props;

  if (node.node instanceof ConNode) {
    return <JsonCrdtConNode node={node as NodeRef<ConNode>} />;
  } else if (node.node instanceof ValNode) {
    return <JsonCrdtValNode node={node as NodeRef<ValNode>} />;
  }

  return 'unknown node';
};
