import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';

type CameraViewProps = {
  cameraUrl: string,
  isLandscape: boolean,
};

export function CameraView(props:CameraViewProps){
  // This is a hack to force react native to clear the img cache.
  // We set a query param on the img URL every interval to force the update.
  const [forceRefreshStr, setForceRefreshStr] = useState(new Date());
  useEffect(() => {
    let intervalHandle = setInterval(() => { setForceRefreshStr(new Date()); }, 15000);

    return function cleanup() {
      clearInterval(intervalHandle);
    };
  });

  return (
    <div style={{
      backgroundColor: 'black',
      backgroundImage: `url("${props.cameraUrl}?${forceRefreshStr}")`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      height: props.isLandscape ? '100vh' : '50vh'
    }}></div>
  );
}
