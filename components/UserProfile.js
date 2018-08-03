import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  SegmentedControlIOS,
  Button,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { createBottomTabNavigator, TabBarBottom } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import TopContainer from './TopContainer';
import Container from './Container';
import { createStackNavigator } from 'react-navigation';

class UserProfile extends Component {
  state = {
    users: [],
  };

  static navigationOptions = {
    title: 'Profile',
  };

  async componentWillMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    console.log(this.state);
  }

  render() {
    console.log(this.props);
    const { navigate } = this.props.navigation;
    const {
      firstName,
      lastName,
      username,
      email,
      picture,
      image,
      url,
    } = this.state.users;
    return (
      <TopContainer>
        <Container>
          <Text>Welcome {firstName}</Text>
        </Container>
      </TopContainer>
    );
  }
}

const styles = {
  thumbnailStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // marginLeft: 10,
    // marginRight: 10,
  },
  headerTextStyle: {
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 14,
    width: '100%',
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: '#2d3d54',
    fontFamily: 'Helvetica Neue',
  },
  buttonStyle: {
    height: 20,
    width: 80,
    alignSelf: 'stretch',
    borderRadius: 5,
    backgroundColor: '#009a9a',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  buttonTextStyle: {
    fontSize: 15,
    width: '100%',
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Helvetica Neue',
  },
};

export default UserProfile;
