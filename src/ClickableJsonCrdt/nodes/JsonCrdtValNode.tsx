import * as React from 'react';
import {NodeRef} from '../NodeRef';
import type {ValNode} from 'json-joy/es2020/json-crdt';

export interface JsonCrdtValNodeProps {
  node: NodeRef<ValNode>;
}

export const JsonCrdtValNode: React.FC<JsonCrdtValNodeProps> = () => {
  return <span>val...</span>;
};
