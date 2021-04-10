import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import cameraData from './assets/cameras.json'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Map/>
    </View>
  );
}

interface camera {
  x: number,
  y: number,
  url: string
}

interface MapParamSet {
  cameras?: camera[]
}

function Map(props:MapParamSet){
  const cameras:camera[] = cameraData as camera[];
  const circles = cameras.map(camera => {
    return (
    <CircleMarker center={[camera.y, camera.x]}>
      <Popup>
        <img src={camera.url} style={{width:'100%'}}/>
      </Popup>
    </CircleMarker>
    );
  });

  console.log(cameras[0].x);
  console.log(cameras[0].y);
  console.log(cameras[0].url);
 
  return (
    <MapContainer center={[47.6215254, -122.3646686]} zoom={10} style={{
      width: '100%',
      height: '100%'
    }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {circles}
  </MapContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
