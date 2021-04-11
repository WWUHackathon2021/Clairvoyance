import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import MapView from 'react-native-maps';
import { cameraData, camera } from '../utils/cameraData';
import { MapProps } from '../utils/map';

export function MapViewMobile(props:MapProps){
  // TODO: Link this event handler to the leaflet map so when a pin is selected
  // the new camera URL gets passed here.
  function handleCameraSelected(cameraUrl: string) {
    props.setCameraFunction(cameraUrl);
  }
  // Hard code this temporarily
  handleCameraSelected('https://www.seattle.gov/trafficcams/images/Aurora_N_46_NS.jpg');

/*
  const circles = cameraData.map(camera => {
    return (
    <CircleMarker center={[camera.y, camera.x]} radius={10}>
      <Popup
        minWidth={200}
        maxWidth={500}>
        <img src={camera.url} style={{width:'100%'}}/>
      </Popup>
    </CircleMarker>
    );
  });
  */

  return (
    <>
    <Text>MOBILE VERSION</Text>
    {/*
      <Map center={[47.6215254, -122.3646686]} zoom={10} style={{
          width: '100%',
          height: '50%'
        }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {circles}
      </Map>
      */}
    </>
  );
}