import * as React from 'react';
import type {OnChange} from './types';

export interface ClickableJsonContextValue {
  onChange?: OnChange;
}

export const context = React.createContext<ClickableJsonContextValue>(null!);
