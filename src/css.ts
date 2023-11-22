import {makeRule, rule, theme, darkTheme} from 'nano-theme';

export const blue = theme.color.sem.blue[0];
export const negative = theme.color.sem.negative[0];

export const block = rule({
  d: 'inline-block',
  ff: 'monospace',
  col: theme.g(0.1),
});

export const object = rule({
  pos: 'relative',
  d: 'inline-block',
});

export const ValueColor = {
  nil: [theme.g(0.6), darkTheme.g(0.6)],
  str: ['#CC2336', '#CC2336'],
  bool: ['#411888', '#9168c8'],
  num: ['#0a8F3F', '#0FaF4F'],
  float: ['#015833', '#51a883'],
}

export const quote = rule({
  col: '#E84D3D',
});

export const property = rule({
  pad: '0',
  fw: 'bold',
});

const activeInput = {
  col: theme.g(0.2),
  pad: '5px',
  bg: theme.bg,
  bd: `1px solid ${theme.g(0.7)}`,
  mar: '-6px',
  out: 0,
};

export const input = rule({
  z: 2,
  pos: 'relative',
  bd: 0,
  mar: 0,
  pad: 0,
  bg: 'transparent',
  bdrad: '5px',
  d: 'inline-block',
  minW: 'auto',
  w: 'auto',
  '&:focus': activeInput,
});

export const inputActive = rule(activeInput);

export const colon = rule({
  pad: '0 8px 0 0px',
  '&>span': {
    pad: '0 2px',
  },
  '&:hover': {
    '&>span': {
      out: `1px dotted ${blue}`,
    },
  },
});

export const list = rule({
  d: 'block',
  listStyleType: 'none',
  pad: 0,
  mar: '0 0 0 32px',
});

export const line = rule({
  d: 'block',
  listStyle: 'none',
  pad: 0,
  mar: 0,
});

export const lineInner = rule({
  d: 'inline-block',
});

export const hoverable = rule({
  bxz: 'border-box',
  pad: '3px',
  bdrad: '3px',
  trs: 'background-color .3s ease-out',
});

export const hoverableCompact = rule({
  pad: '1px 3px',
});

export const hovered = rule({
  bgc: theme.blue(0.1),
});

export const active = rule({
  out: `1px dotted ${blue}`,
  pos: 'relative',
});

export const collapser = rule({
  pad: '0 6px',
  pos: 'absolute',
  top: '0px',
  left: '-24px',
  cur: 'default',
  userSelect: 'none',
});

export const collapsed = rule({
  col: blue,
});

export const bracketHovered = rule({
  out: `1px dotted ${blue}`,
});

export const insArrBlock = rule({
  pos: 'relative',
  h: '0px',
  w: '0px',
});

export const insArrDot = rule({
  pos: 'absolute',
  top: '0px',
  left: '-4px',
  w: '3px',
  h: '3px',
  bdrad: '50%',
  bg: blue,
  pointerEvents: 'none',
  [`.${insArrBlock.trim()}:hover &`]: {
    top: '-1px',
    left: '-5px',
    w: '5px',
    h: '5px',
  },
});

export const insArrLine = rule({
  pos: 'absolute',
  top: '1px',
  left: '-56px',
  w: '50px',
  h: '0px',
  bdt: `1px dotted ${blue}`,
  pointerEvents: 'none',
  [`.${insArrBlock.trim()}:hover &`]: {
    left: '-58px',
    w: '54px',
    bdt: `1px solid ${blue}`,
  },
});

export const insArrButton = rule({
  pos: 'absolute',
  top: '-7px',
  left: '-75px',
});

export const insButton = rule({
  w: '17px',
  h: '17px',
  bdrad: '2px',
  pad: 0,
  mar: 0,
  out: 0,
  ff: 'monospace',
  lh: '16px',
  cur: 'pointer',
  bd: `1px dotted ${blue}`,
  col: blue,
  fw: 'normal',
  '&:hover': {
    fw: 'bold',
    bg: blue,
  },
  [`.${insArrBlock.trim()}:hover &`]: {
    fw: 'bold',
    bg: blue,
  },
});

export const useInsButton = makeRule(theme => ({
  bg: theme.bg,
  '&:hover': {
    col: theme.bg,
  },
  [`.${insArrBlock.trim()}:hover &`]: {
    col: theme.bg,
  },
  '&:active': {
    bg: theme.g(0.1),
    bd: `1px solid ${theme.g(0.1)}`,
  },
}));

export const tooltip = rule({
  ...theme.font.ui1,
  pos: 'absolute',
  top: '-32px',
  left: '0px',
  d: 'inline-block',
  bg: 'rgba(0,0,0,.8)',
  col: '#fff',
  fz: 13 / 13.4 + 'em',
  pad: '4px 6px 6px',
  bdrad: '2px',
  z: 3,
  pointerEvents: 'none',
  userSelect: 'none',
});

export const insArrTooltip = rule({
  pos: 'absolute',
  top: '-36px',
  left: '-75px',
  vis: 'hidden',
  [`.${insArrBlock.trim()}:hover &`]: {
    vis: 'visible',
  },
});

export const deleteButton = rule({
  d: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  w: '20px',
  h: '20px',
  pos: 'absolute',
  top: '-11px',
  left: '-11px',
  z: 2,
  bdrad: '50%',
  svg: {
    fill: blue,
  },
  '&:hover': {
    bg: negative,
    bd: `1px solid ${negative}`,
    svg: {
      fill: '#fff',
    },
  },
  '&:active': {
    bg: theme.g(0.1),
    bd: `1px solid ${theme.g(0.1)}`,
  },
});

export const deleteButtonTooltip = rule({
  pos: 'absolute',
  top: '-30px',
  left: '0px',
  vis: 'hidden',
  [`.${deleteButton.trim()}:hover &`]: {
    vis: 'visible',
  },
});
