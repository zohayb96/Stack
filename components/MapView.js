import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import axios from 'axios';

export default class MapToView extends React.Component {
  constructor() {
    super();
    this.state = {
      latitude: 40.73061,
      longitude: -73.935242,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      allPosts: [],
      reRender: false,
    };
  }

  async componentDidMount() {
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
    const response = await axios.get(`http://172.16.21.129:1337/api/oPosts`);
    this.setState({
      allPosts: response.data,
    });
  }

  render() {
    console.log('allPosts: ', this.state.allPosts);
    return (
      <View style={styles.container}>
        <MapView
          ref={MapView => (this.MapView = MapView)}
          style={styles.map}
          provider="google"
          loadingEnabled={true}
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          showsUserLocation={true}
          initialRegion={{
            latitude: 40.73061,
            longitude: -73.935242,
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
              latitude: 40.7306099999999986,
              longitude: -73.9352420000000023,
            }}
            // title={'hello'}
            // description={'sure'}
          />;
          {this.state.allPosts.map(post => {
            console.log(post);
            <MapView.Marker
              key={post.id}
              coordinate={{
                latitude: post.location[0],
                longitude: post.location[1],
              }}
              title={post.text}
              description={post.text}
            />;
          })}
        </MapView>
      </View>
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

// console.log(
//   ('latitude: ', this.state.allPosts[0].location[0]),
//   ('longitude: ', this.state.allPosts[0].location[1]),
//   ('title:', this.state.allPosts[0].text),
//   ('subtitle: ', this.state.allPosts[0].rating)
// )
// : console.log('no posts');
