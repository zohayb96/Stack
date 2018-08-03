import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.loginButtonStyle}
      onPress={() => navigation.navigate(`LoginForm`)}
    >
      <Text>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.signUpButtonStyle}
      onPress={() => navigation.navigate(`SignUp`)}
    >
      <Text>Sign Up</Text>
    </TouchableOpacity>
    <Text style={styles.rightsText}>All Rights Reserved</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: '#2d3d54',
  },
  textStyle: {
    color: 'white',
    fontSize: 24,
    justifyContent: 'flex-start',
  },
  rightsText: {
    color: 'white',
    fontSize: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  loginButtonStyle: {
    backgroundColor: '#009a9a',
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    width: 200,
    height: 50,
    alignItems: `center`,
    justifyContent: `center`,
  },
  thumbnailStyle: {
    height: 300,
    width: 300,
  },
  signUpButtonStyle: {
    // alignSelf: 'stretch',
    backgroundColor: '#009a9a',
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    width: 200,
    height: 50,
    alignItems: `center`,
    justifyContent: `center`,
  },
});

export default Home;
