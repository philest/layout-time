import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback, Animated, Platform, UIManager, InteractionManager } from 'react-native'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}
import { connect } from 'react-redux'

import QuestionBubble from 'app/components/st-bubbles'
import { hideBackBarAndUnselectBubble } from 'app/composedActions'
import { setTextAndSelectBubble } from 'app/composedActions'


const GROWTH_SIZE = 4

const getScaledDims = (imgDims, containerDims) => {
    const scaleX = containerDims.x/imgDims.x
    const hX = imgDims.y*scaleX


    if (hX > containerDims.y) { return {
        scaledWidth: imgDims.x*containerDims.y/imgDims.y,
        scaledHeight: containerDims.y
      }
    }
    return {
      scaledWidth: containerDims.x,
      scaledHeight: hX
    }
}

import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'

@reactMixin.decorate(TimerMixin)
export  class CanvasBubble extends Component {

  constructor (props) {
    super(props)

    this.state = {
      textIndex:0,
      bubbleDiameter: this.props.bubbleDiameter || 47,
      bubble:null,
      enabled:true
    }

    this.setBubble = this.setBubble.bind(this)

  }

  setBubble(bubble) {
    this.bubble = bubble
  }

  onPressA = ()=> {
    const i = this.state.textIndex
    const newi = i+1
    const oldDiameter = this.state.bubbleDiameter


      if (!this.state.enabled) {
        this.props.disabledPress() // this shows the backbar if the bubble is popped
        return
      }

      if (newi > this.props.textArray.length) return;

      // TODO: we check this here and in st-bubbles...
      if (this.props.selectedBubble == this.bubble && (i+1 > this.props.textArray.length)) {
        this.props.dispatch(hideBackBarAndUnselectBubble())
        return
      }

      const text = this.props.textArray[i]

      this.props.dispatch(setTextAndSelectBubble(text, this.bubble))


    InteractionManager.runAfterInteractions(() => {
    this.setState({
      textIndex: newi,
      bubbleDiameter: oldDiameter+(GROWTH_SIZE*newi),
    })
    })

      if (newi >= this.props.textArray.length) {
        this.setState({
          textIndex: newi,
          enabled: false,
        })
        this.bubble.poopOut()
        return
      }

  }

  render () {

    const {x:containerX, y:containerY} = this.props.containerDims

    const {scaledWidth, scaledHeight} = getScaledDims(this.props.imgDims, this.props.containerDims)

    const xPos = scaledWidth  * this.props.xPos + (containerX - scaledWidth)/2
    const yPos = scaledHeight * this.props.yPos + (containerY - scaledHeight)/2

    const touchDiameter = this.state.bubbleDiameter*1.7
    const bump = Math.pow(GROWTH_SIZE,this.state.textIndex/4)*4

    if (scaledWidth && scaledHeight) {
      return <View style={[styles.canvasBubble, {top:yPos-bump, left:xPos-bump}]}>
          <QuestionBubble
            {...this.props}
            style={{paddingLeft:touchDiameter/8, paddingTop:touchDiameter/10}}
            bubbleDiameter={this.state.bubbleDiameter}
            text={this.props.text}
            ref={this.setBubble}
            // enabled={this.state.enabled}
            selectedBubble={this.props.selectedBubble}
            // onPress={this.onPressA}
          />
          <TouchableWithoutFeedback onPress={this.onPressA}>
              <View style={{position:'absolute',backgroundColor: 'rgba(0,0,0,0)', width:touchDiameter, height:touchDiameter}}/>
          </TouchableWithoutFeedback>
      </View>
    }
    return null
  }
}


const mapStateToProps = (state) => ({
  selectedBubble : state.components.stBubbles.selectedBubble
})

export default connect(mapStateToProps)(CanvasBubble)

const styles = StyleSheet.create({
  canvasBubble: {
    position: 'absolute',
  }
})
