import { StatusBar } from 'expo-status-bar';
import useSize from '@react-hook/size';
import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView } from './views/MapView';
import { CameraView } from './views/CameraView';

const App = () => {
  const [currentCamera, setCurrentCamera] = useState('');
  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useSize(containerRef, {initialWidth:window.innerWidth, initialHeight:window.innerHeight});
  const isLandscape:boolean = containerWidth > containerHeight;
  
  const viewStyle:React.CSSProperties = {
    flex: '50%'
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <div ref={containerRef}
      style={{
        width:'100%',
        height:'100%',
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: isLandscape ? 'row' : 'column'
      }}>
        <div style={viewStyle}>
          <MapView
            setCameraFunction={ setCurrentCamera }
            isLandscape={isLandscape}
          />
        </div>
        <div style={viewStyle}>
          <CameraView
            //cameraUrl={ currentCamera }
            isLandscape={isLandscape}
           />
        </div>
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;