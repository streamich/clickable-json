import * as React from 'react';
import {context} from './context';
import {FocusRegion} from '../FocusRegion';

export interface JsonHoverableProps {
  pointer: string;
  children: React.ReactElement;
}

export const JsonHoverable: React.FC<JsonHoverableProps> = ({pointer, children}) => {
  const {hoverPointer, setHoverPointer, activePointer, setActivePointer, compact, onChange, isInputFocused} =
    React.useContext(context);

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

  return (
    <FocusRegion
      pointed={hoverPointer === pointer}
      focused={activePointer === pointer}
      compact={compact}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onDelete={!!onChange && !isInputFocused && pointer === activePointer ? () => onChange([{op: 'remove', path: pointer}]) : undefined}
    >
      {children}
    </FocusRegion>
  );
};
