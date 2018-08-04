import React from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  ScrollView,
  SegmentedControlIOS,
} from 'react-native';
import TopContainer from './TopContainer';
import Container from './Container';

const CompletedPostDetail = ({ posts }) => {
  const { responseRating, responseText, responsePicture } = posts;
  console.log('props: ', posts);

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
  } = styles;

  return (
    <TopContainer>
      <Container>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>
            Original Post: {posts.originalPost.text}
          </Text>
          <Text style={headerTextStyle}>
            Sent by:{' '}
            {posts.originalPost.issuedFrom.firstName +
              '' +
              posts.originalPost.issuedFrom.lastName}
          </Text>
          <Container>
            <Image
              style={responsePictureStyle}
              source={{ uri: responsePicture }}
            />
          </Container>
          <Text style={headerTextStyle}>Your Response: {responseText}</Text>
          <Text style={headerTextStyle}>Your Rating: {responseRating}</Text>
        </View>
      </Container>
    </TopContainer>
  );
};

const styles = {
  thumbnailStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  responsePictureStyle: {
    height: 100,
    width: 100,
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
};

export default CompletedPostDetail;
