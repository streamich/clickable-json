import * as React from 'react';
import * as css from '../../css';
import {useJsonCrdt} from '../context';
import {NodeRef} from '../NodeRef';
import {ObjectLayout} from '../../ObjectLayout';
import {JsonCrdtRegion} from '../JsonCrdtRegion';
import {JsonCrdtProperty} from '../JsonCrdtProperty';
import type {ArrNode} from 'json-joy/es2020/json-crdt';

export interface JsonCrdtArrNodeProps {
  node: NodeRef<ArrNode>;
}

export const JsonCrdtArrNode: React.FC<JsonCrdtArrNodeProps> = ({node}) => {
  const {render} = useJsonCrdt();

  const entries: React.ReactNode[] = [];
  let i = 0;

  node.node.children((child) => {
    entries.push(
      <span key={child.id.sid + '.' + child.id.time} className={css.line}>
        {render(new NodeRef(child, node, String(i)))}
      </span>,
    );
    i++;
  });

  return (
    <JsonCrdtRegion node={node}>
      <ObjectLayout property={<JsonCrdtProperty node={node} />} brackets={['[', ']']}>
        {entries}
      </ObjectLayout>
    </JsonCrdtRegion>
  );
};
