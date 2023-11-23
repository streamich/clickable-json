import * as React from 'react';
import {useJsonCrdt} from '../context';
import {JsonCrdtNodeOutline} from '../JsonCrdtNodeOutline';
import {NodeRef} from '../NodeRef';
import type {ValNode} from 'json-joy/es2020/json-crdt';

export interface JsonCrdtValNodeProps {
  node: NodeRef<ValNode>;
}

export const JsonCrdtValNode: React.FC<JsonCrdtValNodeProps> = ({node}) => {
  const {renderNode} = useJsonCrdt();
  const child = React.useMemo(() => new NodeRef(node.node.child(), node, ''), [node]);

  return (
    <span>
      <JsonCrdtNodeOutline type={'val'}>
        {renderNode(child)}
      </JsonCrdtNodeOutline>
    </span>
  );
};
