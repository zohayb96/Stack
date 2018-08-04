import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import UserDetail from './UserDetail';
import {
  createBottomTabNavigator,
  TabBarBottom,
  StackNavigator,
} from 'react-navigation';
import fetchAllFriends from '../app/users';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import UserProfile from './UserProfile';
import AddToMap from './AddToMap';
import MapToView from './MapView';
import Settings from './Settings';

class AllUsers extends Component {
  state = {
    allFriends: [],
    user: {},
  };

  async componentWillMount() {
    const { navigation } = this.props;
    const userId = navigation.getParam('user');
    const response = await axios.get(
      `http://172.16.26.75:1337/api/users/friends/${userId.id}`
    );
    this.setState({
      allFriends: response.data,
      user: userId,
    });
    console.log(this.state);
  }

  renderUsers() {
    return this.state.allFriends.map(user => (
      <UserDetail key={user.id} user={user} />
    ));
  }

  render() {
    console.log(this.state);
    return <ScrollView>{this.renderUsers()}</ScrollView>;
  }
}

const mapStateToProps = state => {
  return {
    allFriends: state.user.allFriends,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAllFriends: () => {
    dispatch(fetchAllFriends());
  },
});

connect(
  mapStateToProps,
  mapDispatchToProps
)(AllUsers);

export default createBottomTabNavigator(
  {
    Friends: { screen: AllUsers },
    Map: { screen: MapToView },
    Add: { screen: AddToMap },
    Profile: { screen: UserProfile },
    Settings: { screen: Settings },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Profile') {
          iconName = `ios-contact${focused ? '' : '-outline'}`;
        } else if (routeName === 'Friends') {
          iconName = `ios-contacts${focused ? '' : '-outline'}`;
        } else if (routeName === 'Add') {
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Map') {
          iconName = `ios-map${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-settings${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  }
);
