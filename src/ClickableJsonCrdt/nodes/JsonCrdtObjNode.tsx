import * as React from 'react';
import {useJsonCrdt} from '../context';
import {NodeRef} from '../NodeRef';
import * as css from '../../css';
import {JsonCrdtRegion} from '../JsonCrdtRegion';
import {JsonCrdtProperty} from '../JsonCrdtProperty';
import {JsonCrdtObjectLayout} from '../JsonCrdtObjectLayout';
import {JsonCrdtObjInsert} from './JsonCrdtObjInsert';
import {useRerender} from '../hooks';
import type {ObjNode} from 'json-joy/es2020/json-crdt';

export interface JsonCrdtObjNodeProps {
  node: NodeRef<ObjNode>;
}

export const JsonCrdtObjNode: React.FC<JsonCrdtObjNodeProps> = ({node}) => {
  const {render} = useJsonCrdt();
  useRerender(node);

  const entries: React.ReactNode[] = [];

  node.node.nodes((child, key) => {
    entries.push(
      <span key={key} className={css.line}>
        {render(new NodeRef(child, node, key))}
      </span>,
    );
  });

  return (
    <JsonCrdtRegion node={node}>
      <JsonCrdtObjectLayout
        node={node}
        property={<JsonCrdtProperty node={node} />}
        collapsedView={!!entries.length && entries.length}
      >
        {entries}
        <JsonCrdtObjInsert node={node} />
      </JsonCrdtObjectLayout>
    </JsonCrdtRegion>
  );
};
