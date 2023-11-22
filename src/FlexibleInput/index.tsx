import * as React from 'react';
import {rule, useTheme} from 'nano-theme';
import {copyStyles} from '../utils/copyStyles';

const blockClass = rule({
  d: 'inline-block',
  pos: 'relative',
});

const inputClass = rule({
  bxz: 'border-box',
  pd: 0,
  mr: 0,
  bd: 0,
  bg: 0,
  col: 'inherit',
});

const sizerClass = rule({
  pos: 'absolute',
  pe: 'none',
  us: 'none',
  bxz: 'border-box',
  ov: 'scroll',
  t: 0,
  l: 0,
  ws: 'pre',
});

export interface FlexibleInputProps {
  /** Ref to the input element. */
  inp?: (el: HTMLInputElement | null) => void;

  /** Value to display. */
  value: string;

  /** Typeahead string to add to the value. It is visible at half opacity. */
  typeahead?: string;

  /** Addition width to add, for example, to account for number stepper. */
  extraWidth?: number;

  /** Minimum width to allow. */
  minWidth?: number;

  /** Maximum width to allow. */
  maxWidth?: number;

  /** Callback for when the value changes. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /** Callback for when the input is focused. */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;

  /** Callback for when the input is blurred. */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  /** Callback for when a key is pressed. */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;

  /** Callback for when the Enter key is pressed. */
  onSubmit?: React.KeyboardEventHandler<HTMLInputElement>;

  /** Callback for when the Escape key is pressed. */
  onCancel?: React.KeyboardEventHandler<HTMLInputElement>;

  /** Callback for when the Tab key is pressed. */
  onTab?: React.KeyboardEventHandler<HTMLInputElement>;
}

export const FlexibleInput: React.FC<FlexibleInputProps> = ({
  inp,
  value,
  typeahead = '',
  extraWidth,
  minWidth = 8,
  maxWidth,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onSubmit,
  onCancel,
  onTab,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const sizerRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  React.useEffect(() => {
    if (!inputRef.current || !sizerRef.current) return;
    copyStyles(inputRef.current, sizerRef.current!, [
      'font',
      'fontSize',
      'fontFamily',
      'fontWeight',
      'fontStyle',
      'lineHeight',
      'letterSpacing',
      'textTransform',
      'height',
      'boxSizing',
    ]);
  }, []);
  React.useEffect(() => {
    if (!inputRef.current || !sizerRef.current) return;
    let width = sizerRef.current.scrollWidth;
    if (extraWidth) width += extraWidth;
    if (minWidth) width = Math.max(width, minWidth);
    if (maxWidth) width = Math.min(width, maxWidth);
    inputRef.current.style.width = width + 'px';
  }, [value, typeahead, extraWidth]);

  return (
    <div className={blockClass}>
      <input
        ref={(input) => {
          (inputRef as any).current = input;
          if (inp) inp(input);
        }}
        className={inputClass}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter') {
            if (onSubmit) onSubmit(e as any);
          } else if (e.key === 'Escape') {
            if (onCancel) onCancel(e as any);
          } else if (e.key === 'Tab') {
            if (onTab) onTab(e as any);
          }
          if (onKeyDown) onKeyDown(e as any);
        }}
      />
      <div ref={sizerRef} className={sizerClass}>
        <span style={{visibility: 'hidden'}}>{value}</span>
        <span style={{color: theme.g(0.5)}}>{typeahead}</span>
      </div>
    </div>
  );
};
