import * as React from 'react';
import {ClickableJson} from '../../ClickableJson';
import {JsonCrdtProperty} from '../JsonCrdtProperty';
import {JsonCrdtRegion} from '../JsonCrdtRegion';
import type {ConNode} from 'json-joy/es2020/json-crdt';
import type {NodeRef} from '../NodeRef';
import {JsonAtom} from '../../JsonAtom/JsonAtom';

export interface JsonCrdtConNodeProps {
  node: NodeRef<ConNode>;
  parentCollapsed?: boolean;
}

export const JsonCrdtConNode: React.FC<JsonCrdtConNodeProps> = ({node, parentCollapsed}) => {
  const comma = false;

  return (
    <JsonCrdtRegion node={node}>
      <JsonCrdtProperty node={node} />
      <JsonAtom value={node.node.view()} />
      {/* <ClickableJson readonly compact collapsed noCollapseToggles doc={node.node.view()} /> */}
      {!!comma && ','}
    </JsonCrdtRegion>
  );
};
