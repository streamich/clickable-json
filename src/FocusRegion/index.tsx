import * as React from 'react';
import {rule} from 'nano-theme';
import {useT} from 'use-t';
import Svg from 'iconista';
import * as css from '../css';

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
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  onMouseMove?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onDelete?: React.MouseEventHandler;
}

export const FocusRegion: React.FC<FocusRegionProps> = (props) => {
  const {
    focused,
    pointed,
    compact,
    aside,
    onClick,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    onDelete,
  } = props;
  let {children} = props;
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
    css.hoverable +
    (compact ? css.hoverableCompact : '') +
    (pointed ? css.hovered : '') +
    (deleteHovered ? css.hoveredDanger : '') +
    (focused ? css.active : '');

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
