import * as React from 'react';
import {useJsonCrdt} from '../context';
import {JsonCrdtNodeOutline} from '../JsonCrdtNodeOutline';
import {NodeRef} from '../NodeRef';
import * as css from '../../css';
import type {ObjNode} from 'json-joy/es2020/json-crdt';
import {useTheme} from 'nano-theme';

export interface JsonCrdtObjNodeProps {
  node: NodeRef<ObjNode>;
}

export const JsonCrdtObjNode: React.FC<JsonCrdtObjNodeProps> = ({node}) => {
  const {renderNode} = useJsonCrdt();
  const theme = useTheme();
  const startsCollapsed = false;
  const [collapsed, setCollapsed] = React.useState(startsCollapsed);

  const entries: React.ReactNode[] = [];
  node.node.nodes((child, key) => {
    entries.push(
      <span key={key} className={css.line}>
        {/* <JsonHoverable pointer={itemPointer}> */}
        <span className={css.lineInner}>
          {key} : {renderNode(new NodeRef(child, node, key))}
        </span>
        {/* </JsonHoverable> */}
      </span>
    );
  });

  const comma = false;

  return (
      <JsonCrdtNodeOutline type={'obj'}>
    <span className={css.object}>
      {/* <span className={css.collapser} style={{color: theme.g(0.6)}} onClick={() => setCollapsed((x) => !x)}>
        {collapsed ? '+' : '—'}
      </span> */}
      <span className={css.bracket}>{'{'}</span>
        <span className={css.list} style={{display: collapsed ? 'none' : undefined}}>
        {entries}
        </span>
      <span className={css.bracket}>{'}'}</span>

     
      


      {/* <span
        className={css.bracket + (brackedHovered ? css.bracketHovered : '')}
        style={{display: collapsed ? 'none' : undefined, color: bracketColor}}
        onMouseEnter={onBracketMouseEnter}
        onMouseLeave={onBracketMouseLeave}
        onClick={handleBracketClick}
        >
        {'}'}
        </span>
        {!!comma && ','}
      </span> */}
    </span>
      </JsonCrdtNodeOutline>
  );
};
