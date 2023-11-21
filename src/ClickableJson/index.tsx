import * as React from 'react';
import {useT} from 'use-t';
import Svg from 'iconista';
import {theme} from 'nano-theme';
import {escapeComponent} from 'json-joy/lib/json-pointer';
import type {Operation} from 'json-joy/lib/json-patch';
import useClickAway from 'react-use/lib/useClickAway';
import useMountedState from 'react-use/lib/useMountedState';
import AutosizeInput from '../AutosizeInput';
import * as css from '../css';

export type OnChange = (patch: Operation[]) => void;

interface JsonEditorContext {
  /** JSON Pointer specifying which element to color with hover effect. */
  hoverPointer: null | string;
  setHoverPointer: (newHoverPointer: null | string) => void;
  activePointer: null | string;
  setActivePointer: (newActivePointer: null | string) => void;
  formal?: boolean;
  keepOrder?: boolean;
  compact?: boolean;
  onChange?: OnChange;
  isInputFocused: boolean;
}

const context = React.createContext<JsonEditorContext>({
  hoverPointer: null,
  setHoverPointer: () => {},
  activePointer: null,
  setActivePointer: () => {},
  isInputFocused: false,
});

interface JsonValueProps {
  pointer: string;
  property?: string | number;
  doc: unknown;
  comma?: boolean;
  onChange?: OnChange;
}

const JsonValue: React.FC<JsonValueProps> = (props) => {
  const {pointer, property, doc, comma, onChange} = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const className = React.useMemo(
    () =>
      doc === null
        ? css.nil
        : typeof doc === 'boolean'
          ? css.bool
          : typeof doc === 'string'
            ? css.str
            : doc === Math.round(Number(doc))
              ? css.num
              : css.float,
    [doc],
  );
  const value = React.useMemo(
    () =>
      doc === null
        ? 'null'
        : typeof doc === 'boolean'
          ? doc
            ? 'true'
            : 'false'
          : typeof doc === 'string'
            ? JSON.stringify(doc)
            : String(doc),
    [doc],
  );
  const [proposed, setProposed] = React.useState(value);
  const [focused, setFocused] = React.useState(false);
  React.useEffect(() => {
    setProposed(value);
  }, [value]);

  const onSubmit = (e: React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (e) e.stopPropagation();
    let newValue;
    try {
      newValue = JSON.parse(proposed);
    } catch {
      newValue = String(proposed);
    }
    if (onChange) onChange([{op: 'replace', path: pointer, value: newValue}]);
  };

  return (
    <>
      {typeof property === 'string' && <JsonProperty pointer={pointer} onChange={onChange} />}
      {!onChange ? (
        <span className={className}>{value}</span>
      ) : (
        <AutosizeInput
          inputRef={(el) => ((inputRef as any).current = el)}
          inputClassName={className + css.input}
          value={focused ? proposed : value}
          onChange={(e) => setProposed(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => setFocused(false)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
              if (inputRef.current) inputRef.current.blur();
              onSubmit(e);
            } else if (e.key === 'Escape') {
              if (value !== proposed) setProposed(value);
              else if (inputRef.current) inputRef.current.blur();
            }
          }}
        />
      )}
      {!!comma && ','}
    </>
  );
};

interface JsonPropertyProps {
  pointer: string;
  onChange?: OnChange;
}

const JsonProperty: React.FC<JsonPropertyProps> = ({pointer, onChange}) => {
  const {formal: selectable} = React.useContext(context);
  const steps = React.useMemo(() => pointer.split('/'), [pointer]);
  const property = React.useMemo(() => steps[steps.length - 1], [steps]);
  const [proposed, setProposed] = React.useState(property);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [focused, setFocused] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (e) e.stopPropagation();
    if (onChange)
      onChange([{op: 'move', from: pointer, path: steps.slice(0, steps.length - 1).join('/') + '/' + proposed}]);
  };

  return (
    <>
      {!onChange ? (
        <span className={css.property}>{selectable ? JSON.stringify(property) : property}</span>
      ) : (
        <AutosizeInput
          inputRef={(el) => ((inputRef as any).current = el)}
          inputClassName={css.property + css.input}
          value={focused ? proposed : property}
          onChange={(e) => setProposed(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onSubmit(e);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (inputRef.current) inputRef.current.blur();
            } else if (e.key === 'Escape') {
              if (inputRef.current) inputRef.current.blur();
            }
          }}
        />
      )}
      <span className={css.colon}>
        <span>:</span>
      </span>
    </>
  );
};

interface HoverableProps {
  pointer: string;
  children: React.ReactElement;
}

const Hoverable: React.FC<HoverableProps> = ({pointer, children}) => {
  const [t] = useT();
  const {hoverPointer, setHoverPointer, activePointer, setActivePointer, formal, compact, onChange, isInputFocused} =
    React.useContext(context);
  const [draggedOver, setDraggedOver] = React.useState(false);
  const [deleteHovered, setDeleteHovered] = React.useState(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!formal) e.preventDefault(); // formal allows user select text
    e.stopPropagation();
    if (hoverPointer !== pointer) setHoverPointer(pointer);
  };

  const onMouseEnter = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHoverPointer(pointer);
  };

  const onMouseLeave = () => {
    setHoverPointer(null);
  };

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePointer(pointer);
  };

  const onDragEnter = formal
    ? undefined
    : (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDraggedOver(true);
      };

  const onDragLeave = formal
    ? undefined
    : (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDraggedOver(false);
      };

  const onDragOver = formal
    ? undefined
    : (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
      };

  const onDrop = formal
    ? undefined
    : (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDraggedOver(false);
        const from = e.dataTransfer.getData('text/plain');
        if (onChange) onChange([{op: 'move', from, path: pointer}]);
      };

  const onDragStart = formal
    ? undefined
    : (e: React.DragEvent) => {
        e.stopPropagation();
        e.dataTransfer.setData('text/plain', pointer);
      };

  const isHovered = hoverPointer === pointer;
  const isActive = activePointer === pointer;

  let subChildren = children.props.children;

  if (pointer) {
    subChildren = (
      <span
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        style={{outline: draggedOver ? `1px solid ${theme.blue}` : undefined}}
      >
        <span draggable={!formal} onDragStart={onDragStart}>
          {subChildren}
        </span>
      </span>
    );
  }

  if (!!onChange && !isInputFocused && pointer === activePointer) {
    subChildren = (
      <>
        {subChildren}
        <button
          className={css.insButton + css.deleteButton}
          onClick={() => onChange([{op: 'remove', path: pointer}])}
          onMouseEnter={() => setDeleteHovered(true)}
          onMouseOver={() => setDeleteHovered(true)}
          onMouseLeave={() => setDeleteHovered(false)}
        >
          <Svg set="atlaskit" icon="cross" width={10} height={10} />
          <span className={css.tooltip + css.deleteButtonTooltip}>{t('Delete')}</span>
        </button>
      </>
    );
  }

  return React.cloneElement(
    children,
    {
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      onClick,
      className:
        (children.props.className || '') +
        css.hoverable +
        (compact ? css.hoverableCompact : '') +
        (isHovered ? css.hovered : '') +
        (isActive ? css.active : ''),
      style: {
        ...(children.props.style || {}),
        outline: deleteHovered ? `1px dotted ${css.negative}` : undefined,
      },
    },
    subChildren,
  );
};

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
          onBlur={(e) => {
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
          onBlur={(e) => {
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
          {`{`}
          {!!keys.length && <strong>{keys.length}</strong>}
          {`}`}
        </span>
      </span>
      <span className={css.list} style={{display: collapsed ? 'none' : undefined}}>
        {keys.map((key, index) => {
          const itemPointer = `${pointer}/${key}`;
          return (
            <span key={key} className={css.line}>
              <Hoverable pointer={itemPointer}>
                <span className={css.lineInner}>
                  <JsonDoc
                    property={key}
                    doc={(doc as Record<string, unknown>)[key]}
                    pointer={itemPointer}
                    comma={formal && index < keys.length - 1}
                    onChange={onChange}
                  />
                </span>
              </Hoverable>
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
          onBlur={(e) => {
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
          {`[`}
          {!!doc.length && <strong>{doc.length}</strong>}
          {`]`}
        </span>
      </span>
      <span className={css.list} style={{display: collapsed ? 'none' : undefined}}>
        {doc.map((value, index) => {
          const itemPointer = `${pointer}/${index}`;
          return (
            <React.Fragment key={index}>
              <JsonArrayInsert pointer={`${pointer}/${index}`} visible={activePointer === pointer} />
              <span className={css.line}>
                <Hoverable pointer={itemPointer}>
                  <span className={css.lineInner}>
                    <JsonDoc
                      doc={doc[index]}
                      pointer={itemPointer}
                      comma={selectable && index < doc.length - 1}
                      onChange={onChange}
                    />
                  </span>
                </Hoverable>
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
      <Hoverable pointer="">
        <span ref={ref} className={css.block} style={{fontSize: props.fontSize || '13.4px'}}>
          <JsonDoc {...props} pointer="" />
        </span>
      </Hoverable>
    </context.Provider>
  );
};
