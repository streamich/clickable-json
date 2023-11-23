import * as React from 'react';
import {FocusRegion} from '../FocusRegion';
import {NodeRef} from './NodeRef';
import {useFocus} from '../context/focus';
import {id} from './utils';
import {useStyles} from '../context/style';

export interface JsonCrdtRegionProps {
  node: NodeRef<any>;
  children: React.ReactElement;
}

export const JsonCrdtRegion: React.FC<JsonCrdtRegionProps> = ({node, children}) => {
  const {compact} = useStyles();
  const {focused, focus, pointed, point} = useFocus();
  const nodeId = id(node);

  const onMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pointed !== nodeId) point(nodeId);
  };

  const onMouseEnter = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    point(nodeId);
  };

  const onMouseLeave = () => {
    point('');
  };

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    focus(nodeId);
  };

  return (
    <FocusRegion
      pointed={pointed === nodeId}
      focused={focused === nodeId}
      compact={compact}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </FocusRegion>
  );
};
