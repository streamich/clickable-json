import * as React from 'react';
import {rule, theme} from 'nano-theme';
import {NodeRef} from '../../NodeRef';
import {JsonCrdtRegion} from '../../JsonCrdtRegion';
import {JsonCrdtProperty} from '../../JsonCrdtProperty';
import {JsonAtom} from '../../../JsonAtom';
import {useStyles} from '../../../context/style';
import {useFocus} from '../../../context/focus';
import {id} from '../../utils';
import {StrEdit} from './StrEdit';
import type {StrNode} from 'json-joy/es2020/json-crdt';

const atomClass = rule({
  d: 'inline-block',
  cur: 'default',
  bdrad: '2px',
});

const atomFocusedClass = rule({
  out: '1px dotted transparent',
  '&:hover': {
    out: `1px dotted ${theme.color.sem.blue[0]}`,
  },
});

export interface JsonCrdtStrNodeProps {
  node: NodeRef<StrNode>;
}

export const JsonCrdtStrNode: React.FC<JsonCrdtStrNodeProps> = ({node}) => {
  const {formal} = useStyles();
  const {focused} = useFocus();
  const [editing, setEditing] = React.useState(false);

  const isFocused = focused === id(node);

  return (
    <JsonCrdtRegion node={node} editing={editing}>
      <JsonCrdtProperty node={node} />
      {editing ? (
        <StrEdit node={node} onCancel={() => setEditing(false)} onDone={() => setEditing(false)} />
      ) : (
        <span
          className={atomClass + (isFocused ? atomFocusedClass : '')}
          onClick={isFocused ? () => setEditing(true) : undefined}
        >
          <JsonAtom value={node.node.view()} />
        </span>
      )}
      {!!formal && ','}
    </JsonCrdtRegion>
  );
};
