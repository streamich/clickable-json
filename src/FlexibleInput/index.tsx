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

  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const FlexibleInput: React.FC<FlexibleInputProps> = ({value, typeahead = '', extraWidth, minWidth = 8, maxWidth, onChange, onFocus, onBlur}) => {
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
      'margin',
      'padding',
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
      'borderWidth',
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
      <input ref={inputRef} className={inputClass} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
      <div ref={sizerRef} className={sizerClass}>
        <span style={{visibility: 'hidden'}}>{value}</span>
        {/* {value} */}
        <span style={{opacity: .5}}>{typeahead}</span>
      </div>
    </div>
  );
};
