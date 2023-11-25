import * as React from 'react';
import {rule, useRule} from 'nano-theme';

const buttonClass = rule({
  cur: 'pointer',
  fz: '0.95em',
  bd: 0,
  pd: '4px 8px',
  mr: '4px 0',
  bdrad: '4px',
  trs: 'background .15s',
  '&:focus': {
    outlineOffset: '1px',
    out: '1px dashed rgba(0,0,0,.2)',
  },
  '&:active': {
    out: 0,
  },
});

export interface GrayButtonProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const GrayButton: React.FC<GrayButtonProps> = ({children, onClick}) => {
  const buttonClassDynamic = useRule((theme) => ({
    col: theme.g(0, 0.5),
    bg: theme.g(0, 0.05),
    '&:hover': {
      col: theme.g(0, 0.7),
      bg: theme.g(0, 0.1),
    },
    '&:active': {
      bg: theme.g(0, 0.2),
    },
  }));

  return (
    <button className={buttonClass + buttonClassDynamic} onClick={onClick}>
      {children}
    </button>
  );
};
