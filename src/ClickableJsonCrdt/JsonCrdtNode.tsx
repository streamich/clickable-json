import * as React from 'react';
import type {NodeRef} from './NodeRef';

export interface JsonCrdtNodeProps {
  node: NodeRef;
}

export const JsonCrdtNode: React.FC<JsonCrdtNodeProps> = (props) => {
  return 'node...';
};
