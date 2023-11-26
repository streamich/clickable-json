import * as React from 'react';
import * as css from '../../../css';
import {useJsonCrdt} from '../../context';
import {NodeRef, nodeRef} from '../../NodeRef';
import {JsonCrdtRegion} from '../../JsonCrdtRegion';
import {JsonCrdtProperty} from '../../JsonCrdtProperty';
import {JsonCrdtObjectLayout} from '../../JsonCrdtObjectLayout';
import {useRerender} from '../../hooks';
import {InsertElement} from './InsertElement';
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
    const key = child.id.sid + '.' + child.id.time + '.' + i;
    entries.push(
      <React.Fragment key={key}>
        <InsertElement key={key} node={node} index={i} />
        <span className={css.line}>
          {render(childNodeRef)}
        </span>
      </React.Fragment>
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
        <InsertElement key={node.node.length()} node={node} index={node.node.length()} />
      </JsonCrdtObjectLayout>
    </JsonCrdtRegion>
  );
};
