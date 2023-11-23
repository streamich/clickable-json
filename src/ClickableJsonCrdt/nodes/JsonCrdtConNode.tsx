import * as React from 'react';
import {ClickableJson} from '../../ClickableJson';
import {JsonCrdtNodeOutline} from '../JsonCrdtNodeOutline';
import type {ConNode} from 'json-joy/es2020/json-crdt';
import type {NodeRef} from '../NodeRef';

export interface JsonCrdtConNodeProps {
  node: NodeRef<ConNode>;
}

export const JsonCrdtConNode: React.FC<JsonCrdtConNodeProps> = ({node}) => {
  return (
    <span>
      <JsonCrdtNodeOutline type={'con'}>
        <ClickableJson readonly compact collapsed doc={node.node.view()} />
      </JsonCrdtNodeOutline>
    </span>
  );
};
