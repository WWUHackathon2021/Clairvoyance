import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, StyleSheet, Image, LayoutChangeEvent } from 'react-native';

type CameraProps = {
  cameraUrl: string
};

const CameraView: FunctionComponent<CameraProps> = ({ cameraUrl }: CameraProps) => {
  // This is a hack to force react native to clear the img cache.
  // We set a query param on the img URL every interval to force the update.
  const [forceRefreshStr, setForceRefreshStr] = useState(new Date());
  useEffect(() => {
    let intervalHandle = setInterval(() => { setForceRefreshStr(new Date()); }, 60000);

    return function cleanup() {
      clearInterval(intervalHandle);
    };
  });

  const [imgDimensions, setImgDimensions] = useState({ width: 400, height: 400});

  const _onViewLayoutChange = (event: LayoutChangeEvent) => {
    const containerWidth = event.nativeEvent.layout.width;
    const containerHeight = event.nativeEvent.layout.height;

    Image.getSize(cameraUrl, (ogWidth, ogHeight) => {
      let ratio = Math.min( (containerWidth / ogWidth), (containerHeight / ogHeight) );

      let newWidth = ogWidth * ratio;
      let newHeight = ogHeight * ratio;

      setImgDimensions({ width: newWidth, height: newHeight});
    });
  }

  return (
    <>
      <View style={styles.view} onLayout={_onViewLayoutChange}>
        <Image
          source={{ uri: `${cameraUrl}?${forceRefreshStr}` }}
          style={ imgDimensions }
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