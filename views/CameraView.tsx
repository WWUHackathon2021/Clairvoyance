import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import * as Location from "expo-location";
import { cameraData, Camera } from "../utils/cameraData";
import { throttle } from "../utils/throttle";
import * as MathUtils from "../utils/math";

const GPS_REFRESH_INTERVAL_MILLISECONDS: number = 10000;
const TIME_LOOKAHEAD: number = 60;

type CameraViewProps = {
  //cameraUrl: string,
  isLandscape: boolean,
};

export function CameraView( props: CameraViewProps )
{
  const [closestCamera, setClosestCamera] = useState<Camera | null>( null );
  // const prevLocation = useRef<Location.LocationObject | null>( null );
  const [prevLocation, setPrevLocation] = useState<Location.LocationObject | null>( null );
  //const [errorMsg, setErrorMsg] = useState( '' );
  // This is a hack to force react native to clear the img cache.
  // We set a query param on the img URL every interval to force the update.

  // TODO (weberte): why is the callback not running? I have no idea what I'm doing...
  useEffect(() => {
    (async () => {
      const locationOptions: Location.LocationOptions = {
        accuracy: 3,
        timeInterval: GPS_REFRESH_INTERVAL_MILLISECONDS,
        distanceInterval: 30
      };
      let removeFunction = await Location.watchPositionAsync( locationOptions, refreshCameraView );

      return function cleanup() {
        removeFunction.remove();
      }
    })();
  }, [prevLocation]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log( 'Permission to access location was denied' );
        console.log( `status=${ status }` );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // prevLocation.current = location;
      setPrevLocation( location );
    })();
  }, []);
  

  /**
   * 
   * DELETE THIS BLOCK! I'm just using this to test the math...
   * 
   */
  // const prevTest: Location.LocationObject = {
  //   coords: {
  //     latitude: 47.4702,
  //     longitude: -120.325,
  //     altitude: null,
  //     accuracy: null,
  //     altitudeAccuracy: null,
  //     heading: null,
  //     speed: null,
  //   },
  //   timestamp: 12345
  // }

  // const currTest: Location.LocationObject = {
  //   coords: {
  //     latitude: 48.998933,
  //     longitude: -119.461365,
  //     altitude: null,
  //     accuracy: null,
  //     altitudeAccuracy: null,
  //     heading: null,
  //     speed: null,
  //   },
  //   timestamp: 123765
  // }

  // const testCamera: Camera | null = findClosestCamera( prevTest, currTest );

   /**
   * 
   * DELETE THIS BLOCK! I'm just using this to test the math...
   * 
   */

  // let closestCameraUrl: string = testCamera!.url;
  // if ( closestCamera )
  // {
  //   closestCameraUrl = closestCamera.url;
  // }
  // console.log( `closetCameraUrl=${ closestCameraUrl }` );

  let closestCameraUrl: string = "idk";
  if ( closestCamera )
  {
    closestCameraUrl = closestCamera.url
  } else if (prevLocation)
  {
    closestCameraUrl = nearestCamera(
      [
        prevLocation!.coords.latitude,
        prevLocation!.coords.longitude
      ] )!.url;
  }

  return (
    <div style={{
      backgroundColor: 'black',
      backgroundImage: `url("${ closestCameraUrl }")`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      height: props.isLandscape ? '100vh' : '50vh'
    }}></div>
  );


  function refreshCameraView( currentLocation: Location.LocationObject )
  {
    console.log( `currentLocation=${ currentLocation }` );
    console.log( `prevLocation=${ prevLocation }` );


    // Call findClosestCamera with current and previous location objects
    const closest: Camera | null  = findClosestCamera( prevLocation, currentLocation );
    console.log( `closestCamera=${ closest }` );

    // prevLocation.current = currentLocation;
    setPrevLocation( currentLocation );

    setClosestCamera( closest );
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

    // Calculate bearing
    const bearing: number = MathUtils.getBearing(
      prevLocation!.coords.latitude,
      prevLocation!.coords.longitude,
      currLocation!.coords.latitude,
      currLocation!.coords.longitude );

    // Get location 1 minute ahead depending on your speed
    const lookaheadDistanceMeters: number = speed * TIME_LOOKAHEAD

    // Calculate the target location
    const lookaheadLocation: number[] = MathUtils.destVincenty(
      currLocation!.coords.latitude,
      currLocation!.coords.longitude,
      bearing,
      lookaheadDistanceMeters
    );

    console.log( `speed=${ speed }, bearing=${ bearing }, lookaheadLocation=${ lookaheadLocation }` );

    return nearestCamera( lookaheadLocation );
  }

  function nearestCamera( lookaheadLocation: number[] )
  {
    let closestCamera: Camera | null = null; // This is dumb, but I'm tired.
    let minDistance: number = Number.MAX_VALUE;
    for ( let camera of cameraData )
    {
      const dist: number = MathUtils.haversineDistance(
        camera.y,
        camera.x,
        lookaheadLocation[0],
        lookaheadLocation[1] );

      if ( dist < minDistance )
      {
        minDistance = dist;
        closestCamera = camera;
      }
    }

    console.log( closestCamera );
    return closestCamera;
  }
}
