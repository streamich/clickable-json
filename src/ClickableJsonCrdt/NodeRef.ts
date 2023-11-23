import {JsonNode} from 'json-joy/es2020/json-crdt';

export class NodeRef<N extends JsonNode = JsonNode> {
  constructor(public readonly node: N, public readonly parent: NodeRef | null, public readonly step: string) {}
}
