import * as React from 'react';
import {context} from './context';
import {StyleContextValue, context as styleContext} from '../context/style';
import {JsonCrdtNode} from './JsonCrdtNode';
import {NodeRef} from './NodeRef';
import {Root} from '../Root';
import type {Model} from 'json-joy/es2020/json-crdt';
import {FocusProvider} from '../context/focus';

export interface ClickableJsonCrdtProps extends StyleContextValue {
  /**
   * The JSON CRDT model to display.
   */
  model: Model;
}

export const ClickableJsonCrdt: React.FC<ClickableJsonCrdtProps> = (props) => {
  const {model, compact, readonly} = props;
  const node = React.useMemo(() => new NodeRef(model.root.child(), null, ''), [model]);
  const render = (node: NodeRef<any>) => <JsonCrdtNode node={node} />

  return (
    <styleContext.Provider value={{compact, readonly}}>
      <context.Provider value={{model, render}}>
        <FocusProvider>
          <Root>
            {render(node)}
          </Root>
        </FocusProvider>
      </context.Provider>
    </styleContext.Provider>
  );
};
