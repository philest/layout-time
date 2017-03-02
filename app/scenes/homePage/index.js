import React, { Component } from 'react';
import {
  View,
  AppState,
} from 'react-native'

import { connect } from 'react-redux'


import { StackNavigation } from '@exponent/ex-navigation'

import Router from 'app/router'

import { ST_ORANGE } from 'app/constants'


import InfoModal from './scenes/InfoModal'

@connect()
export default class HomePageStack extends Component {

  constructor() {
    super()
    this.state = {
      currentAppState: AppState.currentState,
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (currentAppState) => {
    this.setState({ currentAppState })
    if (currentAppState === 'active') {
      this.props.dispatch({ type: 'START_SYNCER' })
    }
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <StackNavigation
          ref={stack => { this.stack = stack }}
          navigatorUID="homePage"
          initialRoute={Router.getRoute('home')}
          defaultRouteConfig={{
            navigationBar: {
              backgroundColor: ST_ORANGE,
              tintColor: '#000',
              height: 55,
            },
          }}
        />
        <InfoModal />
      </View>
    )
  }
}
