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

const CreatedPostDetail = ({ posts }) => {
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
          <Text style={headerTextStyle}>{text}</Text>
          <Text style={headerTextStyle}>{rating}</Text>
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

export default CreatedPostDetail;
