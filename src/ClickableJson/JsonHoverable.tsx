import * as React from 'react';
import {useT} from 'use-t';
import Svg from 'iconista';
import {useTheme} from 'nano-theme';
import {context} from './context';
import * as css from '../css';

export interface JsonHoverableProps {
  pointer: string;
  children: React.ReactElement;
}

export const JsonHoverable: React.FC<JsonHoverableProps> = ({pointer, children}) => {
  const [t] = useT();
  const {hoverPointer, setHoverPointer, activePointer, setActivePointer, formal, compact, onChange, isInputFocused} =
    React.useContext(context);
  const [draggedOver, setDraggedOver] = React.useState(false);
  const [deleteHovered, setDeleteHovered] = React.useState(false);
  const theme = useTheme();
  const useInsButtonClass = css.useInsButton();

  const onMouseMove = (e: React.MouseEvent) => {
    if (!formal) e.preventDefault(); // formal allows user select text
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

  const onDragEnter = formal
    ? undefined
    : (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDraggedOver(true);
      };

  const onDragLeave = formal
    ? undefined
    : (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDraggedOver(false);
      };

  const onDragOver = formal
    ? undefined
    : (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
      };

  const onDrop = formal
    ? undefined
    : (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDraggedOver(false);
        const from = e.dataTransfer.getData('text/plain');
        if (onChange) onChange([{op: 'move', from, path: pointer}]);
      };

  const onDragStart = formal
    ? undefined
    : (e: React.DragEvent) => {
        e.stopPropagation();
        e.dataTransfer.setData('text/plain', pointer);
      };

  const isHovered = hoverPointer === pointer;
  const isActive = activePointer === pointer;

  let subChildren = children.props.children;

  if (pointer) {
    subChildren = (
      <span
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        style={{outline: draggedOver ? `1px solid ${theme.blue}` : undefined}}
      >
        <span draggable={!formal} onDragStart={onDragStart}>
          {subChildren}
        </span>
      </span>
    );
  }

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
        (isActive ? css.active : ''),
      style: {
        ...(children.props.style || {}),
        outline: deleteHovered ? `1px dotted ${css.negative}` : undefined,
      },
    },
    subChildren,
  );
};
