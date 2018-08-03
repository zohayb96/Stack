import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import UserDetail from './UserDetail';
import {
  createBottomTabNavigator,
  TabBarBottom,
  StackNavigator,
} from 'react-navigation';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import UserProfile from './UserProfile';
import MapHome from './MapHome';

class AllUsers extends Component {
  state = {
    users: [],
    user: {},
  };

  async componentWillMount() {}

  renderUsers() {
    return this.state.users.map(user => <User key={user.id} user={user} />);
  }

  render() {
    console.log(this.state);
    return <ScrollView>{this.renderUsers()}</ScrollView>;
  }
}

// export const rootStack = StackNavigator({
//   IndividualUser: { screen: IndividualUser },
// });

export default createBottomTabNavigator(
  {
    Friends: { screen: AllUsers },
    Profile: { screen: UserProfile },
    MapHome: {
      screen: MapHome,
    },
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
        } else if (routeName === 'MapHome') {
          iconName = `ios-contacts${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  }
);
