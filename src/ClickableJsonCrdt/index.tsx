import * as React from 'react';
import {context} from './context';
import {FocusProvider} from '../context/focus';
import {StyleContextValue, context as styleContext} from '../context/style';
import * as css from '../css';
import {JsonCrdtNode} from './JsonCrdtNode';
import {NodeRef} from './NodeRef';
import type {Model} from 'json-joy/es2020/json-crdt';

export interface ClickableJsonCrdtProps extends StyleContextValue {
  /**
   * The JSON CRDT model to display.
   */
  model: Model;

  /**
   * Font size of the JSON.
   *
   * @default '13.4px'
   */
  fontSize?: string;
}

export const ClickableJsonCrdt: React.FC<ClickableJsonCrdtProps> = (props) => {
  const {model, compact, readonly} = props;
  const node = React.useMemo(() => new NodeRef(model.root.child(), null, ''), [model]);
  const renderNode = (node: NodeRef<any>) => <JsonCrdtNode node={node} />

  return (
    <styleContext.Provider value={{compact, readonly}}>
      <FocusProvider>
        <context.Provider
          value={{
            model,
            renderNode,
            compact,
          }}
        >
          <span className={css.block} style={{fontSize: props.fontSize || '13.4px'}}>
            {renderNode(node)}
          </span>
        </context.Provider>
      </FocusProvider>
    </styleContext.Provider>
  );
};
