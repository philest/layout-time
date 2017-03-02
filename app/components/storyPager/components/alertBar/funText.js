import React, { Component } from 'react'
import  {
  Navigator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import * as Animatable from 'react-native-animatable';




export default class FunText extends Component {



  componentWillReceiveProps(nextProps) {
    if (this.props.text != nextProps.text) {
      this.poop()
    }
  }



  handleTextRef = (ref) => {
    this.textRef = ref
  }

  poop = () => {
    const componentRef = this.textRef
    const animationType = 'bounceIn'
    componentRef.setNativeProps({
      style: {
        zIndex: 1,
      },
    })
    componentRef.animate(animationType ).then(() => {
      componentRef.setNativeProps({
        style: {
          zIndex: 0,
    }})})
  }



  render() {
    return <View style={styles.suggestionContainer}>
      <Animatable.Text ref={ this.handleTextRef } onLayout={this.poop}  style={styles.suggestionText}> { this.props.text } </Animatable.Text>
    </View>
  }
}


const styles = StyleSheet.create({
  suggestionContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems:'center'
  },
  suggestionText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    fontFamily:'Karla-Regular'
  }
});
