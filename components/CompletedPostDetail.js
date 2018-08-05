import React from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  ScrollView,
  SegmentedControlIOS,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import TopContainer from './TopContainer';
import Container from './Container';
import SeeMoreButton from './SeeMoreButton';

const CompletedPostDetail = ({ posts, navigation }) => {
  const { responseRating, responseText, responsePicture } = posts;

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
    responseContainerStyle,
    responsePictureStyle,
    container,
  } = styles;

  return (
    <TopContainer>
      <Container>
        {/* <View style={thumbnailContainerStyle}>
          <Image
            style={thumbnailStyle}
            source={{ uri: posts.originalPost.issuedFrom.picture }}
          />
        </View> */}
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>
            Original Post: {posts.originalPost.text}
          </Text>
          <Text style={headerTextStyle}>
            Sent by:{' '}
            {posts.originalPost.issuedFrom.firstName +
              ' ' +
              posts.originalPost.issuedFrom.lastName}
          </Text>
          <Text style={headerTextStyle}>
            Completed by: {posts.originalPost.posts.length} people
          </Text>
        </View>
      </Container>
      <Container>
        <Image style={imageStyle} source={{ uri: responsePicture }} />
      </Container>
      <Container>
        <View style={headerTextStyle}>
          <Text style={headerTextStyle}>Your Response: {responseText}</Text>
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
        <SeeMoreButton
          onPress={() => {
            navigation.navigate('SeeCompletedPostDetail', {
              post: { posts },
            });
          }}
        >
          See More
        </SeeMoreButton>
      </Container>
    </TopContainer>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: `center`,
    // justifyContent: `center`,
    backgroundColor: '#FFFFFF',
  },
  thumbnailStyle: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  responsePictureStyle: {
    height: 250,
    width: 250,
  },
  responseContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 12,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Helvetica Neue',
  },
  imageStyle: {
    height: 200,
    flex: 1,
    width: null,
  },
};

export default withNavigation(CompletedPostDetail);
