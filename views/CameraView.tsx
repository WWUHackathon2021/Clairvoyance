import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';

type CameraProps = {
  cameraUrl: string
};

const CameraView: FunctionComponent<CameraProps> = ({ cameraUrl }: CameraProps) => {
  // This is a hack to force react native to clear the img cache.
  // We set a query param on the img URL every interval to force the update.
  const [forceRefreshStr, setForceRefreshStr] = useState(new Date());
  useEffect(() => {
    let intervalHandle = setInterval(() => { setForceRefreshStr(new Date()); }, 15000);

    return function cleanup() {
      clearInterval(intervalHandle);
    };
  });


  const [imgHeight, setImgHeight] = useState(100);
  let imgWidth = Dimensions.get('window').width;

  useEffect(() => {
    Image.getSize(cameraUrl, (width, height) => {
      setImgHeight(height * (imgWidth / width));
    });
  });

  return (
    <>
      <View style={styles.view}>
        <Image
          source={{ uri: `${cameraUrl}?${forceRefreshStr}` }}
          style={{ width: imgWidth, height: imgHeight }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black"
  }
});

export default CameraView;