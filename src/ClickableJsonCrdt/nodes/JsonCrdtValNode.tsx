import * as React from 'react';
import * as css from '../../css';
import {NodeRef} from '../NodeRef';
import {useJsonCrdt} from '../context';
import {JsonCrdtRegion} from '../JsonCrdtRegion';
import {ObjectLayout} from '../../ObjectLayout';
import {JsonCrdtProperty} from '../JsonCrdtProperty';
import type {ValNode} from 'json-joy/es2020/json-crdt';

export interface JsonCrdtValNodeProps {
  node: NodeRef<ValNode>;
}

export const JsonCrdtValNode: React.FC<JsonCrdtValNodeProps> = ({node}) => {
  const {render} = useJsonCrdt();

  const child = (
    <span className={css.line}>
      {render(new NodeRef(node.node.child(), node, ''))}
    </span>
  );

  return (
    <JsonCrdtRegion node={node}>
      <ObjectLayout
        property={<JsonCrdtProperty node={node} />}
        brackets={['(', ')']}
      >
        {child}
      </ObjectLayout>
    </JsonCrdtRegion>
  );
};
