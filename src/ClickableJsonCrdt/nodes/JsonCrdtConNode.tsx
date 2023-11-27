import * as React from 'react';
import {JsonCrdtProperty} from '../JsonCrdtProperty';
import {JsonCrdtRegion} from '../JsonCrdtRegion';
import {JsonAtom} from '../../JsonAtom';
import {useStyles} from '../../context/style';
import {ClickableJson} from '../../ClickableJson';
import {id} from '../utils';
import {useFocus} from '../../context/focus';
import type {ConNode} from 'json-joy/es2020/json-crdt';
import type {NodeRef} from '../NodeRef';

export interface JsonCrdtConNodeProps {
  node: NodeRef<ConNode>;
}

export const JsonCrdtConNode: React.FC<JsonCrdtConNodeProps> = ({node}) => {
  const {formal} = useStyles();
  const {focus} = useFocus();
  const [viewJson, setViewJson] = React.useState(false);

  const view = node.node.view();

  const handleAtomClick = () => {
    if (view && typeof view === 'object') {
      setViewJson(!viewJson);
    }
  };

  return (
    <JsonCrdtRegion node={node}>
      <JsonCrdtProperty node={node} />
      {viewJson ? (
        <span style={{display: 'inline-block', verticalAlign: 'top', margin: '-1px'}}>
          <ClickableJson
            readonly
            compact
            noCollapseToggles
            pfx={id(node)}
            doc={node.node.view()}
            onFocus={(p) => {
              if (p !== null) focus(id(node));
            }}
          />
        </span>
      ) : (
        <JsonAtom value={node.node.view()} onClick={handleAtomClick} />
      )}
      {!!formal && ','}
    </JsonCrdtRegion>
  );
};
