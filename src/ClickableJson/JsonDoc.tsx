import * as React from 'react';
import * as css from '../css';
import {context} from './context';
import {JsonProperty} from './JsonProperty';
import {JsonValue} from './JsonValue';
import {JsonHoverable} from './JsonHoverable';
import {JsonObjectInsert} from './JsonObjectInsert';
import {JsonArrayInsert} from './JsonArrayInsert';
import {ObjectLayout} from '../ObjectLayout';
import type {OnChange} from './types';

interface JsonObjectProps {
  property?: string | number;
  doc: object;
  pointer: string;
  parentCollapsed?: boolean;
  comma?: boolean;
  onChange?: OnChange;
}

const JsonObject: React.FC<JsonObjectProps> = ({property, doc, pointer, parentCollapsed, comma, onChange}) => {
  const {activePointer, formal, keepOrder, collapsed: startsCollapsed} = React.useContext(context);
  const keys = React.useMemo(() => {
    const k = Object.keys(doc);
    return keepOrder ? k : k.sort();
  }, [doc]);
  const [collapsed, setCollapsed] = React.useState(startsCollapsed);

  const handleBracketClick = () => {
    if (!collapsed && pointer === activePointer) setCollapsed(true);
  };

  const entries = keys.map((key, index) => {
    const itemPointer = `${pointer}/${key}`;
    return (
      <span key={key} className={css.line}>
        <JsonHoverable pointer={itemPointer}>
          <span className={css.lineInner}>
            <JsonDoc
              property={key}
              doc={(doc as Record<string, unknown>)[key]}
              pointer={itemPointer}
              parentCollapsed={collapsed}
              comma={formal && index < keys.length - 1}
              onChange={onChange}
            />
          </span>
        </JsonHoverable>
      </span>
    );
  });

  return (
    <ObjectLayout
      collapsed={collapsed}
      collapsedView={!!keys.length && <strong>{keys.length}</strong>}
      comma={comma}
      property={
        typeof property === 'string' && (
          <JsonProperty key={'k' + String(parentCollapsed)} pointer={pointer} onChange={onChange} />
        )
      }
      onClick={() => {
        if (collapsed) setCollapsed(false);
      }}
      onCollapserClick={() => setCollapsed((x) => !x)}
      onBracketClick={handleBracketClick}
    >
      {entries}
      <JsonObjectInsert pointer={pointer} visible={activePointer === pointer} />
    </ObjectLayout>
  );
};

interface JsonArrayProps {
  property?: string | number;
  doc: unknown[];
  pointer: string;
  parentCollapsed?: boolean;
  comma?: boolean;
  onChange?: OnChange;
}

const JsonArray: React.FC<JsonArrayProps> = ({property, doc, pointer, parentCollapsed, comma, onChange}) => {
  const {activePointer, formal: selectable, collapsed: startsCollapsed} = React.useContext(context);
  const [collapsed, setCollapsed] = React.useState(startsCollapsed);

  const handleBracketClick = () => {
    if (!collapsed && pointer === activePointer) setCollapsed(true);
  };

  const entries = doc.map((value, index) => {
    const itemPointer = `${pointer}/${index}`;
    return (
      <React.Fragment key={index}>
        <JsonArrayInsert pointer={`${pointer}/${index}`} visible={activePointer === pointer} />
        <span className={css.line}>
          <JsonHoverable pointer={itemPointer}>
            <span className={css.lineInner}>
              <JsonDoc
                doc={doc[index]}
                pointer={itemPointer}
                parentCollapsed={collapsed}
                comma={selectable && index < doc.length - 1}
                onChange={onChange}
              />
            </span>
          </JsonHoverable>
        </span>
      </React.Fragment>
    );
  });

  return (
    <ObjectLayout
      collapsed={collapsed}
      collapsedView={!!doc.length && <strong>{doc.length}</strong>}
      comma={comma}
      property={
        typeof property === 'string' && (
          <JsonProperty key={'k' + String(parentCollapsed)} pointer={pointer} onChange={onChange} />
        )
      }
      onClick={() => {
        if (collapsed) setCollapsed(false);
      }}
      onCollapserClick={() => setCollapsed((x) => !x)}
      onBracketClick={handleBracketClick}
      brackets={['[', ']']}
    >
      {entries}
      <JsonArrayInsert pointer={`${pointer}/-`} visible={activePointer === pointer} />
    </ObjectLayout>
  );
};

export interface JsonDocProps {
  property?: string | number;
  doc: unknown;
  pointer: string;
  parentCollapsed?: boolean;
  comma?: boolean;
  onChange?: OnChange;
}

export const JsonDoc: React.FC<JsonDocProps> = (props) => {
  const {doc, comma} = props;
  return !doc ? (
    <JsonValue {...props} comma={comma} />
  ) : typeof doc === 'object' ? (
    Array.isArray(doc) ? (
      <JsonArray {...props} doc={doc} comma={comma} />
    ) : (
      <JsonObject {...props} doc={doc} comma={comma} />
    )
  ) : (
    <JsonValue {...props} comma={comma} />
  );
};
