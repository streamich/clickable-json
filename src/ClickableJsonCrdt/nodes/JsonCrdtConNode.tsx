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

  const {sid, time} = node.node.id;
  const id = '...' + String(sid).slice(String(sid).length - 4) + '.' + time;

  return (
    <>
      {(node.parent && node.parent.node.name() === 'obj') && (
        <PropertyLayout key={'k' + String(parentCollapsed)} property={node.step} />
      )}
      {' '}
      <JsonCrdtNodeOutline node={node}>
        <ClickableJson readonly compact collapsed doc={node.node.view()} />
      </JsonCrdtNodeOutline>
      {!!comma && ','}
    </>
  );
};
