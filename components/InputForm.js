import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  AppRegistry,
  ImagePickerIOS,
  Alert,
  Keyboard,
  NavigatorIO,
} from 'react-native';
import Button from './Button';
import Container from './Container';
import TopContainer from './TopContainer';
import { ImagePicker, Permissions } from 'expo';
import axios from 'axios';
import { withNavigation } from 'react-navigation';

const defaultState = {
  postText: '',
  postPicture: null,
  locationText: '',
  latitude: null,
  longitude: null,
  error: null,
};

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: '',
      postPicture: null,
      locationText: '',
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

  async componentWillMount() {
    Permissions.askAsync(Permissions.CAMERA_ROLL);
    Permissions.askAsync(Permissions.CAMERA);
  }

  // Message to user when post is successfully posted
  showAlert = () => {
    Alert.alert(
      'Posted!',
      'Awesome!',
      [{ text: ':)', onPress: () => console.log('Posted') }],
      { cancelable: false }
    );
  };

  // Message to user when post fails
  showFailAlert = () => {
    Alert.alert(
      'Failed To Add!',
      'Error!',
      [
        {
          text: 'Please Try Again',
          onPress: () => console.log('Error'),
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    console.log(this.state);
    const { navigate } = this.props;
    let { postPicture } = this.state;
    return (
      <View>
        <Container>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            {postPicture && (
              <Image
                source={{ uri: postPicture }}
                style={{
                  height: 250,
                  width: 250,
                }}
              />
            )}
          </View>
        </Container>
        <Container>
          <TextInput
            name="postText"
            value={this.state.postText}
            onChangeText={postText => this.setState({ postText })}
            placeholder="What would you like to add to map"
            style={styles.textStyle}
          />
        </Container>
        <Container>
          <TextInput
            name="locationText"
            value={this.state.locationText}
            onChangeText={locationText => this.setState({ locationText })}
            placeholder="Where are you?"
            style={styles.textStyle}
          />
        </Container>
        <Container>
          <Button onPress={this.pickImage}>Image</Button>
        </Container>
        <Container>
          <Button
            onPress={() =>
              this.props.navigation.navigate('Render', {
                image: this.state.postPicture,
                postText: this.state.postText,
                locationText: this.state.locationText,
                sentImage: this.state.postPicture,
              })
            }
          >
            Add AR Location
          </Button>
        </Container>
        <Container>
          <Button>Add To Map</Button>
        </Container>
      </View>
    );
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ postPicture: result.uri });
    }
    console.log(this.state);
  };
}

const styles = {
  background: {
    backgroundColor: '#32324e',
  },
  container: {
    color: 'red',
  },
  textStyle: {
    height: 30,
    width: '100%',
    flex: 2,
    fontSize: 18,
  },
  imageStyle: {
    height: 200,
    flex: 1,
    width: 200,
  },
};

export default withNavigation(InputForm);
