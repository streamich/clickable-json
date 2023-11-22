import * as React from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import useMountedState from 'react-use/lib/useMountedState';
import {context} from './context';
import {JsonHoverable} from './JsonHoverable';
import {JsonDoc} from './JsonDoc';
import * as css from '../css';
import type {OnChange} from './types';

export interface ClickableJsonProps {
  /**
   * The JSON to display. Can be any JSON value.
   */
  doc: unknown;

  /**
   * If true, the JSON is not editable. Useful for displaying JSON.
   *
   * @default false
   */
  readonly?: boolean;

  /**
   * Print the JSON in a more formal way. Adds quotes to keys and string values.
   * Adds commas after each property.
   *
   * Works only in readonly mode.
   *
   * @default false
   */
  formal?: boolean;

  /**
   * Keep the order of properties in objects. By default the properties are
   * sorted alphabetically.
   *
   * @default false
   */
  keepOrder?: boolean;

  /**
   * Font size of the JSON.
   *
   * @default '13.4px'
   */
  fontSize?: string;

  /**
   * If true, the JSON is printed in a compact way. Reduces spacing between
   * elements.
   *
   * @default false
   */
  compact?: boolean;

  /**
   * If true, the JSON starts collapsed, but can be expanded by clicking on it.
   *
   * @default false
   */
  collapsed?: boolean;

  /**
   * Callback called when the JSON is changed. The callback receives a [JSON Patch
   * (RFC 6902)](https://datatracker.ietf.org/doc/html/rfc6902) as an argument.
   */
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
        collapsed: !!props.collapsed,
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
