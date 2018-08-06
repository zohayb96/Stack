import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import Container from './Container';
import Button from './Button';
import TopContainer from './TopContainer';
import ChildPost from './ChildPost';

class SinglePost extends Component {
  constructor() {
    super();
    state = {
      // originalPostId: 0,
      // issuedToId: 0,
      // accepted: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // async componentWillMount() {
  //   const { navigation } = this.props;
  //   const currentUser = navigation.getParam('currentUser');
  //   const prop = navigation.getParam('post');
  //   const postData = prop.marker;
  //   console.log('ORIGINAL POST DATA', postData.id);
  //   console.log('CURRENT USER', currentUser.user.id);
  //   this.setState({
  //     originalPostId: postData.id,
  //     issuedToId: currentUser.user.id,
  //     accepted: true,
  //   });
  //   console.log(this.state);
  // }

  async handleSubmit(submitEvent) {
    const { navigation } = this.props;
    const currentUser = navigation.getParam('currentUser');
    const prop = navigation.getParam('post');
    const postData = prop.marker;
    const postId = postData.id;
    const userId = currentUser.user.id;
    const dataToSend = {
      originalPostId: postId,
      issuedToId: userId,
      accepted: true,
    };
    console.log(dataToSend);
    try {
      await axios.post(`http://192.168.1.16:1337/api/posts/create`, {
        originalPostId: postId,
        issuedToId: userId,
        accepted: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { navigation } = this.props;
    const currentUser = navigation.getParam('currentUser');
    const prop = navigation.getParam('post');
    const postData = prop.marker;
    const { text, rating, picture, issuedFrom, posts } = postData;

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
              <Text>
                Created by: {issuedFrom.firstName + ' ' + issuedFrom.lastName}
              </Text>
            </View>
          </Container>
          <Container>
            <Image style={imageStyle} source={{ uri: picture }} />
          </Container>
          <Container>
            <Button onPress={this.handleSubmit}>Accept</Button>
          </Container>
          {posts.map(post => {
            return (
              <ChildPost key={post.id} childrenPosts={post} id={post.id} />
            );
          })}
        </ScrollView>
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

export default SinglePost;
