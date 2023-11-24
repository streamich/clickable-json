import * as React from 'react';
import {NodeRef} from '../NodeRef';
import {JsonCrdtRegion} from '../JsonCrdtRegion';
import {JsonCrdtProperty} from '../JsonCrdtProperty';
// import {JsonAtom} from '../../JsonAtom/JsonAtom';
import {useStyles} from '../../context/style';
import type {BinNode} from 'json-joy/es2020/json-crdt';

export interface JsonCrdtBinNodeProps {
  node: NodeRef<BinNode>;
}

export const JsonCrdtBinNode: React.FC<JsonCrdtBinNodeProps> = ({node}) => {
  const {formal} = useStyles();

  return (
    <JsonCrdtRegion node={node}>
      <JsonCrdtProperty node={node} />
      {/* <JsonAtom value={node.node.view()} /> */}
      bin ...
      {!!formal && ','}
    </JsonCrdtRegion>
  );
};