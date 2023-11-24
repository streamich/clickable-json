import * as React from 'react';
import {useJsonCrdt} from './context';
import type {JsonNode} from "json-joy/es2020/json-crdt";
import type {NodeRef} from "./NodeRef";

export const useRerender = (node: NodeRef<JsonNode>) => {
  const {model} = useJsonCrdt();
  const [cnt, setCnt] = React.useState(0);
  React.useLayoutEffect(() => {
    const nodeApi = model.api.wrap(node.node);
    const events = nodeApi.events;
    const listener = () => setCnt((cnt) => cnt + 1)
    events.on('view', listener);
    return () => events.off('view', listener);
  });
};
