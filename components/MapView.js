import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';

export default class MapToView extends React.Component {
  constructor() {
    super();
    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    console.log(this.state);
    var markers = [
      {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        title: 'Foo Place',
        subtitle: '1234 Foo Drive',
      },
    ];
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            title={'Current Location'}
            description={'Hello :)'}
          />
        </MapView>
      </View>

      // <MapView
      //   style={{
      //     flex: 1,
      //   }}
      //   region={{
      //     latitude: this.state.latitude,
      //     longitude: this.state.longitude,
      //     latitudeDelta: this.state.latitudeDelta,
      //     longitudeDelta: this.state.longitudeDelta,
      //   }}
      //   annotations={markers}
      //   onRegionChange={this.onRegionChange}
      // />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
