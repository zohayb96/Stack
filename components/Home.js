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
    <Image
      style={styles.thumbnailStyle}
      source={require('../public/inizio.png')}
    />
    <TouchableOpacity
      style={styles.loginButtonStyle}
      onPress={() => navigation.navigate(`LoginForm`)}
    >
      <Text style={styles.textStyle}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.signUpButtonStyle}
      onPress={() => navigation.navigate(`SignUp`)}
    >
      <Text style={styles.textStyle}>Sign Up</Text>
    </TouchableOpacity>
    <Text style={styles.rightsText}>All Rights Reserved</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: '#03396c',
  },
  textStyle: {
    color: 'black',
    fontSize: 20,
    justifyContent: 'flex-start',
  },
  rightsText: {
    color: 'white',
    fontSize: 10,
    justifyContent: 'center',
    marginTop: 15,
  },
  loginButtonStyle: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    width: 175,
    height: 40,
    alignItems: `center`,
    justifyContent: `center`,
  },
  thumbnailStyle: {
    height: 300,
    width: 300,
  },
  signUpButtonStyle: {
    // alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    width: 175,
    height: 40,
    alignItems: `center`,
    justifyContent: `center`,
  },
});

export default Home;
