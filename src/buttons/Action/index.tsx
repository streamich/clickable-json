import * as React from 'react';
import {drule, useTheme, theme} from 'nano-theme';
import * as css from '../../css';

const blockClass = drule({
  pos: 'relative',
  d: 'flex',
  jc: 'center',
  ai: 'center',
  w: '17px',
  h: '17px',
  bdrad: '2px',
  pad: 0,
  mr: 0,
  out: 0,
  ff: 'monospace',
  lh: '16px',
  cur: 'pointer',
  bd: `1px dotted ${css.blue}`,
  col: css.blue,
  fw: 'normal',
});

const tooltipClass = drule({
  ...theme.font.ui1,
  pos: 'absolute',
  d: 'none',
  t: '-2.5em',
  l: '0px',
  bg: 'rgba(0,0,0,.8)',
  col: '#fff',
  fz: 12 / 13.4 + 'em',
  pad: '.4em .8em',
  bdrad: '.4em',
  z: 3,
  pe: 'none',
  us: 'none',
  ws: 'nowrap',
  [`.${blockClass.toString().trim()}:hover &`]: {
    d: 'inline-block',
  }
});

export interface ActionProps {
  className?: string;
  tooltip?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onMouseOver?: React.MouseEventHandler;
}

export const Action: React.FC<ActionProps> = ({className = '', tooltip, children, onClick, onMouseEnter, onMouseLeave, onMouseOver}) => {
  const theme = useTheme();

  return (
    <button
      className={blockClass({
        bg: theme.bg,
        '&:hover': {
          col: theme.bg,
          bg: css.blue,
        },
        '&:active': {
          col: theme.g(0.9),
          bg: theme.g(0.1),
          bd: `1px solid ${theme.g(0.1)}`,
        },
      }) + className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
    >
      {children}
      {!!tooltip && (
        <span className={tooltipClass({})}>
          {tooltip}
        </span>
      )}
    </button>
  );
};
