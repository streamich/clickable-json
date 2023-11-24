import * as React from 'react';
import {context as crdt} from './context';
import {StyleContextValue, context as styles} from '../context/style';
import {NodeRef} from './NodeRef';
import {Root} from '../Root';
import {FocusProvider} from '../context/focus';
import {
  ConNode,
  ValNode,
  type JsonNode,
  type Model,
  ObjNode,
  VecNode,
  ArrNode,
  StrNode,
} from 'json-joy/es2020/json-crdt';
import {JsonCrdtConNode} from './nodes/JsonCrdtConNode';
import {JsonCrdtValNode} from './nodes/JsonCrdtValNode';
import {JsonCrdtObjNode} from './nodes/JsonCrdtObjNode';
import {JsonCrdtVecNode} from './nodes/JsonCrdtVecNode';
import {JsonCrdtArrNode} from './nodes/JsonCrdtArrNode';
import {JsonCrdtStrNode} from './nodes/JsonCrdtStrNode';

const render = (node: NodeRef<JsonNode>): React.ReactNode => {
  if (node.node instanceof ConNode) return <JsonCrdtConNode node={node as NodeRef<ConNode>} />;
  if (node.node instanceof ValNode) return <JsonCrdtValNode node={node as NodeRef<ValNode>} />;
  if (node.node instanceof ObjNode) return <JsonCrdtObjNode node={node as NodeRef<ObjNode>} />;
  if (node.node instanceof StrNode) return <JsonCrdtStrNode node={node as NodeRef<StrNode>} />;
  if (node.node instanceof VecNode) return <JsonCrdtVecNode node={node as NodeRef<VecNode>} />;
  if (node.node instanceof ArrNode) return <JsonCrdtArrNode node={node as NodeRef<ArrNode>} />;
  return '∅';
};

export interface ClickableJsonCrdtProps extends StyleContextValue {
  /**
   * The JSON CRDT model to display.
   */
  model: Model;

  /**
   * Whether to display the root node.
   */
  showRoot?: boolean;
}

export const ClickableJsonCrdt: React.FC<ClickableJsonCrdtProps> = (props) => {
  const {model, compact, readonly, showRoot} = props;
  const node = React.useMemo(() => new NodeRef(showRoot ? model.root : model.root.child(), null, ''), [model]);

  return (
    <styles.Provider value={{compact, readonly}}>
      <crdt.Provider value={{model, render}}>
        <FocusProvider>
          <Root>{render(node)}</Root>
        </FocusProvider>
      </crdt.Provider>
    </styles.Provider>
  );
};
