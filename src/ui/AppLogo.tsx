import React from 'react';

type Size = 'sm' | 'md' | 'lg' | 'xl';

type AppLogoProps = {
  size?: Size;
  style?: React.CSSProperties;
};

const AppLogo: React.FC<AppLogoProps> = ({ size = 'md', style }) => {
  let imageSize;

  switch (size) {
    case 'sm':
      imageSize = 24;
      break;
    case 'lg':
      imageSize = 64;
      break;
    case 'xl':
      imageSize = 80;
      break;
    default:
      imageSize = 40;
  }

  return (
    <img
      style={{ marginLeft: 12, width: imageSize, height: imageSize, ...style }}
      src='mhlogo.png'
    />
  );
};

export default AppLogo;

