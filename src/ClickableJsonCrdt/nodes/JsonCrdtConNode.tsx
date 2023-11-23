import * as React from 'react';
import {ClickableJson} from '../../ClickableJson';
import {JsonCrdtNodeOutline} from '../JsonCrdtNodeOutline';
import {JsonCrdtProperty} from '../JsonCrdtProperty';
import type {ConNode} from 'json-joy/es2020/json-crdt';
import type {NodeRef} from '../NodeRef';

export interface JsonCrdtConNodeProps {
  node: NodeRef<ConNode>;
  parentCollapsed?: boolean;
}

export const JsonCrdtConNode: React.FC<JsonCrdtConNodeProps> = ({node, parentCollapsed}) => {
  const comma = false;

  return (
    <>
      <JsonCrdtProperty node={node} />
      <JsonCrdtNodeOutline node={node}>
        <ClickableJson readonly compact collapsed doc={node.node.view()} />
      </JsonCrdtNodeOutline>
      {!!comma && ','}
    </>
  );
};
