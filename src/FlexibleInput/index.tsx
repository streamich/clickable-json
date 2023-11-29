import * as React from 'react';
import {rule, useTheme} from 'nano-theme';
import {copyStyles} from '../utils/copyStyles';

const blockClass = rule({
  d: 'inline-block',
  pos: 'relative',
});

const inputClass = rule({
  bxz: 'border-box',
  ov: 'hidden',
  pd: 0,
  mr: 0,
  bd: 0,
  bg: 0,
  out: 0,
  col: 'inherit',
  fw: 'inherit',
  f: 'inherit',
  ws: 'pre',
  resize: 'none',
});

const sizerClass = rule({
  pos: 'absolute',
  ov: 'hidden',
  pe: 'none',
  us: 'none',
  bxz: 'border-box',
  t: 0,
  l: 0,
  ws: 'pre',
});

export interface FlexibleInputProps {
  /** Ref to the input element. */
  inp?: (el: HTMLInputElement | HTMLTextAreaElement | null) => void;

  /** Value to display. */
  value?: string;

  /** Whether the value is controlled. */
  uncontrolled?: boolean;

  /** Whether the input is multiline. */
  multiline?: boolean;

  /** Placeholder to display. */
  typebefore?: string;

  /** Typeahead string to add to the value. It is visible at half opacity. */
  typeahead?: string;

  /** Addition width to add, for example, to account for number stepper. */
  extraWidth?: number;

  /** Minimum width to allow. */
  minWidth?: number;

  /** Maximum width to allow. */
  maxWidth?: number;

  /** Whether the input is focused on initial render. */
  focus?: boolean;

  /** Callback for when the value changes. */
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  /** Callback for when the input is focused. */
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  /** Callback for when the input is blurred. */
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  /** Callback for when a key is pressed. */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  /** Callback for when the Enter key is pressed. */
  onSubmit?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  /** Callback for when the Escape key is pressed. */
  onCancel?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  /** Callback for when the Tab key is pressed. */
  onTab?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const FlexibleInput: React.FC<FlexibleInputProps> = ({
  inp,
  value,
  uncontrolled,
  multiline,
  typebefore = '',
  typeahead = '',
  extraWidth,
  minWidth = 8,
  maxWidth,
  focus,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onSubmit,
  onCancel,
  onTab,
}) => {
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const sizerRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  React.useLayoutEffect(() => {
    if (!inputRef.current || !sizerRef.current) return;
    if (focus) inputRef.current.focus();
    copyStyles(inputRef.current, sizerRef.current!, [
      'font',
      'fontSize',
      'fontFamily',
      'fontWeight',
      'fontStyle',
      'letterSpacing',
      'textTransform',
      'boxSizing',
    ]);
  }, []);
  React.useLayoutEffect(() => {
    const input = inputRef.current;
    const sizer = sizerRef.current;
    if (!input || !sizer) return;
    let width = sizer.scrollWidth;
    if (extraWidth) width += extraWidth;
    if (minWidth) width = Math.max(width, minWidth);
    if (maxWidth) width = Math.min(width, maxWidth);
    const style = input.style;
    style.width = width + 'px';
    if (multiline) {
      const height = sizer.scrollHeight;
      style.height = height + 'px';
    }
  }, [value, typeahead, extraWidth]);

  const attr = {
    ref: (input: unknown) => {
      (inputRef as any).current = input;
      if (inp) inp(input as HTMLInputElement | HTMLTextAreaElement);
    },
    className: inputClass,
    onChange,
    onFocus,
    onBlur,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (onSubmit) onSubmit(e as any);
      } else if (e.key === 'Escape') {
        if (onCancel) onCancel(e as any);
      } else if (e.key === 'Tab') {
        if (onTab) onTab(e as any);
      }
      if (onKeyDown) onKeyDown(e as any);
    },
  };

  const input = multiline ? (
    <textarea {...attr} value={uncontrolled ? undefined : value} />
  ) : (
    <input {...attr} value={uncontrolled ? undefined : value} />
  );

  return (
    <>
      {!!typebefore && <span style={{color: theme.g(0.7)}}>{typebefore}</span>}
      <div className={blockClass}>
        {input}
        <div ref={sizerRef} className={sizerClass}>
          <span style={{visibility: 'hidden'}}>{value}</span>
          {'\u200b'}
          {!!typeahead && <span style={{color: theme.g(0.7)}}>{typeahead}</span>}
        </div>
      </div>
    </>
  );
};
