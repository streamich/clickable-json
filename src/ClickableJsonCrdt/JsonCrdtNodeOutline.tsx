import * as React from 'react';
import {rule, useRule, theme} from 'nano-theme';

const blockClass = rule({
  d: 'inline-block',
  pos: 'relative',
  bd: '1px solid transparent',
  mr: '16px 0 0',
  pad: '0.2em',
  bdrad: '4px',
});

const typeClass = rule({
  ...theme.font.mono,
  pos: 'absolute',
  fz: '10px',
  t: '-14px',
  r: 0,
  us: 'none',
  pe: 'none',
  col: 'transparent',
  trs: 'color 0.15s ease-in-out',
});

export interface JsonCrdtNodeOutlineProps {
  type: string;
  children: React.ReactNode;
}

export const JsonCrdtNodeOutline: React.FC<JsonCrdtNodeOutlineProps> = ({type, children}) => {
  const blockClassDynamic = useRule(theme => ({
    '&:hover': {
      bd: `1px solid ${theme.g(0, 0.1)}`,
    },
  }));
  const typeClassDynamic = useRule(theme => ({
    [`.${blockClass.trim()}:hover &`]: {
      col: theme.g(.5),
    },
  }));

  return (
    <span className={blockClass + blockClassDynamic}>
      <span className={typeClass + typeClassDynamic}>
        {type}
      </span>
      {children}
    </span>
  );
};
