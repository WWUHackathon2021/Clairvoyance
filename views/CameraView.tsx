import React, { FunctionComponent } from 'react';
import { Image, View } from 'react-native';

type CameraProps = {
  cameraUrl: string
};

const CameraView: FunctionComponent<CameraProps> = ({ cameraUrl }: CameraProps) => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "green" }}>
      <Image
        source={{uri: cameraUrl}}
        style={{width: 400, height: 400}}
      />
      </View>
    </>
  );
}

export default CameraView;