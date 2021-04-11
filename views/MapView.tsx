import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { cameraData, camera } from '../utils/cameraData';


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


  const circles = cameraData.map(camera => {
    return (
    <CircleMarker center={[camera.y, camera.x]}>
      <Popup>
        <img src={camera.url} style={{width:'100%'}}/>
      </Popup>
    </CircleMarker>
    );
  });

  return (
    <>
      <MapContainer center={[47.6215254, -122.3646686]} zoom={10} style={{
          width: '500px',
          height: '500px'
        }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {circles}
      </MapContainer>
    </>
  );
}

export default MapView;