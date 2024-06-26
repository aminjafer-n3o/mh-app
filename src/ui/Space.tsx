import React from 'react';

export type SpaceProps = {
  size: 'sm' | 'md' | 'lg' | 'xl';
};

export const Space: React.FC<SpaceProps> = ({ size }) => {
  let style;

  switch (size) {
    case 'sm':
      style = { height: '8px' };
      break;
    case 'md':
      style = { height: '16px' };
      break;
    case 'lg':
      style = { height: '32px' };
      break;
    case 'xl':
      style = { height: '32px' };
      break;
    default:
      style = { height: '16px' };
  }

  return <div style={style} />;
};