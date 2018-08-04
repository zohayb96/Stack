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
import SeeMoreButton from './SeeMoreButton';

const defaultState = {
  postText: '',
  postPicture: null,
  locationText: '',
  latitude: null,
  longitude: null,
  error: null,
};

class ReviewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: '',
      postPicture: null,
      locationText: '',
    };
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
    const currentUser = navigation.getParam('currentUser');
    console.log('REVIEW POST CU: ', currentUser);

    const {
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      imageStyle,
      completedChallengeImageStyle,
      challengesContainer,
      sceneContainer,
      textStyle,
    } = styles;

    console.log(this.state);
    let { postPicture } = this.state;
    const originalPost = navigation.getParam('originalPost');
    const originalPostData = originalPost.postData;
    const { picture, text, rating, issuedFrom } = originalPostData;
    console.log('originalPostData: ', originalPostData);

    return (
      <TopContainer>
        <Container>
          <View style={thumbnailContainerStyle}>
            <Image style={thumbnailStyle} source={{ uri: picture }} />
          </View>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{text}</Text>
            <Text style={headerTextStyle}>
              Created by: {issuedFrom.firstName + ' ' + issuedFrom.lastName}
            </Text>
            {rating > 90 ? (
              <Text>Rated: {rating} 🔥🔥🔥</Text>
            ) : rating > 80 ? (
              <Text>Rated: {rating} 🔥🔥</Text>
            ) : rating > 70 ? (
              <Text>Rated: {rating} 🔥</Text>
            ) : rating > 50 ? (
              <Text>Rated: {rating} 👍</Text>
            ) : (
              <Text>Rated: {rating} 👎</Text>
            )}
          </View>
        </Container>
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
            placeholder="Add your review here"
            style={styles.textStyle}
          />
        </Container>
        <Container>
          <TextInput
            name="locationText"
            value={this.state.locationText}
            onChangeText={locationText => this.setState({ locationText })}
            placeholder="Add your rating: 0-100 "
            style={styles.textStyle}
          />
        </Container>
        <Container>
          <SeeMoreButton onPress={this.pickImage}>Image</SeeMoreButton>
        </Container>
        <Container>
          <Button>Complete</Button>
        </Container>
      </TopContainer>
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
  thumbnailStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  textStyle: {
    fontSize: 14,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Helvetica Neue',
  },
  buttonStyle: {
    height: 30,
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 5,
    backgroundColor: '#009a9a',
  },
  background: {
    backgroundColor: '#32324e',
  },
  container: {
    color: 'red',
  },
  imageStyle: {
    height: 200,
    flex: 1,
    width: 200,
  },
};

export default withNavigation(ReviewPost);
