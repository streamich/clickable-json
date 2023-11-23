import * as React from 'react';
import {rule, useRule, theme} from 'nano-theme';
import {TypeAndId} from './TypeAndId';
import {NodeRef} from './NodeRef';

const blockClass = rule({
  d: 'inline-block',
  pos: 'relative',
  bd: '1px solid transparent',
  mar: '-3px',
  pad: '2px',
  // mr: '16px 0 0',
  // pad: '0.2em',
  bdrad: '4px',
});

const typeClass = rule({
  ...theme.font.mono,
  pos: 'absolute',
  l: 'calc(100% + 8px)',
  t: '-6px',
  us: 'none',
  pe: 'none',
  op: 0,
  trs: 'opacity 0.15s',
  [`.${blockClass.trim()}:hover &`]: {
    op: 1,
  },
});

export interface JsonCrdtNodeOutlineProps {
  node: NodeRef<any>;
  children: React.ReactNode;
}

export const JsonCrdtNodeOutline: React.FC<JsonCrdtNodeOutlineProps> = ({node, children}) => {
  const blockClassDynamic = useRule((theme) => ({
    '&:hover': {
      bd: `1px solid ${theme.g(0, 0.1)}`,
    },
  }));

  return (
    <span className={blockClass + blockClassDynamic}>
      <span className={typeClass}>
        <TypeAndId node={node} />
      </span>
      {children}
    </span>
  );
};
