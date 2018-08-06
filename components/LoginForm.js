import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ImagePickerIOS,
  Alert,
} from 'react-native';
import store, { getMe } from './../app/store';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { createBottomTabNavigator, TabBarBottom } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { ImagePicker, Permissions } from 'expo';
import Home from './Home';
import Button from './Button';
import Container from './Container';
import TopContainer from './TopContainer';
import login from '../app/store';
import { withNavigation } from 'react-navigation';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(evt) {
    try {
      const response = await axios.put(`http://10.2.6.34:1337/api/auth/login`, {
        username: this.state.username,
        password: this.state.password,
      });
      this.setState({ user: response.data });
      this.props.navigation.navigate('AllUsers', { user: this.state.user });
    } catch (error) {
      console.log(error);
      Alert.alert('Login Failed!');
    }
  }

  render() {
    console.log('state: ', this.state);
    return (
      <View style={styles.container}>
        <Image
          style={styles.thumbnailStyle}
          source={require('../public/inizio.png')}
        />
        <Container>
          <View style={styles.container}>
            <Container>
              <TextInput
                name="username"
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                placeholder="Username"
                style={styles.textStyle}
                autoCapitalize="none"
              />
            </Container>
            <Container>
              <TextInput
                name="password"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                style={styles.textStyle}
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </Container>
            <Container>
              <Button onPress={this.handleSubmit}>Log In</Button>
            </Container>
          </View>
        </Container>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      const user = this.state.username;
      const password = this.state.password;
      dispatch(login({ username, password })).then(() => {
        console.log('Success');
      });
    },
  };
};

const styles = {
  container: {
    flex: 1,
    alignItems: `center`,
    // justifyContent: `center`,
    backgroundColor: '#03396c',
  },
  textStyle: {
    height: 30,
    width: '100%',
    flex: 2,
    fontSize: 14,
  },
  thumbnailStyle: {
    height: 200,
    width: 200,
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    // marginLeft: 10,
    // marginRight: 10,
  },
  buttonStyle: {
    height: 20,
    width: 80,
    alignSelf: 'stretch',
    borderRadius: 5,
    backgroundColor: '#2d3d54',
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

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
