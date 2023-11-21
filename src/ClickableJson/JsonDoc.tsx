import * as React from 'react';
import {context} from './context';
import {JsonProperty} from './JsonProperty';
import {JsonValue} from './JsonValue';
import {JsonHoverable} from './JsonHoverable';
import * as css from '../css';
import {JsonObjectInsert} from './JsonObjectInsert';
import {JsonArrayInsert} from './JsonArrayInsert';
import type {OnChange} from './types';
import {useTheme} from 'nano-theme';

interface JsonObjectProps {
  property?: string | number;
  doc: object;
  pointer: string;
  comma?: boolean;
  onChange?: OnChange;
}

const JsonObject: React.FC<JsonObjectProps> = ({property, doc, pointer, comma, onChange}) => {
  const {activePointer, formal, keepOrder} = React.useContext(context);
  const keys = React.useMemo(() => {
    const k = Object.keys(doc);
    return keepOrder ? k : k.sort();
  }, [doc]);
  const [collapsed, setCollapsed] = React.useState(false);
  const [brackedHovered, setBracketHovered] = React.useState(false);
  const theme = useTheme();

  const onBracketMouseEnter = () => {
    setBracketHovered(true);
  };

  const onBracketMouseLeave = () => {
    setBracketHovered(false);
  };

  const bracketColor = theme.g(0.3);

  return (
    <span
      className={css.object}
      onClick={() => {
        if (collapsed) setCollapsed(false);
      }}
    >
      <span className={css.collapser} style={{color: theme.g(0.6)}} onClick={() => setCollapsed((x) => !x)}>
        {collapsed ? '+' : '-'}
      </span>
      <span>
        {typeof property === 'string' && <JsonProperty pointer={pointer} onChange={onChange} />}
        <span
          style={{display: collapsed ? 'none' : undefined, color: bracketColor}}
          className={brackedHovered ? css.bracketHovered : ''}
          onMouseEnter={onBracketMouseEnter}
          onMouseLeave={onBracketMouseLeave}
        >
          {'{'}
        </span>
        <span className={css.collapsed} style={{display: !collapsed ? 'none' : undefined}}>
          <span style={{color: bracketColor}}>{'{'}</span>
          {!!keys.length && <strong>{keys.length}</strong>}
          <span style={{color: bracketColor}}>{'}'}</span>
        </span>
      </span>
      <span className={css.list} style={{display: collapsed ? 'none' : undefined}}>
        {keys.map((key, index) => {
          const itemPointer = `${pointer}/${key}`;
          return (
            <span key={key} className={css.line}>
              <JsonHoverable pointer={itemPointer}>
                <span className={css.lineInner}>
                  <JsonDoc
                    property={key}
                    doc={(doc as Record<string, unknown>)[key]}
                    pointer={itemPointer}
                    comma={formal && index < keys.length - 1}
                    onChange={onChange}
                  />
                </span>
              </JsonHoverable>
            </span>
          );
        })}
        <JsonObjectInsert pointer={pointer} visible={activePointer === pointer} />
      </span>
      <span
        style={{display: collapsed ? 'none' : undefined, color: bracketColor}}
        className={brackedHovered ? css.bracketHovered : ''}
        onMouseEnter={onBracketMouseEnter}
        onMouseLeave={onBracketMouseLeave}
      >
        {'}'}
      </span>
      {!!comma && ','}
    </span>
  );
};

interface JsonArrayProps {
  property?: string | number;
  doc: unknown[];
  pointer: string;
  comma?: boolean;
  onChange?: OnChange;
}

const JsonArray: React.FC<JsonArrayProps> = ({property, doc, pointer, comma, onChange}) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [brackedHovered, setBracketHovered] = React.useState(false);
  const {activePointer, formal: selectable} = React.useContext(context);
  const theme = useTheme();

  const onBracketMouseEnter = () => {
    setBracketHovered(true);
  };

  const onBracketMouseLeave = () => {
    setBracketHovered(false);
  };

  const bracketColor = theme.g(0.3);

  return (
    <span
      className={css.object}
      onClick={() => {
        if (collapsed) setCollapsed(false);
      }}
    >
      <span className={css.collapser} style={{color: theme.g(0.6)}} onClick={() => setCollapsed((x) => !x)}>
        {collapsed ? '+' : '-'}
      </span>
      <span>
        {typeof property === 'string' && <JsonProperty pointer={pointer} onChange={onChange} />}
        <span
          style={{display: collapsed ? 'none' : undefined, color: bracketColor}}
          className={brackedHovered ? css.bracketHovered : ''}
          onMouseEnter={onBracketMouseEnter}
          onMouseLeave={onBracketMouseLeave}
        >
          {'['}
        </span>
        <span className={css.collapsed} style={{display: !collapsed ? 'none' : undefined}}>
          <span style={{color: bracketColor}}>{'['}</span>
          {!!doc.length && <strong>{doc.length}</strong>}
          <span style={{color: bracketColor}}>{']'}</span>
        </span>
      </span>
      <span className={css.list} style={{display: collapsed ? 'none' : undefined}}>
        {doc.map((value, index) => {
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
                      comma={selectable && index < doc.length - 1}
                      onChange={onChange}
                    />
                  </span>
                </JsonHoverable>
              </span>
            </React.Fragment>
          );
        })}
        <JsonArrayInsert pointer={`${pointer}/-`} visible={activePointer === pointer} />
      </span>
      <span
        style={{display: collapsed ? 'none' : undefined, color: bracketColor}}
        className={brackedHovered ? css.bracketHovered : ''}
        onMouseEnter={onBracketMouseEnter}
        onMouseLeave={onBracketMouseLeave}
      >
        {']'}
      </span>
      {!!comma && ','}
    </span>
  );
};

export interface JsonDocProps {
  property?: string | number;
  doc: unknown;
  pointer: string;
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
