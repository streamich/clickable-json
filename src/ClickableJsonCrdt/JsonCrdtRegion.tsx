import * as React from 'react';
import {FocusRegion} from '../FocusRegion';
import {useFocus} from '../context/focus';
import {useStyles} from '../context/style';
import {useJsonCrdt} from './context';
import {TypeAndId} from './TypeAndId';
import {NodeRef} from './NodeRef';
import {id} from './utils';
import type {ArrNode, ConNode, JsonNode, ObjNode, ValNode, VecNode} from 'json-joy/es2020/json-crdt';

const isObjTombstone = (node: NodeRef<JsonNode>): boolean => {
  const parent = node.parent;
  if (!parent) return false;
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
  const parentNodeType = node.parent?.node.name();
  const isTombstone = isObjTombstone(node);
  const parentIsObj = parentNodeType === 'obj';
  const parentIsArr = parentNodeType === 'arr';
  const parentIsVec = parentNodeType === 'vec';

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
        !isFocused || isTombstone
          ? undefined
          : parentIsObj
            ? () => {
                const api = model.api.wrap(node.parent!.node! as ObjNode);
                api.del([node.step]);
              }
            : parentIsArr
              ? () => {
                  const api = model.api.wrap(node.parent!.node! as ArrNode);
                  api.del(+node.step, 1);
                }
                : parentIsVec
                ? () => {
                    const api = model.api.wrap(node.parent!.node! as VecNode);
                    api.set([[+node.step, undefined]]);
                  }
                  : (parentNodeType === 'val' && !isTombstone)
                  ? () => {
                      const api = model.api.wrap(node.parent!.node! as ValNode);
                      api.set(undefined as any);
                    }
                  : undefined
      }
    >
      {children}
    </FocusRegion>
  );
};
