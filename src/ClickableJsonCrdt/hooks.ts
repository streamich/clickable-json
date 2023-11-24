import * as React from 'react';
import {useJsonCrdt} from './context';
import type {JsonNode} from 'json-joy/es2020/json-crdt';
import type {NodeRef} from './NodeRef';

export const useRerender = (node: NodeRef<JsonNode>) => {
  const {model} = useJsonCrdt();
  const api = model.api.wrap(node.node);
  React.useSyncExternalStore(api.events.subscribe, api.events.getSnapshot);
};
