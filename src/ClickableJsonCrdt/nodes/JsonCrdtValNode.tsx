import * as React from 'react';
import * as css from '../../css';
import {NodeRef, nodeRef} from '../NodeRef';
import {useJsonCrdt} from '../context';
import {JsonCrdtRegion} from '../JsonCrdtRegion';
import {JsonCrdtProperty} from '../JsonCrdtProperty';
import {JsonCrdtObjectLayout} from '../JsonCrdtObjectLayout';
import {JsonAtom} from '../../JsonAtom';
import type {ValNode} from 'json-joy/es2020/json-crdt';

export interface JsonCrdtValNodeProps {
  node: NodeRef<ValNode>;
}

export const JsonCrdtValNode: React.FC<JsonCrdtValNodeProps> = ({node}) => {
  const {render} = useJsonCrdt();

  const childNode = node.node.node();
  const child = <span className={css.line}>{render(nodeRef(childNode, node, ''))}</span>;

  let collapsedView: React.ReactNode = '…';
  if (childNode.name() === 'con') {
    const view = childNode.view();
    collapsedView = <JsonAtom value={view} />;
  }

  return (
    <JsonCrdtRegion node={node}>
      <JsonCrdtObjectLayout
        node={node}
        property={<JsonCrdtProperty node={node} />}
        collapsedView={collapsedView}
        brackets={['(', ')']}
      >
        {child}
      </JsonCrdtObjectLayout>
    </JsonCrdtRegion>
  );
};
