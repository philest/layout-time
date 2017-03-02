import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import * as Animatable from 'react-native-animatable'

import STChat from './chat'

// TODO i think this whole file is redudant
export default class MessagesContainer extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.floatingContainer}>
          <Text style={styles.loadingText}>LOADING</Text>
        </View>
        <Animatable.View animation="fadeIn" delay={350} style={{ flex: 1 }}>
          <STChat {...this.props} />
        </Animatable.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: null,
    height: 40,
  },
  loadingText: {
    fontWeight: 'bold',
  },
})
