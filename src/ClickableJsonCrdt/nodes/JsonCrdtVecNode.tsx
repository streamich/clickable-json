import * as React from 'react';
import * as css from '../../css';
import {useJsonCrdt} from '../context';
import {NodeRef} from '../NodeRef';
import {ObjectLayout} from '../../ObjectLayout';
import {JsonCrdtRegion} from '../JsonCrdtRegion';
import {JsonCrdtProperty} from '../JsonCrdtProperty';
import type {VecNode} from 'json-joy/es2020/json-crdt';

export interface JsonCrdtVecNodeProps {
  node: NodeRef<VecNode>;
}

export const JsonCrdtVecNode: React.FC<JsonCrdtVecNodeProps> = ({node}) => {
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
      <ObjectLayout
        property={<JsonCrdtProperty node={node} />}
        brackets={['[', ']']}
        header={<span style={{opacity: 0.5, display: 'inline-block', margin: '0.25em 0 0 -0.3em'}}>→</span>}
      >
        {entries}
      </ObjectLayout>
    </JsonCrdtRegion>
  );
};
