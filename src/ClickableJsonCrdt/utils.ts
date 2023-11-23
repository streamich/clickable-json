import {NodeRef} from './NodeRef';
import type {JsonNode} from 'json-joy/es2020/json-crdt';

export const id = (node: NodeRef<JsonNode>) => {
  const id = node.node.id;
  return id.sid + '.' + id.time;
};
