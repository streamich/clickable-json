import * as React from 'react';
import type {NodeRef} from './NodeRef';
import {ConNode} from 'json-joy/es2020/json-crdt';
import {JsonCrdtConNode} from './nodes/JsonCrdtConNode';

export interface JsonCrdtNodeProps {
  node: NodeRef<any>;
}

export const JsonCrdtNode: React.FC<JsonCrdtNodeProps> = (props) => {
  const {node} = props;

  if (node.node instanceof ConNode) {
    return <JsonCrdtConNode node={node as NodeRef<ConNode>} />;
  }

  return 'unknown node';
};
