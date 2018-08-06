import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import TopContainer from './TopContainer';
import Container from './Container';

const UserDetail = ({ user }) => {
  const { firstName, lastName, username, email, picture, image, url } = user;
  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    imageStyle,
  } = styles;

  return (
    <TopContainer>
      <Container>
        <View style={thumbnailContainerStyle}>
          <Image style={thumbnailStyle} source={{ uri: picture }} />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{firstName + ' ' + lastName}</Text>
          <Text>{username}</Text>
        </View>
      </Container>
    </TopContainer>
  );
};

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
    height: 300,
    flex: 1,
    width: null,
  },
};

export default UserDetail;
