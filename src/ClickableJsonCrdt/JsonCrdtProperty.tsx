import * as React from 'react';
import {PropertyLayout} from '../PropertyLayout';
import type {JsonNode} from 'json-joy/es2020/json-crdt';
import type {NodeRef} from './NodeRef';

export interface JsonCrdtPropertyProps {
  node: NodeRef<JsonNode>;
}

export const JsonCrdtProperty: React.FC<JsonCrdtPropertyProps> = ({node}) => {
  if (!node.parent || node.parent.node.name() !== 'obj') return null;

  return (
    <PropertyLayout property={node.step} />
  );
};
