import * as React from 'react';
import {NodeRef} from '../NodeRef';
import {JsonCrdtRegion} from '../JsonCrdtRegion';
import {JsonCrdtProperty} from '../JsonCrdtProperty';
import {JsonAtom} from '../../JsonAtom/JsonAtom';
import {useStyles} from '../../context/style';
import type {StrNode} from 'json-joy/es2020/json-crdt';

export interface JsonCrdtStrNodeProps {
  node: NodeRef<StrNode>;
}

export const JsonCrdtStrNode: React.FC<JsonCrdtStrNodeProps> = ({node}) => {
  const {formal} = useStyles();

  return (
    <JsonCrdtRegion node={node}>
      <JsonCrdtProperty node={node} />
      <JsonAtom value={node.node.view()} />
      {!!formal && ','}
    </JsonCrdtRegion>
  );
};
