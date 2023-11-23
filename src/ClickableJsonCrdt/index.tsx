import * as React from 'react';
import {context} from './context';
import {FocusProvider} from '../context/focus';
import * as css from '../css';
import {JsonCrdtNode} from './JsonCrdtNode';
import {NodeRef} from './NodeRef';
import type {Model} from 'json-joy/es2020/json-crdt';

export interface ClickableJsonCrdtProps {
  /**
   * The JSON CRDT model to display.
   */
  model: Model;

  /**
   * If true, the JSON CRDT is not editable.
   *
   * @default false
   */
  readonly?: boolean;

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
}

export const ClickableJsonCrdt: React.FC<ClickableJsonCrdtProps> = (props) => {
  const {model, compact} = props;
  const node = React.useMemo(() => new NodeRef(model.root.child(), null, ''), [model]);
  const renderNode = (node: NodeRef<any>) => <JsonCrdtNode node={node} />

  return (
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
  );
};
