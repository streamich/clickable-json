import * as React from 'react';
import {useTheme} from 'nano-theme';
import * as css from '../css';

export interface ObjectLayoutProps {
  property?: React.ReactNode;
  children?: React.ReactNode;
  collapsedView?: React.ReactNode;
  collapsed?: boolean;
  comma?: boolean;
  brackets?: [opening: string, closing: string];
  onClick?: React.MouseEventHandler;
  onCollapserClick?: React.MouseEventHandler;
  onBracketClick?: () => void;
}

export const ObjectLayout: React.FC<ObjectLayoutProps> = ({
  property,
  collapsedView,
  collapsed,
  comma,
  brackets = ['{', '}'],
  children,
  onClick,
  onCollapserClick,
  onBracketClick,
}) => {
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
    <span className={css.object} onClick={onClick}>
      <span className={css.collapser} style={{color: theme.g(0.6)}} onClick={onCollapserClick}>
        {collapsed ? '+' : '—'}
      </span>
      <span>
        {property}
        <span
          className={css.bracket + (brackedHovered ? css.bracketHovered : '')}
          style={{display: collapsed ? 'none' : undefined, color: bracketColor}}
          onMouseEnter={onBracketMouseEnter}
          onMouseLeave={onBracketMouseLeave}
          onClick={onBracketClick}
        >
          {brackets[0]}
        </span>
        <span className={css.collapsed} style={{display: !collapsed ? 'none' : undefined}}>
          <span style={{color: css.blue}}>{brackets[0]}</span>
          {collapsedView}
          <span style={{color: css.blue}}>{brackets[1]}</span>
        </span>
      </span>
      <span className={css.list} style={{display: collapsed ? 'none' : undefined}}>
        {children}
      </span>
      <span
        className={css.bracket + (brackedHovered ? css.bracketHovered : '')}
        style={{display: collapsed ? 'none' : undefined, color: bracketColor}}
        onMouseEnter={onBracketMouseEnter}
        onMouseLeave={onBracketMouseLeave}
        onClick={onBracketClick}
      >
        {brackets[1]}
      </span>
      {!!comma && ','}
    </span>
  );
};
