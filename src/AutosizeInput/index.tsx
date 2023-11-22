import * as React from 'react';

const sizerStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  height: 0,
  overflow: 'scroll',
  whiteSpace: 'pre',
};

const INPUT_PROPS_BLACKLIST = [
  'extraWidth',
  'injectStyles',
  'inputClassName',
  'inputRef',
  'inputStyle',
  'minWidth',
  'onAutosize',
  'placeholderIsMinWidth',
];

const cleanInputProps = (inputProps: object) => {
  INPUT_PROPS_BLACKLIST.forEach((field) => delete (inputProps as any)[field]);
  return inputProps;
};

const copyStyles = (styles: React.CSSProperties, node: any) => {
  node.style.fontSize = styles.fontSize;
  node.style.fontFamily = styles.fontFamily;
  node.style.fontWeight = styles.fontWeight;
  node.style.fontStyle = styles.fontStyle;
  node.style.letterSpacing = styles.letterSpacing;
  node.style.textTransform = styles.textTransform;
};

export interface AutosizeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  defaultValue?: string;
  placeholder?: string;
  inputStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  className?: string;
  inputClassName?: string;
  minWidth?: number;
  id?: string;
  placeholderIsMinWidth?: boolean;
  extraWidth?: any;
  type?: any;
  onAutosize?: (inputWidth: number) => void;
  inputRef?: (el: any) => void;
}

export interface AutosizeInputState {
  inputWidth: number;
}

export class AutosizeInput extends React.Component<AutosizeInputProps, AutosizeInputState> {
  mounted: boolean = false;
  input: any;
  placeHolderSizer: any;
  sizer: any;

  constructor(props: AutosizeInputProps, context: unknown) {
    super(props, context);
    this.state = {
      inputWidth: props.minWidth || 0,
    };
  }
  componentDidMount() {
    this.mounted = true;
    this.copyInputStyles();
    this.updateInputWidth();
  }
  UNSAFE_componentWillReceiveProps(nextProps: AutosizeInputProps) {
    const {id} = nextProps;
    if (id !== this.props.id) {
    }
  }
  componentDidUpdate(prevProps: AutosizeInputProps, prevState: AutosizeInputState) {
    if (prevState.inputWidth !== this.state.inputWidth) {
      if (typeof this.props.onAutosize === 'function') {
        this.props.onAutosize(this.state.inputWidth);
      }
    }
    this.updateInputWidth();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  inputRef = (el: HTMLInputElement) => {
    this.input = el;
    if (typeof this.props.inputRef === 'function') {
      this.props.inputRef(el);
    }
  };

  placeHolderSizerRef = (el: HTMLElement) => {
    this.placeHolderSizer = el;
  };

  sizerRef = (el: HTMLElement) => {
    this.sizer = el;
  };

  copyInputStyles() {
    if (!this.mounted || !window.getComputedStyle) {
      return;
    }
    const inputStyles = this.input && window.getComputedStyle(this.input);
    if (!inputStyles) {
      return;
    }
    copyStyles(inputStyles, this.sizer);
    if (this.placeHolderSizer) {
      copyStyles(inputStyles, this.placeHolderSizer);
    }
  }

  updateInputWidth() {
    if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
      return;
    }
    let newInputWidth;
    if (this.props.placeholder && (!this.props.value || (this.props.value && this.props.placeholderIsMinWidth))) {
      newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
    } else {
      newInputWidth = this.sizer.scrollWidth + 2;
    }
    // add extraWidth to the detected width. for number types, this defaults to 16 to allow for the stepper UI
    const extraWidth =
      this.props.type === 'number' && this.props.extraWidth === undefined
        ? 16
        : parseInt(this.props.extraWidth, 10) || 0;
    newInputWidth += extraWidth;
    if (newInputWidth < (this.props.minWidth || 0)) {
      newInputWidth = this.props.minWidth;
    }
    if (newInputWidth !== this.state.inputWidth) {
      this.setState({
        inputWidth: newInputWidth,
      });
    }
  }
  getInput() {
    return this.input;
  }
  focus() {
    this.input.focus();
  }
  blur() {
    this.input.blur();
  }
  select() {
    this.input.select();
  }
  render() {
    const sizerValue = [this.props.defaultValue, this.props.value, ''].reduce((previousValue, currentValue) => {
      if (previousValue !== null && previousValue !== undefined) {
        return previousValue;
      }
      return currentValue;
    });

    const wrapperStyle = {...this.props.style};
    if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';

    const inputStyle = {
      boxSizing: 'content-box',
      width: `${this.state.inputWidth}px`,
      ...this.props.inputStyle,
    };

    const {...inputProps} = this.props as any;
    cleanInputProps(inputProps);
    inputProps.className = this.props.inputClassName;
    inputProps.style = inputStyle;

    return (
      <div className={this.props.className} style={wrapperStyle}>
        <input {...inputProps} ref={this.inputRef} />
        <div ref={this.sizerRef as any} style={sizerStyle}>
          {sizerValue}
        </div>
        {this.props.placeholder ? (
          <div ref={this.placeHolderSizerRef as any} style={sizerStyle}>
            {this.props.placeholder}
          </div>
        ) : null}
      </div>
    );
  }
}

export default AutosizeInput;
