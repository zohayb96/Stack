import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import SinglePost from './SinglePost';

class MapToView extends React.Component {
  constructor() {
    super();
    this.state = {
      latitude: 40.73061,
      longitude: -73.935242,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
      allPosts: [],
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
    const response = await axios.get(
      `http://192.168.1.16:1337/api/oPosts/forUsers`
    );
    this.setState({
      allPosts: response.data,
    });
  }

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    return (
      <View style={styles.container}>
        <MapView
          ref={MapView => (this.MapView = MapView)}
          style={styles.map}
          // provider="google"
          loadingEnabled={true}
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          showsUserLocation={true}
          showsPointsOfInterest={false}
          initialRegion={{
            latitude: 40.73061,
            longitude: -73.935242,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}
        >
          {/* {this.state.allPosts.map(post => {
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
          })} */}
          {this.state.allPosts.map(marker => {
            return (
              <MapView.Marker
                key={marker.id}
                coordinate={{
                  latitude: Number(marker.location[0]),
                  longitude: Number(marker.location[1]),
                }}
                // image={require('../public/fireMarker.png')}
                title={marker.text}
                description={
                  'Created by: ' +
                  marker.issuedFrom.firstName +
                  ' ' +
                  marker.issuedFrom.lastName +
                  ', Rated: ' +
                  marker.rating
                }
                onPress={() => {
                  this.props.navigation.navigate('SinglePost', {
                    post: { marker },
                    currentUser: { user },
                  });
                }}
              >
                {/* <Image
                  source={{ uri: marker.picture }}
                  style={{ width: 20, height: 20 }}
                /> */}
              </MapView.Marker>
            );
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

export default withNavigation(MapToView);
