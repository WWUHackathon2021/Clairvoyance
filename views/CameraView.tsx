import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import * as Location from "expo-location";
import { cameraData, Camera } from "../utils/cameraData";
import { throttle } from "../utils/throttle";
import * as MathUtils from "../utils/math";

const GPS_REFRESH_INTERVAL_MILLISECONDS: number = 10000;
const TIME_LOOKAHEAD: number = 60;

type CameraViewProps = {
  cameraUrl: string,
  isLandscape: boolean,
};

export function CameraView( props: CameraViewProps )
{
  const [closetCamera, setClosestCamera] = useState<Camera | null>( null );
  const prevLocation = useRef<Location.LocationObject | null>( null );
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

  const locationOptions: Location.LocationOptions = {
    accuracy: 3,
    timeInterval: GPS_REFRESH_INTERVAL_MILLISECONDS,
    distanceInterval: 30
  }

  const currLocation = Location.watchPositionAsync( locationOptions, refreshCameraView );

  //console.log(location);


  function refreshCameraView( currentLocation: Location.LocationObject )
  {
    console.log( "currentLocation=" );
    console.log( currentLocation );
    console.log( "previousLocation=" );
    console.log( prevLocation.current );


    // Call findClosestCamera with current and previous location objects
    const closestCamera: Camera = findClosestCamera( prevLocation.current, currentLocation );

    prevLocation.current = currentLocation;

    // set camera url

  }



  function findClosestCamera( prevLocation: Location.LocationObject | null, currLocation: Location.LocationObject | null )
  {
    if ( currLocation === null )
    {
      console.log( "PANIC!" );
    }

    if ( prevLocation === null )
    {
      console.log( "Not sure what to do here... I guess set as currLocation?" );
      prevLocation = currLocation;
    }

    // Calculate speed (m/sec)
    var speed: number = 0.0;
    if ( currLocation!.coords.speed === null )
    {
      speed = MathUtils.haversineDistance(
        prevLocation!.coords.latitude,
        prevLocation!.coords.longitude,
        currLocation!.coords.latitude,
        currLocation!.coords.longitude ) / ( GPS_REFRESH_INTERVAL_MILLISECONDS / 1000 );
    } else
    {
      speed = currLocation!.coords.speed;
    }

    // TODO: Derive bearing
    const bearing: number = MathUtils.getBearing(
      prevLocation!.coords.latitude,
      prevLocation!.coords.longitude,
      currLocation!.coords.latitude,
      currLocation!.coords.longitude );

    // TODO: Get location 1 minute ahead depending on your speed
    const lookaheadDistanceMeters: number = speed * TIME_LOOKAHEAD

    // TODO: Calculate the target location
    const lookaheadLocation: number[] = MathUtils.destVincenty(
      currLocation!.coords.latitude,
      currLocation!.coords.longitude,
      bearing,
      lookaheadDistanceMeters
    );

    // TODO: Find K=1 nearest camera
    
    return {
      "x": -120.180534,
      "y": 47.765599,
      "url": "https://images.wsdot.wa.gov/nc/ktunnel_medium.jpg"
    }
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
