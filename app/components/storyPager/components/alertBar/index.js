import React, { Component } from 'react'
import  {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
/* based on the solution found here for custom navbar:
https://github.com/exponentjs/ex-navigator/issues/6#issuecomment-186581820 */
// TODO: implement own version of this

import { connect } from 'react-redux'
import TopAlert from 'app/components/topAlert'
import FunText from './funText'
import Nav from './backBar'

const BACK_BAR_HEIGHT = 60
const SUGGESTION_HEIGHT = 70

var COMPONENT_NAMES = ['Title', 'LeftButton', 'RightButton'];
const TEXT_PADDING = 15
const CENTER_PADDING = 10


export class PagerAlert extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hide:true,
      alertHeight: 0,
      displayBubbleInfo: false
    }
    this._renderAlertContent = this._renderAlertContent.bind(this)
  }


  componentWillReceiveProps(nextProps) {
    // TODO: lol simplyify this?
    const bubbleToNone   = (this.props.bubbleOpen && this.props.backBarHidden) && !nextProps.bubbleOpen
    const bubbleToBubble = this.props.bubbleOpen && nextProps.bubbleOpen
    const noneToBubble   =  !this.props.bubbleOpen && nextProps.bubbleOpen

    const h = (!nextProps.bubbleOpen && nextProps.backBarHidden) ? 0 : (nextProps.bubbleOpen ? SUGGESTION_HEIGHT : BACK_BAR_HEIGHT)

    this.setState({
      hide: (nextProps.backBarHidden && !nextProps.bubbleOpen),
      alertHeight: h,
      displayBubbleInfo: bubbleToNone || bubbleToBubble || noneToBubble
    })
  }



  handleTextRef = (ref) => {
    this.textRef = ref
  }

  poop = () => {
    const componentRef = this.textRef
    const animationType = 'tada'
    componentRef.setNativeProps({
      style: {
        zIndex: 1,
      },
    });
    componentRef.animate(animationType, 200 ).then(() => {
      componentRef.setNativeProps({
        style: {
          zIndex: 0,
        },
      })
    })
  }


  _renderAlertContent(bubbleOpen) {
    return (bubbleOpen)
      ? <FunText text={this.props.suggestedText} />
      : <Nav onPress={this.props.onPress} title={this.props.titleText}/>
  }


  render() {
    return (
      <TopAlert height={this.state.alertHeight} >
        { this._renderAlertContent(this.state.displayBubbleInfo) }
      </TopAlert>
    )
  }
}


const mapStateToProps = (state) => ({
  backBarHidden: !state.components.storyPager.backBarEnabled,
  bubbleOpen: state.components.readingSuggestion.open,
  currentBubble: state.components.stBubbles.selectedBubble,
  suggestedText: state.components.readingSuggestion.text,
})

export default connect(mapStateToProps)(PagerAlert)

const styles = StyleSheet.create({
});
