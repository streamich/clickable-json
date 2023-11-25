import * as React from 'react';
import {FocusRegion} from '../FocusRegion';
import {NodeRef} from './NodeRef';
import {useFocus} from '../context/focus';
import {id} from './utils';
import {useStyles} from '../context/style';
import {TypeAndId} from './TypeAndId';
import {useJsonCrdt} from './context';
import type {ObjNode} from 'json-joy/es2020/json-crdt';

export interface JsonCrdtRegionProps {
  node: NodeRef<any>;
  aside?: React.ReactNode;
  children: React.ReactNode;
}

export const JsonCrdtRegion: React.FC<JsonCrdtRegionProps> = ({node, children}) => {
  const {model} = useJsonCrdt();
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
  const isPointed = pointed === nodeId;

  const aside = isFocused ? (
    <span style={{display: 'inline-block', margin: '-4px 0 0'}}>
      <TypeAndId node={node} active={isFocused} />
    </span>
  ) : undefined;

  return (
    <FocusRegion
      pointed={isPointed}
      focused={isFocused}
      compact={compact}
      aside={aside}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onDelete={isFocused && (node.parent?.node.name() === 'obj') ? () => {
        const api = model.api.wrap(node.parent?.node! as ObjNode);
        api.del([node.step]);
      } : undefined}
    >
      {children}
    </FocusRegion>
  );
};
