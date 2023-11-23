import * as React from 'react';
import {useT} from 'use-t';
import Svg from 'iconista';
import * as css from '../css';

export interface FocusRegionProps {
  focused?: boolean;
  pointed?: boolean;
  compact?: boolean;
  children: React.ReactElement;
  onClick?: React.MouseEventHandler;
  onMouseMove?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onDelete?: React.MouseEventHandler;
}

export const FocusRegion: React.FC<FocusRegionProps> = ({focused, pointed, compact, children, onClick, onMouseMove, onMouseEnter, onMouseLeave, onDelete}) => {
  const [t] = useT();
  const [deleteHovered, setDeleteHovered] = React.useState(false);
  const useInsButtonClass = css.useInsButton();

  let subChildren = children.props.children;

  if (onDelete) {
    subChildren = (
      <>
        {subChildren}
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
      </>
    );
  }

  return React.cloneElement(
    children,
    {
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      onClick,
      className:
        (children.props.className || '') +
        css.hoverable +
        (compact ? css.hoverableCompact : '') +
        (pointed ? css.hovered : '') +
        (deleteHovered ? css.hoveredDanger : '') +
        (focused ? css.active : ''),
      style: {
        ...(children.props.style || {}),
        outline: deleteHovered ? `1px dotted ${css.negative}` : undefined,
      },
    },
    subChildren,
  );
};
