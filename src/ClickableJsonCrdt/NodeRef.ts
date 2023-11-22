import {JsonNode} from 'json-joy/es2020/json-crdt';

export class NodeRef {
  constructor(public readonly node: JsonNode, public readonly parent: NodeRef | null) {}
}
