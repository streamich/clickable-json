import * as React from 'react';
import {useT} from 'use-t';
import Svg from 'iconista';
import {context} from './context';
import * as css from '../css';

export interface JsonHoverableProps {
  pointer: string;
  children: React.ReactElement;
}

export const JsonHoverable: React.FC<JsonHoverableProps> = ({pointer, children}) => {
  const [t] = useT();
  const {hoverPointer, setHoverPointer, activePointer, setActivePointer, compact, onChange, isInputFocused} =
    React.useContext(context);
  const [deleteHovered, setDeleteHovered] = React.useState(false);
  const useInsButtonClass = css.useInsButton();

  const onMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hoverPointer !== pointer) setHoverPointer(pointer);
  };

  const onMouseEnter = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHoverPointer(pointer);
  };

  const onMouseLeave = () => {
    setHoverPointer(null);
  };

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePointer(pointer);
  };

  const isHovered = hoverPointer === pointer;
  const isActive = activePointer === pointer;

  let subChildren = children.props.children;

  if (!!onChange && !isInputFocused && pointer === activePointer) {
    subChildren = (
      <>
        {subChildren}
        <button
          className={css.insButton + useInsButtonClass + css.deleteButton}
          onClick={() => onChange([{op: 'remove', path: pointer}])}
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
        (isHovered ? css.hovered : '') +
        (deleteHovered ? css.hoveredDanger : '') +
        (isActive ? css.active : ''),
      style: {
        ...(children.props.style || {}),
        outline: deleteHovered ? `1px dotted ${css.negative}` : undefined,
      },
    },
    subChildren,
  );
};
