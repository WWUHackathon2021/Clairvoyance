import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { MapViewMobile } from './views/MapViewMobile';
import { MapViewWeb } from './views/MapViewWeb';
import CameraView from './views/CameraView';

const App = () => {
  const [currentCamera, setCurrentCamera] = useState('');

  var MapView;
  if(Platform.OS === 'ios' || Platform.OS === 'android'){
    MapView = <MapViewMobile setCameraFunction = { setCurrentCamera } />
  }
  else if (Platform.OS === 'web'){
    MapView = <MapViewWeb setCameraFunction = { setCurrentCamera } />
  }
  else {
    MapView = <div>Your client is not supported</div>
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {MapView}
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