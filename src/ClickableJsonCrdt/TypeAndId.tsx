import * as React from 'react';
import {rule, theme, useTheme} from 'nano-theme';
import {NodeRef} from './NodeRef';
import type {JsonNode} from 'json-joy/es2020/json-crdt';

const blockClass = rule({
  ...theme.font.mono,
  fz: '10px',
  lh: '9px',
  us: 'none',
  pe: 'none',
});

export interface TypeAndIdProps {
  node: NodeRef<any>;
}

export const TypeAndId: React.FC<TypeAndIdProps> = React.memo(({node}) => {
  const theme = useTheme();

  const {sid, time} = node.node.id;
  const id = '...' + String(sid).slice(String(sid).length - 4) + '.' + time;

  return (
    // <span className={blockClass} style={{color: theme.g(0.5)}}>
    <span className={blockClass} style={{color: theme.color.sem.blue[0]}}>
      {(node.node as JsonNode).name()}
      <span style={{color: theme.g(0, 0.6), display: 'block'}}>{id}</span>
    </span>
  );
});
