import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  ImagePickerIOS,
  Alert,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import Container from './Container';
import Button from './Button';
import TopContainer from './TopContainer';
import { ImagePicker } from 'expo';
import ChildPost from './ChildPost';
import { withNavigation } from 'react-navigation';

class SeePendingPostDetail extends Component {
  state = {};

  render() {
    const { navigation } = this.props;
    const originalPost = navigation.getParam('originalPost');
    const currentUser = navigation.getParam('currentUser');
    const postData = originalPost.originalPost;
    const { text, rating, picture, posts, issuedFrom } = postData;
    const {
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      imageStyle,
      buttonStyle,
      buttonContainer,
      textStyle,
      submitButton,
    } = styles;

    return (
      <TopContainer>
        <ScrollView>
          <Container>
            <View style={thumbnailContainerStyle}>
              <Image
                style={thumbnailStyle}
                source={{ uri: issuedFrom.picture }}
              />
            </View>
            <View style={headerContentStyle}>
              <Text style={headerTextStyle}>{text}</Text>
              <Text>
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
            <Image style={imageStyle} source={{ uri: picture }} />
          </Container>
          {posts.map(post => {
            return (
              <ChildPost key={post.id} childrenPosts={post} id={post.id} />
            );
          })}
        </ScrollView>
        <Container>
          <Button
            onPress={() => {
              this.props.navigation.navigate('ReviewPost', {
                originalPost: { postData },
                currentUser: { currentUser },
              });
            }}
          >
            Review Post
          </Button>
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
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  submitButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  headerTextStyle: {
    fontSize: 18,
  },
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
  imageStyle: {
    height: 200,
    flex: 1,
    width: null,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonStyle: {
    height: 30,
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 5,
    backgroundColor: '#009a9a',
  },
};

export default withNavigation(SeePendingPostDetail);
