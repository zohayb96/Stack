import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Header from './components/Header';
import Home from './components/Home';
import SignUp from './components/SignUp';
import AllUsers from './components/AllUsers';
import Login from './components/Login';
import LoginForm from './components/LoginForm';
import { createStackNavigator } from 'react-navigation';
import ImagePicker from './components/ImagePicker';
import { Provider } from 'react-redux';
import { getMe } from './app/users';
import store from './app/store';
import axios from 'axios';
import MapHome from './components/MapHome';
import UserProfile from './components/UserProfile';
console.disableYellowBox = true;
import AddToMap from './components/AddToMap';
import MapToView from './components/MapView';
import Render from './components/Render';
import SinglePost from './components/SinglePost';
import CreatedPostDetail from './components/CreatedPostDetail';
import SeeCreatedPostDetail from './components/SeeCreatedPostDetail';
import SeeCompletedPostDetail from './components/SeeCompletedPostDetail';
import SeePendingPostDetail from './components/SeePendingPostDetail';
import ReviewPost from './components/ReviewPost';
import Settings from './components/Settings';
// import ARView from './components/ARView';

const RootNavigator = createStackNavigator(
  {
    Main: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: null,
        title: `Inizio`,
      }),
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: ({ navigation }) => ({
        title: `SignUp`,
      }),
    },
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        title: `Login`,
      }),
    },
    AllUsers: {
      screen: AllUsers,
      navigationOptions: ({ navigation }) => ({
        title: `INIZIO`,
        headerLeft: null,
      }),
    },
    LoginForm: {
      screen: LoginForm,
      navigationOptions: ({ navigation }) => ({
        title: `LoginForm`,
      }),
    },
    ImagePicker: {
      screen: ImagePicker,
      navigationOptions: ({ navigation }) => ({
        title: `ImagePicker`,
      }),
    },
    UserProfile: {
      screen: UserProfile,
      navigationOptions: ({ navigation }) => ({
        title: `Profile`,
        header: 'User Profile',
      }),
    },
    AddToMap: {
      screen: AddToMap,
      navigationOptions: ({ navigation }) => ({
        title: `AddToMap`,
      }),
    },
    MapToView: {
      screen: MapToView,
      navigationOptions: ({ navigation }) => ({
        title: `MapView`,
      }),
    },
    Render: {
      screen: Render,
      navigationOptions: ({ navigation }) => ({
        title: `Render`,
      }),
    },
    MapHome: {
      screen: MapHome,
      navigationOptions: ({ navigation }) => ({
        title: `MapHome`,
      }),
    },
    SinglePost: {
      screen: SinglePost,
      navigationOptions: ({ navigation }) => ({
        title: `SinglePost`,
      }),
    },
    SeeCreatedPostDetail: {
      screen: SeeCreatedPostDetail,
      navigationOptions: ({ navigation }) => ({
        title: `See More`,
      }),
    },
    SeeCompletedPostDetail: {
      screen: SeeCompletedPostDetail,
      navigationOptions: ({ navigation }) => ({
        title: `See More`,
      }),
    },
    SeePendingPostDetail: {
      screen: SeePendingPostDetail,
      navigationOptions: ({ navigation }) => ({
        title: `See More`,
      }),
    },
    CreatedPostDetail: {
      screen: CreatedPostDetail,
      navigationOptions: ({ navigation }) => ({
        title: `CreatedPostDetail`,
      }),
    },
    ReviewPost: {
      screen: ReviewPost,
      navigationOptions: ({ navigation }) => ({
        title: `Review`,
      }),
    },
    Settings: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
        title: `Settings`,
      }),
    },
  },
  {
    initialRouteName: `Main`,
  },
  {
    navigationOptions: {
      header: 'none',
    },
  }
);

export default class App extends React.Component {
  componentDidMount() {
    try {
      store.dispatch(getMe()).then(() => {
        console.log(this.state);
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
