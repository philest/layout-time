import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TouchableWithoutFeedback
} from 'react-native'
// import Image from 'react-native-image-progress'
import { connect } from 'react-redux'

// components
import CanvasAwareBubble from '../canvasBubble'

// actions
import { hideBackBar, showBackBar } from '../../state'
import { closeDrawer } from 'app/components/readingSuggestion/state'
import { setSelectedBubble } from 'app/components/st-bubbles/state'
import { hideBackBarAndUnselectBubble } from 'app/composedActions'

import { Spinner } from 'native-base'
let { wheight, wwidth } = Dimensions.get('window') // TODO: arggg what do about this

export class StoryPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      imgDims: {
        x: 0,  y: 0,
      },
      containerDims: {
        x: 0, y: 0,
      },
      bubbles: {},
    }

    this._toggleNav = this._toggleNav.bind(this)
    this._renderBubbles = this._renderBubbles.bind(this)
    this._setImgContainerDims = this._setImgContainerDims.bind(this)
  }

  _setImgContainerDims(e) {
    this.setState({
      containerDims: {
        x: e.nativeEvent.layout.width,
        y: e.nativeEvent.layout.height,
      },
    })
  }

  _renderBubbles(bubbles, pageIndex) {
    if (!bubbles) return null
    return bubbles.map((b, i) => {
      const key = `${pageIndex}${i}bbl`
      return (<CanvasAwareBubble
        key={key}
        imgDims={this.state.imgDims}
        containerDims={this.state.containerDims}
        xPos={b.x} yPos={b.y}
        textArray={b.textArray}
        ang={b.ang}
        disabledPress={this._toggleNav.bind(this)}
      />)
    })
  }


  _toggleNav() {
    if (this.props.backBarHidden) {
      if (!this.props.currentBubble) {
        this.props.dispatch(showBackBar())
      } else {
        this.props.dispatch(setSelectedBubble(null))
      }
      this.props.dispatch(closeDrawer())
      return
    }
    this.props.dispatch(hideBackBarAndUnselectBubble())
  }

  componentDidMount() {
    // Image.getSize(this.props.imageSource.uri, (width, height) => {
    this.setState({ imgDims: { x: 320, y: 480 } })
    // })
  }

  render() {
    p = this.props.pageInfo

    const Touch = (Platform.OS == 'android') ? TouchableWithoutFeedback : TouchableWithoutFeedback
    return (
      <View  style={styles.container} >
        {/*<Spinner color='white' style={{position:'absolute', top:20, left:20}}/> */}
        <Touch style={{ flex: 1 }} onPress={this._toggleNav} onLayout={this._setImgContainerDims}>
          <Image
            source={this.props.imageSource}
            style={[styles.img, { width: wwidth, height: wheight }]}
            threshold={200}
            // indicatorProps = {{ size: 80, colorx: 'pink', style: { backgroundColor:'black' }}}
            // renderIndicator= { () => <Spinner color='white' type='Wave'/> }
          />
        </Touch>
        { this._renderBubbles(p.bubbles, p.i) }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  backBarHidden: !state.components.storyPager.backBarEnabled,
  currentBubble: state.components.stBubbles.selectedBubble,
})

export default connect(mapStateToProps)(StoryPage)

const styles = StyleSheet.create({
  img: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    height: wheight,
    width: wwidth,
    backgroundColor: 'black',
  },
})
