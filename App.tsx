import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from './views/MapView';
import CameraView from './views/CameraView';

const App = () => {
  const [currentCamera, setCurrentCamera] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView setCameraFunction = { setCurrentCamera } />
      <CameraView cameraUrl = { currentCamera } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;