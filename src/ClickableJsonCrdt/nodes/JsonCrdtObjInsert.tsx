import * as React from 'react';
import {NodeRef} from '../NodeRef';
import {ObjectInsert} from '../../inserts/ObjectInsert';
import {useIsFocused} from '../../context/focus';
import {id} from '../utils';
import type {ObjNode} from 'json-joy/es2020/json-crdt';

export interface JsonCrdtObjInsertProps {
  node: NodeRef<ObjNode>;
}

export const JsonCrdtObjInsert: React.FC<JsonCrdtObjInsertProps> = ({node}) => {
  const isFocused = useIsFocused(id(node));

  const handleSubmit = React.useCallback((key: string, json: string) => {
    let value: unknown = json;
    try {
      value = JSON.parse(json);
    } catch {}
    console.log('insert', key, value);
  }, [node.node]);

  return (
    <ObjectInsert visible={isFocused} onSubmit={handleSubmit} />
  );
};
