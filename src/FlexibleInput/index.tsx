import * as React from 'react';
import {rule} from 'nano-theme';
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
}

export const FlexibleInput: React.FC<FlexibleInputProps> = ({inp, value, typeahead = '', extraWidth, minWidth = 8, maxWidth, onChange, onFocus, onBlur, onKeyDown}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const sizerRef = React.useRef<HTMLDivElement>(null);
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
        onKeyDown={onKeyDown}
      />
      <div ref={sizerRef} className={sizerClass}>
        <span style={{visibility: 'hidden'}}>{value}</span>
        <span style={{opacity: .5}}>{typeahead}</span>
      </div>
    </div>
  );
};
