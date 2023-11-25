import * as React from 'react';
import {FocusRegion} from '../FocusRegion';
import {useFocus} from '../context/focus';
import {useStyles} from '../context/style';
import {useJsonCrdt} from './context';
import {TypeAndId} from './TypeAndId';
import {NodeRef} from './NodeRef';
import {id} from './utils';
import type {ConNode, JsonNode, ObjNode} from 'json-joy/es2020/json-crdt';

const isObjTombstone = (node: NodeRef<JsonNode>): boolean => {
  const parent = node.parent;
  if (!parent) return false;
  if (parent.node.name() !== 'obj') return false;
  if (node.node.name() !== 'con') return false;
  return (node.node as ConNode).val === undefined;
};

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
  const isTombstone = isObjTombstone(node);

  const aside = isFocused ? (
    <span style={{display: 'inline-block', margin: '-4px 0 0'}}>
      <TypeAndId node={node} active={isFocused} negative={isTombstone} />
    </span>
  ) : undefined;

  return (
    <FocusRegion
      pointed={isPointed}
      focused={isFocused}
      compact={compact}
      negative={isTombstone}
      aside={aside}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onDelete={
        isFocused && (node.parent?.node.name() === 'obj') && !isTombstone
          ? () => {
              // eslint-disable-next-line
              const api = model.api.wrap(node.parent?.node! as ObjNode);
              api.del([node.step]);
            }
          : undefined
      }
    >
      {children}
    </FocusRegion>
  );
};
