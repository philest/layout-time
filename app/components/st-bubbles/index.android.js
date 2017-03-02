import React, { Component } from 'react'
import { View, StyleSheet, Text, LayoutAnimation, Animated, Platform, UIManager } from 'react-native'
import { connect } from 'react-redux'


if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}


import * as Animatable from 'react-native-animatable';
export const bounceOut = {
  0: {
    opacity: 1,
    scale: 1,
  },
  0.2: {
    scale: 0.9,
  },
  0.5: {
    opacity: 1,
    scale: 1.11,
  },
  0.55: {
    scale: 1.25,
  },
  1: {
    opacity: 0,
    scale: 1.35,
  },
};
const BUBBLE_DIAMETER = 47

export default class QuestionBubble extends Component {

  constructor (props) {
    super(props)
    this.isMe = this.isMe.bind(this)
  }

  poopOut = () => {
    this.viewRef.animate(bounceOut, 250)
  }

  isMe(selectedBubble) {
    return (selectedBubble===this)
  }

  handleViewRef = (ref) => {
    this.viewRef = ref
  }

  render () {
    const glowbump        = 15
    const bubbleDiameter     = this.props.bubbleDiameter || BUBBLE_DIAMETER
    const bubbleRadius    = bubbleDiameter/2                    // TODO add vert/horiz radius when needed
    const containerDiameter = bubbleDiameter*1.5
    const containerRadius = containerDiameter/2
    const glowDiameter = bubbleDiameter + glowbump

    glowAlpha = (this.isMe(this.props.selectedBubble)) ? `rgba(255,255,255,0.5)` : `rgba(255,255,255,0)`
    return (
      <Animatable.View ref={this.handleViewRef} transition={["width","height"]} style={[this.props.style, {width:containerDiameter, height:containerDiameter}]}>
      {/* // <TouchableWithoutFeedback style={{width:containerWidth, height:containerHeight}} onPress={()=>this.onPress(this.props.onPress)}> */}
        <Animatable.View transition={["width","height"]} style={[styles.glow, {backgroundColor: glowAlpha, borderRadius:containerRadius, width:glowDiameter, height:glowDiameter}]}>
        <Animatable.View transition={["width","height"]} style={[styles.shadow, {borderRadius:bubbleRadius, width:bubbleDiameter, height:bubbleDiameter}]} />
          <View transition={["width","height"]} style={[styles.bubble, {borderRadius:bubbleRadius, width:bubbleDiameter, height:bubbleDiameter, transform:[{rotateZ:this.props.ang||'20deg'}]}]}>
            <Text style={[styles.bubbleText, {fontSize:bubbleDiameter-15, paddingLeft:bubbleDiameter/4}]}>? </Text>
          </View>
        </Animatable.View>
        {/* </TouchableWithoutFeedback> */}
      </Animatable.View>
    )
  }
}


const styles = StyleSheet.create({
  container: {

  },
  glow: {
    justifyContent:'center'
  },
  shadow:{
    position:'absolute',
    left:6,
    bottom:4,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  bubble: {
    backgroundColor: '#ed7a44',
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bubbleText: {
    color:'white',
    fontFamily:'KGCorneroftheSky'
  }
})
