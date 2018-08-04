import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';

class SinglePost extends Component {
  state = {};

  render() {
    const { navigation } = this.props;
    const post = navigation.getParam('post');
    console.log('post: ', post);

    return (
      <View>
        <Text>Hello world</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },
});

export default SinglePost;
