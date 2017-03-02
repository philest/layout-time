// vendor components
import React, { Component } from 'react'
import { View, Keyboard, Platform, Dimensions, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import ExtraDimensions from 'react-native-extra-dimensions-android'

// one-off stuff for getting the app started
import SplashScreen from 'react-native-splash-screen'
import { setTranslation } from 'app/i18n/i18n'

// actions
import { allowRoutePush, setLocale, setNextLocale, setGlobalHeight } from 'app/reducer'

// components
import TransitionModal from './homePage/scenes/TransitionModal' // TODO: reorganize this...
import LoginStack from './login'
import HomePageStack from './homePage'

let { height: iosHeight, width: iosWidth } = Dimensions.get('window');


const getWindowHeight = () => {
  return Platform.OS  === 'android' ? ExtraDimensions.get('REAL_WINDOW_HEIGHT') : iosHeight
}

@connect(state => ({
  refreshTknExists: !!state.data.credentials.refresh.tkn,
  locale: state.global.locale,
  nextLocale: state.global.nextLocale,
  cover: state.scenes.login.showCover,
  account: state.data.user.account.items,
}))
export default class RootScene extends Component {

  constructor(props) {
    super(props)
    setTranslation(this.props.locale)
    this.state = {
      transition: false,
    }
  }


  componentDidMount() {
    this.props.dispatch(setGlobalHeight(getWindowHeight()))
    setTimeout(SplashScreen.hide, 1000)
  }

  componentWillReceiveProps(next) {
    const nL = next.nextLocale
    if (!!nL && !this.state.transition) {
      setTranslation(nL)
      this.setState({ transition: true })
    }
    if (!nL) {
      this.setState({ transition: false })
    }
  }



  renderPrimaryView = isLoggedIn => {
    return (
      <HomePageStack
        onTransitionEnd ={this._onTransitionEnd}
      />
    )
  }

  // this may be handy some day: https://github.com/exponentjs/ex-navigation/issues/73
  render()  {
    return (
      <View style={[styles.stackWrapper, { height: this.props.visibleHeight }]}>
        { this.renderPrimaryView(this.props.loggedIn) }
        <TransitionModal open={this.state.transition} onClose={ () => this.props.dispatch(setNextLocale(''))} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  stackWrapper: {
    flex: 1,
    alignSelf: 'stretch',
  },
})


