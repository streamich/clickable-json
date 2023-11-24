import * as React from 'react';
import {context as json} from './context';
import {StyleContextValue, context as styles} from '../context/style';
import {JsonDoc} from './JsonDoc';
import {Root} from '../Root';
import {FocusProvider} from '../context/focus';
import type {OnChange} from './types';
import {JsonHoverable} from './JsonHoverable';

export interface ClickableJsonProps extends StyleContextValue {
  /**
   * The JSON to display. Can be any JSON value.
   */
  doc: unknown;

  /**
   * Callback called when the JSON is changed. The callback receives a [JSON Patch
   * (RFC 6902)](https://datatracker.ietf.org/doc/html/rfc6902) as an argument.
   */
  onChange?: OnChange;
}

export const ClickableJson: React.FC<ClickableJsonProps> = (props) => {
  const onChange = props.readonly ? undefined : props.onChange;

  return (
    <FocusProvider>
      <styles.Provider value={props}>
        <json.Provider value={{onChange}}>
          <Root>
            <JsonHoverable pointer=''>
              <JsonDoc {...props} pointer="" onChange={onChange} />
            </JsonHoverable>
          </Root>
        </json.Provider>
      </styles.Provider>
    </FocusProvider>
  );
};
