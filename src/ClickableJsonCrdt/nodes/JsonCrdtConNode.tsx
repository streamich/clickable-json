import * as React from 'react';
import {ClickableJson} from '../../ClickableJson';
import {JsonCrdtNodeOutline} from '../JsonCrdtNodeOutline';
import {PropertyLayout} from '../../PropertyLayout';
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
      {(node.parent && node.parent.node.name() === 'obj') && (
        <PropertyLayout key={'k' + String(parentCollapsed)} property={node.step} />
      )}
      <JsonCrdtNodeOutline type={'con'}>
        <ClickableJson readonly compact collapsed doc={node.node.view()} />
      </JsonCrdtNodeOutline>
      {!!comma && ','}
    </>
  );
};
