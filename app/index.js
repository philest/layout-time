import React, { Component } from 'react'
import { Provider, connect }        from 'react-redux'

import 'app/i18n/i18n' // TODO uhhh....

// import our lovely components
import Root                   from 'app/scenes'
// import Pu  shController from 'app/data/pushController'

// turn regular ol' redux store into an ex-navigaton-aware store
import { NavigationProvider, NavigationContext } from '@exponent/ex-navigation'
import Store from './createStore'
import Router from './router'

// import rootSaga from './sagas'

// Store.runSaga(rootSaga)

const navigationContext = new NavigationContext({
  router: Router,
  store: Store,
})

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>

        <Buffer />
      </Provider>
    )
  }
}


class Buffer extends Component {
  render() {
    return (
      <NavigationProvider context={navigationContext}>
        <Root />
      </NavigationProvider>
    )
  }
}
