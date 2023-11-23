import * as React from 'react';
import {FocusRegion} from '../FocusRegion';
import {NodeRef} from './NodeRef';
import {useFocus} from '../context/focus';
import {id} from './utils';
import {useStyles} from '../context/style';
import {TypeAndId} from './TypeAndId';

export interface JsonCrdtRegionProps {
  node: NodeRef<any>;
  aside?: React.ReactElement;
  children: React.ReactElement;
}

export const JsonCrdtRegion: React.FC<JsonCrdtRegionProps> = ({node, aside, children}) => {
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

  const isFocused = focused === nodeId;

  return (
    <FocusRegion
      pointed={pointed === nodeId}
      focused={isFocused}
      compact={compact}
      aside={isFocused ? <TypeAndId node={node} /> : undefined}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </FocusRegion>
  );
};
