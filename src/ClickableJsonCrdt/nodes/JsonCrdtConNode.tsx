import * as React from 'react';
import {JsonCrdtProperty} from '../JsonCrdtProperty';
import {JsonCrdtRegion} from '../JsonCrdtRegion';
import {JsonAtom} from '../../JsonAtom/JsonAtom';
import {useStyles} from '../../context/style';
import {ClickableJson} from '../../ClickableJson';
import {id} from '../utils';
import type {ConNode} from 'json-joy/es2020/json-crdt';
import type {NodeRef} from '../NodeRef';

export interface JsonCrdtConNodeProps {
  node: NodeRef<ConNode>;
}

export const JsonCrdtConNode: React.FC<JsonCrdtConNodeProps> = ({node}) => {
  const {formal} = useStyles();
  const [viewJson, setViewJson] = React.useState(false);

  const view = node.node.view();

  const handleAtomClick = () => {
    if (view && typeof view === 'object') {
      // if (focused === id(node)) {
      setViewJson(!viewJson);
      // }
    }
  };

  return (
    <JsonCrdtRegion node={node}>
      <JsonCrdtProperty node={node} />
      {viewJson ? (
        <span style={{display: 'inline-block', verticalAlign: 'top', margin: '-1px'}}>
          <ClickableJson readonly compact collapsed noCollapseToggles pfx={id(node)} doc={node.node.view()} />
        </span>
      ) : (
        <JsonAtom value={node.node.view()} onClick={handleAtomClick} />
      )}
      {!!formal && ','}
    </JsonCrdtRegion>
  );
};
