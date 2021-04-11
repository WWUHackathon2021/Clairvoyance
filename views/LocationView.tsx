import React, { FunctionComponent, useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const LocationView: FunctionComponent = () => {
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(JSON.stringify(location));
    })();
  }, []);

  let text = 'Getting current location..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <>
      <Text style={styles.paragraph}>{text}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 18
  },
});

export default LocationView;