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
  undef: [theme.g(0.8), darkTheme.g(0.8)],
  str: ['#e00e44', '#f01e54'],
  bool: ['#411888', '#9168c8'],
  num: ['#0a8F3F', '#0FaF4F'],
  zero: ['#748A00', '#94AA11'],
  float: ['#016873', '#51a8b3'],
};

export const quote = rule({
  col: '#E84D3D',
});

export const property = rule({
  pad: '0',
  fw: 'bold',
  bxz: 'border-box',
});

const activeInput = {
  col: theme.g(0),
  pd: '5px',
  bg: theme.bg,
  bd: `1px solid ${theme.g(0.7)}`,
  mr: '-6px',
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
  // '&:focus': activeInput,
  '&::selection': {
    col: '#fff',
    bgc: blue,
  },
  input: {
    out: 0,
  },
});

export const inputActive = rule(activeInput);

export const colon = rule({
  pd: '0 8px 0 0px',
  cur: 'default',
  '&>span': {
    pd: '0 2px',
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
  pd: 0,
  mr: '0 0 0 32px',
});

export const line = rule({
  d: 'block',
  ls: 'none',
  pd: 0,
  mr: 0,
});

export const lineInner = rule({
  d: 'inline-block',
});

export const hoverable = rule({
  d: 'inline-block',
  pos: 'relative',
  va: 'top',
  bxz: 'border-box',
  pd: '3px',
  bdrad: '4px',
  trs: 'background-color .3s ease-out',
});

export const hoverableCompact = rule({
  pd: '1px 3px',
});

export const hovered = rule({
  bgc: theme.blue(0.1),
});

export const hoveredDanger = rule({
  bgc: theme.red(0.08),
});

export const active = rule({
  out: `1px dotted ${blue}`,
  pos: 'relative',
});

export const bracket = rule({
  pos: 'relative',
  cur: 'default',
});

export const collapser = rule({
  pd: '0 6px',
  pos: 'absolute',
  t: '0px',
  l: '-24px',
  cur: 'default',
  us: 'none',
});

export const collapsed = rule({
  col: blue,
  cur: 'default',
  fw: 'bold',
  bg: theme.blue(0.1),
  pd: '2px',
  mr: '-2px',
  bdrad: '4px',
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
  t: '0px',
  l: '-4px',
  w: '3px',
  h: '3px',
  bdrad: '50%',
  bg: blue,
  pe: 'none',
  [`.${insArrBlock.trim()}:hover &`]: {
    top: '-2px',
    left: '2px',
    w: '7px',
    h: '7px',
  },
});

export const insArrLine = rule({
  pos: 'absolute',
  t: '1px',
  l: '-56px',
  w: '50px',
  h: '0px',
  bdt: `1px dotted ${blue}`,
  pe: 'none',
  [`.${insArrBlock.trim()}:hover &`]: {
    l: '-56px',
    w: '56px',
    bdt: `1px solid ${blue}`,
  },
});

export const insArrButton = rule({
  pos: 'absolute',
  t: '-7px',
  l: '-75px',
});

export const insButton = rule({
  w: '17px',
  h: '17px',
  bdrad: '2px',
  pad: 0,
  mr: 0,
  out: 0,
  ff: 'monospace',
  lh: '16px',
  cur: 'pointer',
  bd: `1px dotted ${blue}`,
  col: blue,
  fw: 'normal',
  '&:hover': {
    bg: blue,
  },
});

export const useInsButton = makeRule((theme) => ({
  bg: theme.bg,
  '&:hover': {
    col: theme.bg,
  },
  '&:active': {
    col: theme.g(0.9),
    bg: theme.g(0.1),
    bd: `1px solid ${theme.g(0.1)}`,
  },
}));

export const tooltip = rule({
  ...theme.font.ui1,
  pos: 'absolute',
  t: '-2.8em',
  l: '0px',
  d: 'inline-block',
  bg: 'rgba(0,0,0,.8)',
  col: '#fff',
  fz: 12 / 13.4 + 'em',
  pad: '.4em .8em',
  bdrad: '.4em',
  z: 3,
  pe: 'none',
  us: 'none',
});

export const insArrTooltip = rule({
  pos: 'absolute',
  t: '-2.8em',
  l: '-75px',
  vis: 'hidden',
  [`.${insArrBlock.trim()}:hover &`]: {
    vis: 'visible',
  },
});

export const deleteButton = rule({
  d: 'flex',
  jc: 'center',
  ai: 'center',
  w: '20px',
  h: '20px',
  pos: 'absolute',
  t: '-11px',
  l: '-11px',
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
  t: '-30px',
  l: '0px',
  vis: 'hidden',
  [`.${deleteButton.trim()}:hover &`]: {
    vis: 'visible',
  },
});
