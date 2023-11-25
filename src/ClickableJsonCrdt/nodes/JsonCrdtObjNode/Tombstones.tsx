import * as React from 'react';
import {rule, theme} from 'nano-theme';
import {useT} from 'use-t';
import type {ObjNode} from 'json-joy/es2020/json-crdt';
import {MiniTitle} from 'p4-ui/lib/src/3-list-item/MiniTitle';
import {NodeRef} from '../../NodeRef';

const blockClass = rule({
  d: 'block',
  bxz: 'border-box',
  pd: '0 16px 4px',
  bdrad: '8px',
  mr: '4px 0 0 -16px',
  w: 'calc(100% + 16px)',
  bg: theme.red(0.05),
});

const titleClass = rule({
  d: 'block',
  w: '100%',
  bxz: 'border-box',
  pd: '4px 3px',
  cur: 'default',
  us: 'none',
});

export interface TombstonesProps {
  node: NodeRef<ObjNode>;
  tombstones: React.ReactNode[];
}

export const Tombstones: React.FC<TombstonesProps> = ({node, tombstones}) => {
  const [showTombstones, setShowTombstones] = React.useState(false);
  const [t] = useT();

  if (!tombstones.length) return null;

  return (
    <span className={blockClass}>
      <style className={titleClass} onClick={() => setShowTombstones(x => !x)}>
        <MiniTitle style={{fontSize: '0.6em', color: theme.red(.75)}}>
          {tombstones.length + ' ' + (tombstones.length === 1 ? t('tombstone') : t('tombstones'))}
        </MiniTitle>
      </style>
      {showTombstones && tombstones}
    </span>
  );
};
