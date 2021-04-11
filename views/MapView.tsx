import React, { FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import LocationView from './LocationView';

type MapProps = {
  setCameraFunction: (cameraUrl: string) => void
};

const MapView: FunctionComponent<MapProps> = ({ setCameraFunction }: MapProps) => {
  // TODO: Link this event handler to the leaflet map so when a pin is selected
  // the new camera URL gets passed here.
  function handleCameraSelected(cameraUrl: string) {
    setCameraFunction(cameraUrl);
  }
  // Hard code this temporarily
  handleCameraSelected('https://www.seattle.gov/trafficcams/images/Aurora_N_46_NS.jpg');

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <LocationView />
      </View>
    </>
  );
}

export default MapView;