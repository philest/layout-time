import React, { Component } from 'react'
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native'

const COVER_WIDTH = 160

const VIEW_HEIGHT = 220

export default class CustomView extends Component {
  shouldPad = (previousMessage, currentMessage) => {
    return (previousMessage.user._id === currentMessage.user._id)
  }

  // only show 'touch here' if message is the last one in sequence of 'new stories'
  shouldShowTouchText = (currentMessage, nextMessage) => {
    if (Object.keys(nextMessage).length === 0) {
      return true
    }
    if (currentMessage.user._id === nextMessage.user._id) {
      return false
    }
    return true
  }


  renderImage = () => (
    <TouchableOpacity onPress={this.props.onPress}>
      <Image style={styles.image} source={this.props.imageSrc} />
      {/*<STBookCover style={styles.image} source={this.props.imageSrc} />*/}
    </TouchableOpacity>
  )

  renderTapToRead = (isLastNewStory) => {
    // if enabled, this will display tap to read on last one
    // if (!isLastNewStory)  {
    //   return null
    // }
    return (
      <TouchableOpacity
        style={[styles.textWrap, { left: 55 / this.props.touchText.length }]}
        onPress={this.props.onPress}
      >
        <Text style={[styles.tapRead]}> {this.props.touchText} </Text>
      </TouchableOpacity>
    )
  }


  render() {
    const padBoolean = this.shouldPad(this.props.previousMessage, this.props.currentMessage)
    const isLastNewStory  = this.shouldShowTouchText(this.props.currentMessage, this.props.nextMessage)
    return (
      // <View style={[styles.container, { height: (isLastNewStory ?  VIEW_HEIGHT : VIEW_HEIGHT - 20) }]}>
      <View style={[styles.container, { height: VIEW_HEIGHT }]}>
        <View style={[styles.imgWrapper,   { paddingLeft: (isLastNewStory ? 50 : 10) }]}>{/*idk why this is necesarry*/}
          <View style={styles.imageTransform}>
            { this.renderImage() }
          </View>
          { this.renderTapToRead(isLastNewStory) }
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: VIEW_HEIGHT,
    // paddingLeft: 30,
    paddingTop: 10,
  },
  imgWrapper: {
    flex: 1,
    marginLeft: 20,
    // paddingLeft: 20,
    paddingRight: 20,
    marginTop: 7,
    // marginBottom: 12,
    alignItems: 'center',
  },
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
  tapRead: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  textWrap: {
    flex: 1,
    top: 10,
  },
  image: {
    width: COVER_WIDTH,
    height: COVER_WIDTH,
    resizeMode: 'contain',
  },
  imageTransform: {
    transform: [{ rotateZ: '-5deg' }],
  },
});

CustomView.defaultProps = {
  currentMessage: {},
  containerStyle: {},
};

CustomView.propTypes = {
  currentMessage: React.PropTypes.object,
  containerStyle: View.propTypes.style,
};
