import * as React from 'react';
import * as css from '../../css';
import {useJsonCrdt} from '../context';
import {NodeRef, nodeRef} from '../NodeRef';
import {JsonCrdtRegion} from '../JsonCrdtRegion';
import {JsonCrdtProperty} from '../JsonCrdtProperty';
import {JsonCrdtObjectLayout} from '../JsonCrdtObjectLayout';
import {useRerender} from '../hooks';
import type {ArrNode} from 'json-joy/es2020/json-crdt';

export interface JsonCrdtArrNodeProps {
  node: NodeRef<ArrNode>;
}

export const JsonCrdtArrNode: React.FC<JsonCrdtArrNodeProps> = ({node}) => {
  const {render} = useJsonCrdt();
  useRerender(node);

  const entries: React.ReactNode[] = [];
  let i = 0;

  node.node.children((child) => {
    const childNodeRef = nodeRef(child, node, String(i));
    childNodeRef.step = String(i);
    entries.push(
      <span key={child.id.sid + '.' + child.id.time} className={css.line}>
        {render(childNodeRef)}
      </span>,
    );
    i++;
  });

  return (
    <JsonCrdtRegion node={node}>
      <JsonCrdtObjectLayout
        node={node}
        property={<JsonCrdtProperty node={node} />}
        collapsedView={!!entries.length && entries.length}
        brackets={['[', ']']}
      >
        {entries}
      </JsonCrdtObjectLayout>
    </JsonCrdtRegion>
  );
};
