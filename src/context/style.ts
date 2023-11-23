import * as React from 'react';

export interface StyleContextValue {
  /** Whether to print commas and quotes around object keys. */
  formal?: boolean;
  /** Whether to not sort object keys. */
  keepOrder?: boolean;
  /** Whether to reduce spacing between elements. */
  compact?: boolean;
  /** Whether to collapse all containers on initial render. */
  collapsed?: boolean;
  /** Whether to show edit controls. */
  readonly?: boolean;
}

export const context = React.createContext<StyleContextValue>(null!);

