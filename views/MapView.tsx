import React from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import { cameraData, Camera } from '../utils/cameraData';
import "leaflet/dist/leaflet.css";

type MapProps = {
  // setCameraFunction: (cameraUrl: string) => void,
  isLandscape: boolean,
};

export function MapView(props:MapProps){
  // TODO: Link this event handler to the leaflet map so when a pin is selected
  // the new camera URL gets passed here.
  // function handleCameraSelected(cameraUrl: string) {
  //   props.setCameraFunction(cameraUrl);
  // }
  // // Hard code this temporarily
  // handleCameraSelected('https://www.seattle.gov/trafficcams/images/Aurora_N_46_NS.jpg');

  const circles = cameraData.map(camera => {
    return (
    <CircleMarker center={[camera.y, camera.x]}>
      <Popup
        minWidth={200}
        maxWidth={500}>
        <img src={camera.url} style={{width:'100%'}}/>
      </Popup>
    </CircleMarker>
    );
  });

  return (
      <MapContainer center={[47.6215254, -122.3646686]} zoom={10} style={{
          width: '100%',
          height: props.isLandscape ? '100vh' : '50vh'
        }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {circles}
      </MapContainer>
  );
}