import * as React from 'react';
import type {Model} from 'json-joy/es2020/json-crdt';

export interface ClickableJsonCrdtContextValue {
  model: Model;
}

export const context = React.createContext<ClickableJsonCrdtContextValue>(null!);
