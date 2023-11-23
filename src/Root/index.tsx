import * as React from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import useMountedState from 'react-use/lib/useMountedState';
import * as css from '../css';
import {useStyles} from '../context/style';
import {FocusRegion} from '../FocusRegion';
import {useFocus} from '../context/focus';
import {InputProvider} from '../context/input';

export const Root: React.FC<{children: React.ReactNode}> = ({children}) => {
  const isMounted = useMountedState();
  const styles = useStyles();
  const {focused, focus, pointed, point} = useFocus();
  const ref = React.useRef(null);
  useClickAway(ref, () => {
    if (!isMounted) return;
    focus('');
  });

  return (
    <InputProvider>
      <FocusRegion pointed={pointed === '__root'} focused={focused === '__root'}>
        <span ref={ref} className={css.block} style={{fontSize: styles.fontSize || '13.4px'}}>
          {children}
        </span>
      </FocusRegion>
    </InputProvider>
  );
};
