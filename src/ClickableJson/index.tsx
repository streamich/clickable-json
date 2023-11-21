import * as React from 'react';
import {useT} from 'use-t';
import {escapeComponent} from 'json-joy/lib/json-pointer';
import useClickAway from 'react-use/lib/useClickAway';
import useMountedState from 'react-use/lib/useMountedState';
import AutosizeInput from '../AutosizeInput';
import {context} from './context';
import {JsonProperty} from './JsonProperty';
import {JsonValue} from './JsonValue';
import {JsonHoverable} from './JsonHoverable';
import * as css from '../css';
import type {OnChange} from './types';

interface JsonObjectInsertProps {
  pointer: string;
  visible?: boolean;
}

const JsonObjectInsert: React.FC<JsonObjectInsertProps> = ({pointer, visible}) => {
  const [t] = useT();
  const {onChange} = React.useContext(context);
  const [editing, setEditing] = React.useState(false);
  const [property, setProperty] = React.useState('');
  const [value, setValue] = React.useState('');
  const inputPropertyRef = React.useRef<HTMLInputElement>(null);
  const inputValueRef = React.useRef<HTMLInputElement>(null);

  if (!onChange) return null;

  const onSubmit = () => {
    let newValue;
    try {
      newValue = JSON.parse(value);
    } catch {
      newValue = String(value);
    }
    onChange([{op: 'add', path: pointer + '/' + escapeComponent(property), value: newValue}]);
    setProperty('');
    setValue('');
    setEditing(false);
  };

  if (editing) {
    return (
      <span style={{display: visible ? undefined : 'none'}}>
        <AutosizeInput
          inputRef={(el) => {
            (inputPropertyRef as any).current = el;
            if (el) el.focus();
          }}
          inputClassName={css.property + css.input + css.inputActive}
          value={property}
          onChange={(e) => setProperty(e.target.value)}
          onFocus={() => {}}
          onBlur={() => {
            if (inputValueRef.current) inputValueRef.current.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              if (property) setProperty('');
              else if (value) setValue('');
              else setEditing(false);
            } else if (e.key === 'Enter') {
              if (inputValueRef.current) inputValueRef.current.focus();
            }
          }}
        />
        <span className={css.colon}>
          <span>{':'}</span>
        </span>
        <AutosizeInput
          inputRef={(el) => {
            (inputValueRef as any).current = el;
          }}
          inputClassName={css.str + css.input + css.inputActive}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => {}}
          onBlur={() => {
            // setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              if (value) setValue('');
              else if (inputPropertyRef.current) inputPropertyRef.current.focus();
            } else if (e.key === 'Enter') {
              if (inputValueRef.current) inputValueRef.current.blur();
              onSubmit();
            }
          }}
        />
      </span>
    );
  }

  return (
    <span className={css.insArrBlock} style={{display: visible ? undefined : 'none'}} onClick={() => setEditing(true)}>
      <span className={css.insArrDot} />
      <span className={css.insArrLine} />
      <button className={css.insButton + css.insArrButton}>+</button>
      <span className={css.tooltip + css.insArrTooltip}>{t('Add key')}</span>
    </span>
  );
};

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

  const onBracketMouseEnter = () => {
    setBracketHovered(true);
  };

  const onBracketMouseLeave = () => {
    setBracketHovered(false);
  };

  return (
    <span
      className={css.object}
      onClick={() => {
        if (collapsed) setCollapsed(false);
      }}
    >
      <span className={css.collapser} onClick={() => setCollapsed((x) => !x)}>
        {collapsed ? '+' : '-'}
      </span>
      <span>
        {typeof property === 'string' && <JsonProperty pointer={pointer} onChange={onChange} />}
        <span
          style={{display: collapsed ? 'none' : undefined}}
          className={brackedHovered ? css.bracketHovered : ''}
          onMouseEnter={onBracketMouseEnter}
          onMouseLeave={onBracketMouseLeave}
        >
          {'{'}
        </span>
        <span className={css.collapsed} style={{display: !collapsed ? 'none' : undefined}}>
          {'{'}
          {!!keys.length && <strong>{keys.length}</strong>}
          {'}'}
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
        style={{display: collapsed ? 'none' : undefined}}
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

interface JsonArrayInsertProps {
  pointer: string;
  visible?: boolean;
}

const JsonArrayInsert: React.FC<JsonArrayInsertProps> = ({pointer, visible}) => {
  const [t] = useT();
  const {onChange} = React.useContext(context);
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  if (!onChange) return null;

  const onSubmit = () => {
    let newValue;
    try {
      newValue = JSON.parse(value);
    } catch {
      newValue = String(value);
    }
    onChange([{op: 'add', path: pointer, value: newValue}]);
    setValue('');
    setEditing(false);
  };

  if (editing) {
    return (
      <span style={{display: visible ? undefined : 'none'}}>
        <AutosizeInput
          inputRef={(el) => {
            (inputRef as any).current = el;
            if (el) el.focus();
          }}
          inputClassName={css.str + css.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => {}}
          onBlur={() => {
            setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              if (value) setValue('');
              else setEditing(false);
            } else if (e.key === 'Enter') {
              if (inputRef.current) inputRef.current.blur();
              onSubmit();
            }
          }}
        />
      </span>
    );
  }

  return (
    <span className={css.insArrBlock} style={{display: visible ? undefined : 'none'}} onClick={() => setEditing(true)}>
      <span className={css.insArrDot} />
      <span className={css.insArrLine} />
      <button className={css.insArrButton + css.insButton}>+</button>
      <span className={css.tooltip + css.insArrTooltip}>{t('Insert')}</span>
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

  const onBracketMouseEnter = () => {
    setBracketHovered(true);
  };

  const onBracketMouseLeave = () => {
    setBracketHovered(false);
  };

  return (
    <span
      className={css.object}
      onClick={() => {
        if (collapsed) setCollapsed(false);
      }}
    >
      <span className={css.collapser} onClick={() => setCollapsed((x) => !x)}>
        {collapsed ? '+' : '-'}
      </span>
      <span>
        {typeof property === 'string' && <JsonProperty pointer={pointer} onChange={onChange} />}
        <span
          style={{display: collapsed ? 'none' : undefined}}
          className={brackedHovered ? css.bracketHovered : ''}
          onMouseEnter={onBracketMouseEnter}
          onMouseLeave={onBracketMouseLeave}
        >
          {'['}
        </span>
        <span className={css.collapsed} style={{display: !collapsed ? 'none' : undefined}}>
          {'['}
          {!!doc.length && <strong>{doc.length}</strong>}
          {']'}
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
        style={{display: collapsed ? 'none' : undefined}}
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

export interface ClickableJsonProps {
  doc: unknown;
  formal?: boolean;
  keepOrder?: boolean;
  fontSize?: string;
  compact?: boolean;
  onChange?: OnChange;
}

export const ClickableJson: React.FC<ClickableJsonProps> = (props) => {
  const isMounted = useMountedState();
  const [hoverPointer, setHoverPointer] = React.useState<null | string>(null);
  const [activePointer, setActivePointer] = React.useState<null | string>(null);
  const [isInputFocused, setIsInputFocused] = React.useState<boolean>(false);
  const ref = React.useRef(null);
  useClickAway(ref, () => {
    if (!isMounted) return;
    setActivePointer(null);
  });
  React.useEffect(() => {
    const onFocusIn = () => {
      setIsInputFocused(!!document.activeElement && document.activeElement.tagName === 'INPUT');
    };
    document.addEventListener('focus', onFocusIn, true);
    document.addEventListener('blur', onFocusIn, true);
    return () => {
      document.removeEventListener('focus', onFocusIn);
      document.removeEventListener('blur', onFocusIn);
    };
  }, []);

  return (
    <context.Provider
      value={{
        hoverPointer,
        setHoverPointer: (value) => {
          if (!isMounted) return;
          setHoverPointer(value);
        },
        activePointer,
        setActivePointer: (value) => {
          if (!isMounted) return;
          setActivePointer(value);
        },
        onChange: props.onChange,
        formal: props.formal,
        compact: props.compact,
        keepOrder: props.keepOrder,
        isInputFocused,
      }}
    >
      <JsonHoverable pointer="">
        <span ref={ref} className={css.block} style={{fontSize: props.fontSize || '13.4px'}}>
          <JsonDoc {...props} pointer="" />
        </span>
      </JsonHoverable>
    </context.Provider>
  );
};
