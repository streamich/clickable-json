import * as React from 'react';
import {useT} from 'use-t';
import * as css from '../../css';
import {useJsonCrdt} from '../context';
import {NodeRef, nodeRef} from '../NodeRef';
import {JsonCrdtRegion} from '../JsonCrdtRegion';
import {JsonCrdtProperty} from '../JsonCrdtProperty';
import {JsonCrdtObjectLayout} from '../JsonCrdtObjectLayout';
import {JsonCrdtObjInsert} from './JsonCrdtObjInsert';
import {useRerender} from '../hooks';
import {ConNode, type JsonNode, type ObjNode} from 'json-joy/es2020/json-crdt';
import {GrayButton} from '../../buttons/GrayButton';
import {GrayCard} from '../../cards/GrayCard';

const isTombstone = (node: JsonNode) =>
  node instanceof ConNode && node.val === undefined;

export interface JsonCrdtObjNodeProps {
  node: NodeRef<ObjNode>;
}

export const JsonCrdtObjNode: React.FC<JsonCrdtObjNodeProps> = ({node}) => {
  const [showTombstones, setShowTombstones] = React.useState(false);
  const [t] = useT();
  const {render} = useJsonCrdt();
  useRerender(node);

  const entries: React.ReactNode[] = [];
  const tombstones: React.ReactNode[] = [];

  node.node.nodes((child, key) => {
    const element = (
      <span key={key} className={css.line}>
        {render(nodeRef(child, node, key))}
      </span>
    );
    if (isTombstone(child)) tombstones.push(element);
    else entries.push(element);
  });

  return (
    <JsonCrdtRegion node={node}>
      <JsonCrdtObjectLayout
        node={node}
        property={<JsonCrdtProperty node={node} />}
        collapsedView={!!entries.length && entries.length}
      >
        {entries}
        {showTombstones && (
          <span style={{display: 'inline-block', margin: '8px 0 0 -16px', width: 'calc(100% + 16px)'}}>
            <GrayCard>
              {tombstones}
              <br />
              <GrayButton onClick={() => setShowTombstones(false)}>
                {t('Hide tombstones')}
              </GrayButton>
            </GrayCard>
          </span>
        )}
        {!showTombstones && tombstones.length > 0 && (
          <span>
            <GrayButton onClick={() => setShowTombstones(true)}>
              {tombstones.length} tombstones
            </GrayButton>
          </span>
        )}
        <JsonCrdtObjInsert node={node} />
      </JsonCrdtObjectLayout>
    </JsonCrdtRegion>
  );
};
