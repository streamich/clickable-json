import * as React from 'react';
import * as css from '../../css';
import {NodeRef} from '../NodeRef';
import {useJsonCrdt} from '../context';
import {JsonCrdtRegion} from '../JsonCrdtRegion';
import {JsonCrdtProperty} from '../JsonCrdtProperty';
import type {ValNode} from 'json-joy/es2020/json-crdt';
import {JsonCrdtObjectLayout} from '../JsonCrdtObjectLayout';

export interface JsonCrdtValNodeProps {
  node: NodeRef<ValNode>;
}

export const JsonCrdtValNode: React.FC<JsonCrdtValNodeProps> = ({node}) => {
  const {render} = useJsonCrdt();

  const child = <span className={css.line}>{render(new NodeRef(node.node.child(), node, ''))}</span>;

  return (
    <JsonCrdtRegion node={node}>
      <JsonCrdtObjectLayout property={<JsonCrdtProperty node={node} />} brackets={['(', ')']}>
        {child}
      </JsonCrdtObjectLayout>
    </JsonCrdtRegion>
  );
};
