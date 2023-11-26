import * as React from 'react';
import {TypeSwitch} from '../TypeSwitch';

export interface CrdtTypeSwitchProps {
  types?: string[];
  type: React.RefObject<string>;
}

export const CrdtTypeSwitch: React.FC<CrdtTypeSwitchProps> = ({types =  ['any', 'con', 'vec', 'val'] as const, type}) => {
  const [typeIndex, setTypeIndex] = React.useState(0);
  React.useLayoutEffect(() => {
    (type as any).current = types[typeIndex];
  }, []);

  const onNext = () => {
    setTypeIndex((n) => {
      const index = (n + 1) % types.length;
      (type as any).current = types[index];
      return index;
    });
  };

  const onPrev = () => {
    setTypeIndex((n) => {
      const index = (n - 1 + types.length) % types.length;
      (type as any).current = types[index];
      return index;
    });
  };

  return (
    <span style={{display: 'inline-block', padding: '0 4px 0 0', margin: '0 0 0 -4px'}}>
      <TypeSwitch
        value={types[typeIndex]}
        onClick={() => onNext()}
        onKeyDown={(e) => {
          switch (e.key) {
            case 'ArrowDown':
            case 'ArrowRight': {
              e.preventDefault();
              onNext();
              break;
            }
            case 'ArrowUp':
            case 'ArrowLeft': {
              e.preventDefault();
              onPrev();
              break;
            }
          }
        }}
      />
    </span>
  );
};
