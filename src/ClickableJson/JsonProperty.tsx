import * as React from 'react';
import {useTheme} from 'nano-theme';
import AutosizeInput from '../AutosizeInput';
import {context} from './context';
import * as css from '../css';
import type {OnChange} from './types';

export interface JsonPropertyProps {
  pointer: string;
  onChange?: OnChange;
}

export const JsonProperty: React.FC<JsonPropertyProps> = ({pointer, onChange}) => {
  const {formal} = React.useContext(context);
  const steps = React.useMemo(() => pointer.split('/'), [pointer]);
  const property = React.useMemo(() => steps[steps.length - 1], [steps]);
  const [proposed, setProposed] = React.useState(property);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [focused, setFocused] = React.useState(false);
  const theme = useTheme();

  const style: React.CSSProperties = {
    color: theme.g(0.1),
  };

  if (property[0] === ' ' || property[property.length - 1] === ' ') {
    style.background = theme.red(.08);
  }

  const onSubmit = (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (e) e.stopPropagation();
    if (onChange)
      onChange([{op: 'move', from: pointer, path: steps.slice(0, steps.length - 1).join('/') + '/' + proposed}]);
  };

  return (
    <>
      {!onChange ? (
        <span className={css.property} style={style}>
          {formal ? JSON.stringify(property) : property}
        </span>
      ) : (
        <AutosizeInput
          inputRef={(el) => ((inputRef as any).current = el)}
          inputClassName={css.property + css.input}
          inputStyle={style}
          value={focused ? proposed : property}
          onChange={(e) => setProposed(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onSubmit(e);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (inputRef.current) inputRef.current.blur();
            } else if (e.key === 'Escape') {
              if (inputRef.current) inputRef.current.blur();
            }
          }}
        />
      )}
      <span className={css.colon} style={{color: theme.g(0.5)}}>
        <span>:</span>
      </span>
    </>
  );
};
