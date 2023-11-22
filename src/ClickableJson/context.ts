import * as React from 'react';
import type {OnChange} from './types';

export interface ClickableJsonContextValue {
  /** JSON Pointer specifying which element to color with hover effect. */
  hoverPointer: null | string;
  setHoverPointer: (newHoverPointer: null | string) => void;
  activePointer: null | string;
  setActivePointer: (newActivePointer: null | string) => void;
  formal?: boolean;
  keepOrder?: boolean;
  compact?: boolean;
  collapsed?: boolean;
  onChange?: OnChange;
  isInputFocused: boolean;
}

export const context = React.createContext<ClickableJsonContextValue>(null!);
