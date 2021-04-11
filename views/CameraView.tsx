import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import * as Location from "expo-location";
import { cameraData, camera } from "../utils/cameraData";
import { throttle } from "../utils/throttle";

type CameraViewProps = {
  cameraUrl: string,
  isLandscape: boolean,
};

export function CameraView( props: CameraViewProps )
{
  const [closetCamera, setClosestCamera] = useState<camera|null>( null );
  const [prevLocation, setPrevLocation] = useState<Location.LocationObject|null>( null );
  const [errorMsg, setErrorMsg] = useState( '' );
  // This is a hack to force react native to clear the img cache.
  // We set a query param on the img URL every interval to force the update.

  /*
   function refetch(){
      ...
    }
  
    useEffect() => {
        const interval = setInterval(refetch, 1000);
        return () => clearInterval(interval);
    }, [refetch];
  */

  const locationOptions:Location.LocationOptions = {
    accuracy: 3,
    timeInterval: 10000,
    distanceInterval: 30
  }

  const location = Location.watchPositionAsync(locationOptions, refreshCameraView);

  console.log(location);


  function refreshCameraView()
  {
    // Get currentLocation

    // Call findClosestCamera with current and previous location objects

    // return camera
    
    // let { status } = await requestPermissionsAsync();
    //   if (status !== 'granted') {
    //     setErrorMsg('Permission to access location was denied');
    //     return;
    //   }

    //   let currLocation = await getCurrentPositionAsync( {} );


  }



  function findClosestCamera( prevLocation: Location.LocationObject, currLocation: Location.LocationObject )
  {
    // TODO: Calculate speed

    // TODO: Derive bearing

    // TODO: Get location 1 minute ahead depending on your speed

    // TODO: Calculate the target location

    // TODO: Find K=1 nearest camera

    // TODO: return the actual result
    return null;
  }

  return (
    <div style={{
      backgroundColor: 'black',
      backgroundImage: `url("${ props.cameraUrl }")`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      height: props.isLandscape ? '100vh' : '50vh'
    }}></div>
  );
}
