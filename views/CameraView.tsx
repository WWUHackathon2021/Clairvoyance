import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Image } from 'react-native';

type CameraProps = {
  cameraUrl: string
};

const CameraView: FunctionComponent<CameraProps> = ({ cameraUrl }: CameraProps) => {
  return (
    <>
      <View style={styles.view}>
        <Image
          source={{uri: cameraUrl}}
          style={styles.image}
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
    backgroundColor: "green"
  },
  image: {
    width: 400,
    height: 400
  }
});

export default CameraView;