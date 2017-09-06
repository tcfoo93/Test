/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Image } from 'react-native';

export default class Test extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Image source={pic} style={{width: 300, height: 150}}/>
      <Image source={pic} style={{width: 300, height: 150}}/>
    );
  }
}

AppRegistry.registerComponent('Test', () => Test);
