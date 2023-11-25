import * as React from 'react';
import {rule, useRule} from 'nano-theme';
import {MiniTitle} from 'p4-ui/lib/src/3-list-item/MiniTitle';

const blockClass = rule({
  d: 'inline-block',
  bxz: 'border-box',
  w: '100%',
  pd: '16px',
  bdrad: '8px',
});

export interface GrayCardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

export const GrayCard: React.FC<GrayCardProps> = ({title, children}) => {
  const blockClassDynamic = useRule(theme => ({
    bg: theme.g(0, .05),
  }));

  return (
    <span className={blockClass + blockClassDynamic}>
      {!!title && <MiniTitle>{title}</MiniTitle>}
      {children}
    </span>
  );
};