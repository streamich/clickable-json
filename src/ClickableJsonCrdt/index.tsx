import * as React from 'react';
import {context} from './context';
import * as css from '../css';
import {NodeRef} from './NodeRef';
import {JsonCrdtNode} from './JsonCrdtNode';
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
}

export const ClickableJsonCrdt: React.FC<ClickableJsonCrdtProps> = (props) => {
  const {model} = props;
  const node = React.useMemo(() => new NodeRef(model.root.child(), null, ''), [model]);

  return (
    <context.Provider
      value={{
        model,
      }}
    >
      <span className={css.block} style={{fontSize: props.fontSize || '13.4px'}}>
        <JsonCrdtNode node={node} />
      </span>
    </context.Provider>
  );
};
