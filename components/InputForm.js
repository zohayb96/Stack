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
import InputButton from './InputButton';
import SeeMoreButton from './SeeMoreButton';
import Container from './Container';
import TopContainer from './TopContainer';
import { ImagePicker, Permissions } from 'expo';
import axios from 'axios';
import { withNavigation } from 'react-navigation';

const defaultState = {
  text: '',
  picture: null,
  rating: '',
  latitude: null,
  longitude: null,
  error: null,
};

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      picture: null,
      rating: '',
      latitude: null,
      longitude: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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

  async handleSubmit(evt) {
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
    const { navigation } = this.props;
    const currentUser = navigation.getParam('user');
    const locationToSave = [this.state.latitude, this.state.longitude];
    try {
      let count = 0;
      const newOriginalPost = await axios.post(
        'http://10.2.6.34:1337/api/oPosts/create',
        {
          text: this.state.text,
          picture: this.state.picture,
          rating: this.state.rating,
          issuedFromId: currentUser.id,
          location: locationToSave,
        }
      );
      this.setState(defaultState);
      this.showAlert();
    } catch (err) {
      this.showFailAlert();
      console.log(err);
    }
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
    const { navigation } = this.props;
    let { picture } = this.state;

    return (
      <View>
        <Container>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            {picture && (
              <Image
                source={{ uri: picture }}
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
            name="text"
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
            placeholder="What would you like to add to map"
            style={styles.textStyle}
          />
        </Container>
        <Container>
          <TextInput
            name="rating"
            value={this.state.rating}
            onChangeText={rating => this.setState({ rating })}
            placeholder="Add your rating (0-100)"
            style={styles.textStyle}
          />
        </Container>
        <Container>
          <SeeMoreButton onPress={this.pickImage}>
            Image From Camera
          </SeeMoreButton>
        </Container>
        <Container>
          <SeeMoreButton onPress={this.pickImageFromCameraRoll}>
            Image From Library
          </SeeMoreButton>
        </Container>
        <Container>
          <InputButton
            onPress={() =>
              this.props.navigation.navigate('Render', {
                image: this.state.picture,
                postText: this.state.text,
                locationText: this.state.rating,
                sentImage: this.state.picture,
              })
            }
          >
            Add AR Object
          </InputButton>
        </Container>
        <Container>
          <Button onPress={this.handleSubmit}>Add To Map</Button>
        </Container>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              width: '100%',
              textAlign: 'center',
              color: 'white',
              fontSize: 12,
            }}
          >
            Will Post With Your Current Location
          </Text>
        </View>
      </View>
    );
  }

  pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ picture: result.uri });
    }
    console.log(this.state);
  };

  pickImageFromCameraRoll = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ picture: result.uri });
    }
    console.log(this.state);
  };
}

const styles = {
  background: {
    backgroundColor: '#FFFFFF',
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
