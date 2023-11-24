import * as React from 'react';

export interface FocusContextValue {
  focused: string | null;
  pointed: string | null;
  focus: (node: string | null) => void;
  point: (node: string | null) => void;
}

export const context = React.createContext<FocusContextValue>(null!);

export const useFocus = () => React.useContext(context);

export const FocusProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [focused, focus] = React.useState<string | null>(null);
  const [pointed, point] = React.useState<string | null>(null);

  return <context.Provider value={{focused, focus, pointed, point}}>{children}</context.Provider>;
};
