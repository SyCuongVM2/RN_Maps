import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

import PriceMarker from '../components/PriceMarker';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const Map = () => {
  const [states, setStates] = useState({
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    marker: {
      latitude: LATITUDE + SPACE,
      longitude: LONGITUDE + SPACE
    },
    info: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
    }
  });

  const markerDrag = (e) => {
    console.log(e.nativeEvent.coordinate);
    const coords = e.nativeEvent.coordinate;
    setStates({
      ...states,
      coords
    });
  }
  const onRegionChange = (region) => {
    setStates({
      ...states,
      region
    });
  }
  const onMapPress = (e) => {
    const coords = e.nativeEvent.coordinate;
    setStates({
      ...states,
      info: coords
    });
  }
  const onSelectMarker = (e) => {
    const coords = e.nativeEvent.coordinate;
    setStates({
      ...states,
      marker: coords
    });
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={states.region}
        onRegionChange={region => onRegionChange(region)}
        onPress={e => onMapPress(e)}
      >
        <Marker
          draggable={true}
          coordinate={states.region}
          onDrag={e => onSelectMarker(e)}
        >
          <PriceMarker amount={100} fontSize={30} />
        </Marker>
        {states.info && (
          <Marker coordinate={states.info}>
            <Callout style={styles.plainView}>
              <View>
                <Text>This is a plain view</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
      <View style={styles.bubble}>
        <Text style={styles.centeredText}>
          {states.region.latitude.toPrecision(7)},
          {states.region.longitude.toPrecision(7)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'stretch'
  },
  centeredText: { 
    textAlign: 'center' 
  }
});

export default Map;