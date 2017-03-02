import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'

// import reactMixin from 'react-mixin'
// import TimerMixin from 'react-timer-mixin';

import { NavigationActions } from '@exponent/ex-navigation'
import { NavigationStyles } from '@exponent/ex-navigation'


import ReaderModal from 'app/components/storyPager'

const ST_ORANGE  = '#ed7a44'
class ReaderContainer extends Component {
  static route = {
    styles: {
      ...NavigationStyles.Fade,
    },
    navigationBar: {
      visible: false,
      backgroundColor: ST_ORANGE
    },
  }

  constructor (props) {
    super(props)

  }


  render () {
    return <View style={{flex:1, backgroundColor:'black'}}>
        { this.props.enabled
          ? <ReaderModal backAction={()=>this.props.dispatch(NavigationActions.goBack())} />
          : null
        }

      {/* <StatusBar hidden={this.state.statusBarHide} /> */}
    </View>
  }
}

// the purpose of this timer is to ensure a smooth transition when hiding statusbar
// reactMixin( ReaderContainer.prototype, TimerMixin )
const mapStateToProps = (state) => ({
  enabled: state.global.pushesEnabled
})


export default connect(mapStateToProps)(ReaderContainer)
