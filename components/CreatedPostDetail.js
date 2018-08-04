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
import Button from './Button';
import SeeMoreButton from './SeeMoreButton';

const CreatedPostDetail = ({ posts, navigation }) => {
  const { text, rating, picture } = posts;
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

  return (
    <TopContainer>
      <Container>
        <View style={thumbnailContainerStyle}>
          <Image style={thumbnailStyle} source={{ uri: picture }} />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>Post: {text}</Text>
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
          <Text style={headerTextStyle}>
            Accepted by: {posts.posts.length} friends
          </Text>
          <SeeMoreButton
            onPress={() => {
              navigation.navigate('SeeCreatedPostDetail', {
                originalPost: { posts },
              });
            }}
          >
            See More
          </SeeMoreButton>
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

export default withNavigation(CreatedPostDetail);
