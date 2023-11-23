import * as React from 'react';

export interface FocusContextValue {
  focused: string;
  pointed: string;
  focus: (node: string) => void;
  point: (node: string) => void;
}

export const context = React.createContext<FocusContextValue>(null!);

export const useFocus = () => React.useContext(context);

export const FocusProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [focused, focus] = React.useState('');
  const [pointed, point] = React.useState('');

  return (
    <context.Provider value={{focused, focus, pointed, point}}>
      {children}
    </context.Provider>
  );
};
