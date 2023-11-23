import * as React from 'react';
import {useJsonCrdt} from '../context';
import {JsonCrdtNodeOutline} from '../JsonCrdtNodeOutline';
import {NodeRef} from '../NodeRef';
import * as css from '../../css';
import {useTheme} from 'nano-theme';
import {ObjectLayout} from '../../ObjectLayout';
import type {ObjNode} from 'json-joy/es2020/json-crdt';
import {FocusRegion} from '../../FocusRegion';
import {JsonCrdtRegion} from '../JsonCrdtRegion';

export interface JsonCrdtObjNodeProps {
  node: NodeRef<ObjNode>;
}

export const JsonCrdtObjNode: React.FC<JsonCrdtObjNodeProps> = ({node}) => {
  const {render: renderNode} = useJsonCrdt();
  const theme = useTheme();
  const startsCollapsed = false;
  const [collapsed, setCollapsed] = React.useState(startsCollapsed);

  const entries: React.ReactNode[] = [];
  node.node.nodes((child, key) => {
    entries.push(
      <span key={key} className={css.line}>
        <FocusRegion>
          <span className={css.lineInner}>
            {/* {key} : {renderNode(new NodeRef(child, node, key))} */}
            {renderNode(new NodeRef(child, node, key))}
          </span>
        </FocusRegion>
      </span>,
    );
  });

  return (
    // <JsonCrdtNodeOutline type={'obj'}>
    <JsonCrdtRegion node={node}>
      <ObjectLayout>{entries}</ObjectLayout>
    </JsonCrdtRegion>
    // </JsonCrdtNodeOutline>
  );
};
