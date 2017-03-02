// some really smart notes:
// https://github.com/reactjs/redux/issues/1171


import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { enableBatching }  from 'app/vendor/redux-batched-actions/lib'
import { autoRehydrate } from 'redux-persist'
import { createNavigationEnabledStore, NavigationReducer } from '@exponent/ex-navigation'

import componentsReducer       from 'app/components/reducer'
import scenesReducer           from 'app/scenes/reducer'
import dataReducer             from 'app/data/reducer'
import globalReducer           from './reducer'
// import { firebaseInfoReducer } from 'app/services/pushController'


const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
})

const rootReducer = combineReducers({
  global: globalReducer,
  components: componentsReducer,
  scenes: scenesReducer,
  data: dataReducer,
  navigation: NavigationReducer,
})


// Note: passing middleware as the last argument to createStore requires redux@>=3.1.0
const middlewares = []

if (__DEV__) {
  const createLogger = require('redux-logger')
  const logger = createLogger({
    collapsed: true,
  })
  middlewares.push(logger)
}

// NOTE: it might be important for redux saga to be last in chain...
// we were having a problem where the logger was saying incorrecto stuff.
// reference: https://redux-saga.github.io/redux-saga/docs/api/index.html#selectselector-args
const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)

const storeEnhancer  = compose(
  applyMiddleware(...middlewares),
  autoRehydrate(),
)

export default { ...createStoreWithNavigation(
  enableBatching(rootReducer), {}, storeEnhancer),
  runSaga: sagaMiddleware.run,
}
// export default {
//   ...createStoreWithNavigation(enableBatching(rootReducer), {}, storeEnhancer),
//   // runSaga: sagaMiddleware.run,
// }
