import React, { FunctionComponent, useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as MathUtils from "../utils/math";
import { LocationObject } from "expo-location";
import { cameraData, camera } from "../utils/cameraData";


const ClosestCameraView: FunctionComponent = () =>
{
  const [closetCamera, setClosestCamera] = useState<camera|null>( null );
  const [prevLocation, setPrevLocation] = useState<LocationObject|null>( null );
  const [errorMsg, setErrorMsg] = useState( '' );
  
  // useEffect(() => {
  //   setInterval(() => {
  //     console.log(prevCoord); // this will always show 0
  //     setPrevCoordinate(prevCoord + 1);
  //   }, 5000);
  // }, []);

//  

  useEffect( () =>
  {
    ( async () =>  // not necessary?
    {
      // Refresh every second
      // let intervalHandle = setInterval(() => { setForceRefreshStr(new Date()); }, 15000);
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currLocation = await Location.getCurrentPositionAsync( {} );
      console.log( "location=" + currLocation );

      let closetCameraLocation = findClosestCamera( currLocation, prevLocation );
      
      setClosestCamera( closetCameraLocation );
      setPrevLocation( currLocation );
      
      // setPrevCoordinate( currLocation );

    })();
  }, [] );  // in [], put variable, every time location is updated, effect is recalled

  let closestCamText = 'Getting closest camera...';
  if (errorMsg) {
    closestCamText = errorMsg;
  } else if (closetCamera) {
    closestCamText = "Current coordinate: latitude=" + closetCamera.x + "longitude=" + closetCamera.y;
    prevCoordText = "Previous coordinate: latitude=" + prevLocation.coords.latitude + "longitude=" + prevLocation.coords.longitude;
  }

  return (
    <>
      <Text style={styles.paragraph}>{closestCamText}</Text>
    </>
  );
}

// import { LocationAccuracy, LocationCallback, LocationGeocodedAddress, LocationGeocodedLocation, LocationHeadingCallback, LocationHeadingObject, LocationLastKnownOptions, LocationObject, LocationOptions, LocationPermissionResponse, LocationProviderStatus, LocationRegion, LocationSubscription, LocationTaskOptions, LocationActivityType, LocationGeofencingEventType, LocationGeofencingRegionState, LocationGeocodingOptions } from './Location.types';
function findClosestCamera( prevLocation: LocationObject, currLocation: LocationObject )
{
  // TODO: Calculate speed

  // TODO: Derive bearing

  // TODO: Get location 1 minute ahead depending on your speed

  // TODO: Calculate the target location

  // TODO: Find K=1 nearest camera

  // TODO: return the actual result
  return null;
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 18
  },
});

export default ClosestCameraView;