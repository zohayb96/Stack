import Expo from 'expo';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Button from './Button';
import Container from './Container';
import DropdownMenu from 'react-native-dropdown-menu';

console.disableYellowBox = true;

export default class Render extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    const postText = navigation.getParam('postText', 'none');
    const locationText = navigation.getParam('locationText', 'none');
    const customImage = navigation.getParam('sentImage', null);
    // let imageToUse = '';
    // if (customImage !== null) {
    //   imageToUse = customImage;
    // } else {
    //   imageToUse = '';
    // }

    return (
      <View style={{ flex: 1 }}>
        <Container>
          <Text>Post: {postText}</Text>
        </Container>
        <Container>
          <Text>Location: {locationText}</Text>
        </Container>
        <Container>
          <Button onPress={this.changeEmoji}>Happy</Button>
          <Button onPress={this.changeEmoji}>Love</Button>
          <Button onPress={this.changeEmoji}>Custom</Button>
          <Button onPress={this.changeEmoji}>Surprise</Button>
          <Button onPress={this.changeEmoji}>Angry</Button>
        </Container>
        <Expo.GLView
          style={{ flex: 1 }}
          onContextCreate={this._onGLContextCreate}
        />
      </View>
    );
  }
  _onGLContextCreate = async gl => {
    // Start AR session
    // Do graphics stuff here!
    var scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    // Rotation
    // Three JS
    // Box
    const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    // Sphere
    var SphereGeometry = new THREE.SphereGeometry(0.8, 32, 24);

    // Lighing
    const leftLight = new THREE.DirectionalLight(0xffffff, 0.5);
    const rightLight = new THREE.DirectionalLight(0xffffff, 0.5);
    const bottomLight = new THREE.DirectionalLight(0xffffff, 0.5);
    leftLight.position.set(-3, 5, 0).normalize();
    rightLight.position.set(3, 5, 0).normalize();
    bottomLight.position.set(0, -5, 0).normalize();
    // Ambient Lighting
    // var ambient = new THREE.AmbientLight(0x555555);
    // scene.add(ambient);

    // Add Lighting to Scene
    scene.add(leftLight);
    scene.add(rightLight);
    scene.add(bottomLight);
    // Background
    scene.background = new THREE.Color(0xffffff);
    // Define Material
    const material = new THREE.MeshPhongMaterial({
      color: '#003E74',
      transparent: true,
      opacity: 0.1,
    });
    const glassMaterial = new THREE.MeshBasicMaterial({
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('./../public/Glass.jpg')),
      }),
      transparent: true,
      opacity: 0.5,
    });

    // LOVE MATERIAL
    const loveMaterial = new THREE.MeshBasicMaterial({
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('../public/hearts.jpg')),
      }),
      transparent: true,
    });

    // Happy MATERIAL
    const happyMaterial = new THREE.MeshBasicMaterial({
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('../public/happy.jpg')),
      }),
      transparent: true,
    });

    // Smiling MATERIAL
    const loveEmojiMaterial = new THREE.MeshBasicMaterial({
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('../public/love.jpg')),
      }),
      transparent: true,
    });

    // surprised MATERIAL
    const surprisedMaterial = new THREE.MeshBasicMaterial({
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('../public/surprised.jpg')),
      }),
      transparent: true,
    });

    // textureLoader.crossOrigin =
    //   'https://i.forbesimg.com/media/lists/companies/coca-cola-european-partners_416x416.jpg';

    const myUrl = '';
    // TextureLoader
    var loader = new THREE.TextureLoader();
    var myTexture = loader.load(myUrl);
    var customMaterial = new THREE.MeshBasicMaterial({ map: myTexture });

    // Defined Object
    //
    const cube = new THREE.Mesh(cubeGeometry, surprisedMaterial);
    cube.name = 'cube';
    var sphere = new THREE.Mesh(SphereGeometry, surprisedMaterial);

    // Add Object To Scene (Render it)
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.02;
      cube.rotation.y += 0.02;
      //
      sphere.rotation.x += 0.02;
      sphere.rotation.y += 0.02;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();
  };
}

const { height, width } = Dimensions.get('window');

const styles = {};
