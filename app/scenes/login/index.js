// vendor components
import React, { Component } from 'react'

// exnav stuff
import {
  NavigationStyles,
  StackNavigation,
} from '@exponent/ex-navigation'

import Router from 'app/router'

import SplashScreen from 'react-native-splash-screen'

import { ST_ORANGE } from 'app/constants'

// createPassword: () => CreatePassword,
// enterPassword: () => EnterPassword, // for logging back in
// pickRole: () => PickRole,
// inputName: () => InputName,
// inputCode: () => InputCode,
// doneScreen: () => DoneScreen,
// inviteTeacher: () => InviteTeacher,


const NAVIGATOR_NAME = 'login' // when __DEV__, don't change this probably
const INITIAL_ROUTE  = 'enterUsername'


export default class Login extends Component {

  static route = {
    styles: {
      ...NavigationStyles.Fade,
    },
    navigationBar: {
      visible: false, // hides the main navigator navbar
      backgroundColor: ST_ORANGE,
    },
  }

  componentDidMount() {
    SplashScreen.hide() // END transition ---------
  }

  render() {
    return (
      <StackNavigation
        navigatorUID={NAVIGATOR_NAME}
        initialRoute={Router.getRoute(INITIAL_ROUTE)}
        defaultRouteConfig={{
          navigationBar: {
            backgroundColor: ST_ORANGE,
            tintColor: '#000',
            height: 55,
          },
        }}
      />
    )
  }
}
