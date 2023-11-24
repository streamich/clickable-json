import * as React from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import useMountedState from 'react-use/lib/useMountedState';
import {useStyles} from '../context/style';
import {useFocus} from '../context/focus';
import {InputProvider} from '../context/input';
import {rule} from 'nano-theme';

const blockClass = rule({
  d: 'inline-block',
  ff: 'monospace',
});

export interface RootProps {
  children: React.ReactNode;
}

export const Root: React.FC<RootProps> = ({children}) => {
  const isMounted = useMountedState();
  const styles = useStyles();
  const {focused, focus, pointed, point} = useFocus();
  const ref = React.useRef(null);
  useClickAway(ref, () => {
    if (!isMounted) return;
    point(null);
    focus(null);
  });

  return (
    <InputProvider>
      <span ref={ref} className={blockClass} style={{fontSize: styles.fontSize || '13.4px'}}>
        {children}
      </span>
    </InputProvider>
  );
};
