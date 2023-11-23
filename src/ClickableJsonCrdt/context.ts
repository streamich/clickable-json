import * as React from 'react';
import type {Model} from 'json-joy/es2020/json-crdt';
import type {NodeRef} from './NodeRef';

export interface ClickableJsonCrdtContextValue {
  model: Model;
  renderNode: (node: NodeRef<any>) => React.ReactNode;
  compact?: boolean;
}

export const context = React.createContext<ClickableJsonCrdtContextValue>(null!);

export const useJsonCrdt = () => React.useContext(context);
