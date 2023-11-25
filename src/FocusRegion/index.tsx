import * as React from 'react';
import {rule, theme} from 'nano-theme';
import {useT} from 'use-t';
import Svg from 'iconista';
import * as css from '../css';

const hoverableClass = rule({
  d: 'inline-block',
  pos: 'relative',
  va: 'top',
  bxz: 'border-box',
  pd: '3px',
  bdrad: '4px',
  trs: 'background-color .3s ease-out',
});

const hoverableCompactClass = rule({
  pd: '1px 3px',
});

const hoveredClass = rule({
  bgc: theme.blue(0.1),
});

const hoveredNegativeClass = rule({
  bgc: theme.red(0.1),
});

const hoveredDangerClass = rule({
  bgc: theme.red(0.08),
});

const activeClass = rule({
  out: `1px dotted ${css.blue}`,
});

const activeNegativeClass = rule({
  out: `1px dotted ${css.negative}`,
});

const asideClass = rule({
  d: 'inline-block',
  pos: 'absolute',
  top: '-1px',
  l: 'calc(100% + 0.5em)',
});

export interface FocusRegionProps {
  focused?: boolean;
  pointed?: boolean;
  compact?: boolean;
  aside?: React.ReactNode;
  negative?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  onMouseMove?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onDelete?: React.MouseEventHandler;
}

export const FocusRegion: React.FC<FocusRegionProps> = (props) => {
  const {focused, pointed, compact, aside, negative, children, onClick, onMouseMove, onMouseEnter, onMouseLeave, onDelete} =
    props;
  const [t] = useT();
  const [deleteHovered, setDeleteHovered] = React.useState(false);
  const useInsButtonClass = css.useInsButton();

  const deleteButton = onDelete ? (
    <button
      className={css.insButton + useInsButtonClass + css.deleteButton}
      onClick={onDelete}
      onMouseEnter={() => setDeleteHovered(true)}
      onMouseOver={() => setDeleteHovered(true)}
      onMouseLeave={() => setDeleteHovered(false)}
    >
      <Svg set="atlaskit" icon="cross" width={10} height={10} />
      <span className={css.tooltip + css.deleteButtonTooltip}>{t('Delete')}</span>
    </button>
  ) : undefined;

  const className =
    hoverableClass +
    (compact ? hoverableCompactClass : '') +
    (pointed ? (negative ? hoveredNegativeClass : hoveredClass) : '') +
    (deleteHovered ? hoveredDangerClass : '') +
    (focused ? (negative ? activeNegativeClass : activeClass) : '');

  return (
    <span
      className={className}
      style={{
        outline: deleteHovered ? `1px dotted ${css.negative}` : undefined,
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {children}
      {deleteButton}
      {!!aside && <span className={asideClass}>{aside}</span>}
    </span>
  );
};
