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
} from 'react-native';
import axios from 'axios';
import { createBottomTabNavigator, TabBarBottom } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { ImagePicker, Permissions } from 'expo';
import Home from './Home';
import Button from './Button';
import TopContainer from './TopContainer';
import Container from './Container';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      challenges: [],
      user: {},
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      picture: '',
      password: '',
    };
  }
  render() {
    let { picture } = this.state;
    console.log(this.state);

    return (
      <View style={styles.container}>
        <Container>
          <View style={styles.container}>
            <Container>
              <Text style={styles.headerTextStyle}>Name</Text>
            </Container>
            <View>
              <Image
                style={styles.thumbnailStyle}
                source={{
                  uri:
                    'https://financialtribune.com/sites/default/files/placeholder.png',
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.pickImage}
              >
                <Text style={styles.buttonTextStyle}>Edit Pic</Text>
              </TouchableOpacity>
            </View>
            <Container>
              <TextInput
                name="username"
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                placeholder="Username"
                style={styles.textStyle}
              />
            </Container>
            <Container>
              <TextInput
                name="password"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                secureTextEntry={true}
                placeholder="Password"
                style={styles.textStyle}
              />
            </Container>
            <Container>
              <TextInput
                name="firstName"
                value={this.state.firstName}
                onChangeText={firstName => this.setState({ firstName })}
                placeholder="First Name"
                style={styles.textStyle}
              />
            </Container>
            <Container>
              <TextInput
                name="lastName"
                value={this.state.lastName}
                onChangeText={lastName => this.setState({ lastName })}
                placeholder="Last Name"
                style={styles.textStyle}
              />
            </Container>
            <Container>
              <TextInput
                name="email"
                value={this.state.email}
                onChangeText={challengeText => this.setState({ email })}
                placeholder="Email"
                style={styles.textStyle}
              />
            </Container>
            <Container>
              <Button onPress={this.handleSubmit}>Sign Up</Button>
            </Container>
          </View>
        </Container>
      </View>
    );
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ picture: result.uri });
    }
    console.log(this.state);
  };
}

const styles = {
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },
  textStyle: {
    height: 30,
    width: '100%',
    flex: 2,
    fontSize: 14,
  },
  thumbnailStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
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

export default SignUp;
