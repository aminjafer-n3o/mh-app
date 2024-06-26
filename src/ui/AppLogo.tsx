import React from 'react';

type AppLogoProps = {
  style?: React.CSSProperties;
};

const AppLogo: React.FC<AppLogoProps> = ({ style }) => {
  return (
    <img style={{ marginLeft: 12, width: 40, height: 40, ...style }} src='mhlogo.png'/>
  );
};

export default AppLogo;

