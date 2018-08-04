import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import Container from './Container';
import Button from './Button';
import TopContainer from './TopContainer';

class ChildPost extends Component {
  state = {};

  render() {
    const { navigation } = this.props;
    console.log('PASSED PROPS: ', this.props);
    const responsePost = this.props.childrenPosts;
    const {
      responseRating,
      responseText,
      responsePicture,
      issuedTo,
    } = responsePost;

    const {
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      imageStyle,
      buttonStyle,
      buttonContainer,
      textStyle,
    } = styles;

    return (
      <TopContainer>
        <Container>
          <View style={thumbnailContainerStyle}>
            <Image style={thumbnailStyle} source={{ uri: issuedTo.picture }} />
          </View>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>
              {issuedTo.firstName + ' ' + issuedTo.lastName}
            </Text>
            <Text>Review: {responseText}</Text>
            {responseRating > 90 ? (
              <Text>Rated: {responseRating} 🔥🔥🔥</Text>
            ) : responseRating > 80 ? (
              <Text>Rated: {responseRating} 🔥🔥</Text>
            ) : responseRating > 70 ? (
              <Text>Rated: {responseRating} 🔥</Text>
            ) : responseRating > 50 ? (
              <Text>Rated: {responseRating} 👍</Text>
            ) : (
              <Text>Rated: {responseRating} 👎</Text>
            )}
          </View>
        </Container>
        <Container>
          <Image style={imageStyle} source={{ uri: responsePicture }} />
        </Container>
      </TopContainer>
    );
  }
}

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
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

export default ChildPost;
