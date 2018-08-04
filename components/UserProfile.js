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
import CreatedPostDetail from './CreatedPostDetail';
import CompletedPostDetail from './CompletedPostDetail';
import { withNavigation } from 'react-navigation';

class UserProfile extends Component {
  state = {
    user: [],
    createdOriginalPosts: [],
    completedPosts: [],
  };

  static navigationOptions = {
    title: 'Profile',
  };

  async componentWillMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const userData = await axios.get(
      `http://172.16.26.75:1337/api/users/${user.id}`
    );
    const createdOriginalPostsData = await axios.get(
      `http://172.16.26.75:1337/api/Oposts/${user.id}`
    );
    const completedPostsData = await axios.get(
      `http://172.16.26.75:1337/api/posts/completed/${user.id}`
    );
    this.setState({
      user: userData.data,
      createdOriginalPosts: createdOriginalPostsData.data,
      completedPosts: completedPostsData.data,
    });
  }

  renderCreated() {
    if (this.state.createdOriginalPosts !== null) {
      return this.state.createdOriginalPosts.map(createdPost => (
        <CreatedPostDetail key={createdPost.id} posts={createdPost} />
      ));
    }
    console.log('pressed');
  }

  renderCompleted() {
    return this.state.completedPosts.map(completedPost => (
      <CompletedPostDetail key={completedPost.id} posts={completedPost} />
    ));
  }

  render() {
    console.log('createdOriginalPosts: ', this.state.createdOriginalPosts);
    const { navigate } = this.props.navigation;
    const {
      firstName,
      lastName,
      username,
      email,
      picture,
      image,
      url,
    } = this.state.user;
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <Container>
          <View style={styles.thumbnailContainerStyle}>
            <Image style={styles.thumbnailStyle} source={{ uri: picture }} />
            <Container>
              <Text style={styles.headerTextStyle}>
                {firstName + ' ' + lastName}
              </Text>
            </Container>
          </View>
        </Container>
        <SegmentedControlIOS
          values={['Created', 'Completed']}
          selectedIndex={0}
          tintColor={'#2d3d54'}
          selectedIndex={this.state.selectedIndex}
          onChange={event => {
            this.setState({
              selectedIndex: event.nativeEvent.selectedSegmentIndex,
            });
          }}
          marginTop={5}
          marginBottom={5}
        />
        {this.state.selectedIndex === 0 ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {this.renderCreated()}
          </ScrollView>
        ) : this.state.selectedIndex === 1 ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {this.renderCompleted()}
          </ScrollView>
        ) : // <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        //   {this.renderPending()}
        // </ScrollView>
        null}
      </View>
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

export default withNavigation(UserProfile);
