import * as React from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import useMountedState from 'react-use/lib/useMountedState';
import {context} from './context';
import {JsonHoverable} from './JsonHoverable';
import {JsonDoc} from './JsonDoc';
import * as css from '../css';
import type {OnChange} from './types';

export interface ClickableJsonProps {
  doc: unknown;
  readonly?: boolean;
  formal?: boolean;
  keepOrder?: boolean;
  fontSize?: string;
  compact?: boolean;
  onChange?: OnChange;
}

export const ClickableJson: React.FC<ClickableJsonProps> = (props) => {
  const isMounted = useMountedState();
  const [hoverPointer, setHoverPointer] = React.useState<null | string>(null);
  const [activePointer, setActivePointer] = React.useState<null | string>(null);
  const [isInputFocused, setIsInputFocused] = React.useState<boolean>(false);
  const ref = React.useRef(null);
  useClickAway(ref, () => {
    if (!isMounted) return;
    setActivePointer(null);
  });
  React.useEffect(() => {
    const onFocusIn = () => {
      setIsInputFocused(!!document.activeElement && document.activeElement.tagName === 'INPUT');
    };
    document.addEventListener('focus', onFocusIn, true);
    document.addEventListener('blur', onFocusIn, true);
    return () => {
      document.removeEventListener('focus', onFocusIn);
      document.removeEventListener('blur', onFocusIn);
    };
  }, []);

  const onChange = props.readonly ? undefined : props.onChange;

  return (
    <context.Provider
      value={{
        hoverPointer,
        setHoverPointer: (value) => {
          if (!isMounted) return;
          setHoverPointer(value);
        },
        activePointer,
        setActivePointer: (value) => {
          if (!isMounted) return;
          setActivePointer(value);
        },
        onChange,
        formal: props.formal,
        compact: props.compact,
        keepOrder: props.keepOrder,
        isInputFocused,
      }}
    >
      <JsonHoverable pointer="">
        <span ref={ref} className={css.block} style={{fontSize: props.fontSize || '13.4px'}}>
          <JsonDoc {...props} pointer="" onChange={onChange} />
        </span>
      </JsonHoverable>
    </context.Provider>
  );
};
