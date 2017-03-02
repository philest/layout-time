import { REHYDRATE } from 'redux-persist/constants'

export const ALLOW_PUSH = 'global/ALLOW_PUSH'
export const DISABLE_PUSH = 'global/DISABLE_PUSH'
export const SET_LOCALE  = 'global/SET_LOCALE'
export const SET_NEXT_LOCALE  = 'global/SET_NEXT_LOCALE'
export const APP_BOOTED = 'global/APP_BOOTED'
export const APP_REHYDRATED = 'global/APP_REHYDRATED'
export const SET_LOGGED_IN = 'global/SET_LOGGED_IN'
export const SET_IS_FIRST_TIME_OPENING_APP = 'global/SET_IS_FIRST_TIME_OPENING_APP'
export const NOTIFY_ADMINS = 'global/NOTIFY_ADMINS'


export const notifyAdmins = (event, payload = {}) => ({
  type: NOTIFY_ADMINS,
  event,
  payload,
})

export const allowRoutePush = () => ({
  type: ALLOW_PUSH,
})

export const disablePush = () => ({
  type: DISABLE_PUSH,
})

// TODO: migrate this to user locale
export const setLocale = (loc) => ({
  type: SET_LOCALE,
  loc,
})

export const setNextLocale = (loc) => ({
  type: SET_NEXT_LOCALE,
  loc,
})

export const setGlobalHeight = (height, keyboardUp = false) => ({
  type: 'SET_GLOBAL_HEIGHT',
  height,
  keyboardUp,
})

export const setAppBooted = () => ({
  type: APP_BOOTED,
})

export const setLoggedIn = (loggedIn) => ({
  type: SET_LOGGED_IN,
  loggedIn,
})

export const setIsFirstTimeOpeningApp = (opened) => ({
  type: SET_IS_FIRST_TIME_OPENING_APP,
  opened,
})



const initialState = {
  pushesEnabled: true,
  locale: 'en',
  nextLocale: '',
  height: 0, // height of main view, as is affected by keyboard
  keyboardUp: false,
  appBooted: false,
  appRehydrated: false,
  loggedIn: false,
  isFirstTimeOpeningApp: true,
}

export default globalReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ALLOW_PUSH:
      return { ...state, pushesEnabled: true }
    case SET_LOGGED_IN:
      return { ...state, loggedIn: action.loggedIn }
    case DISABLE_PUSH:
      return { ...state, pushesEnabled: true }
    case SET_LOCALE:
      return { ...state, locale: action.loc }
    case SET_NEXT_LOCALE:
      return { ...state, nextLocale: action.loc }
    case 'SET_GLOBAL_HEIGHT':
      return { ...state, height: action.height, keyboardUp: action.keyboardUp }
    case APP_BOOTED:
      return { ...state, appBooted: true }
    case SET_IS_FIRST_TIME_OPENING_APP:
      return { ...state, isFirstTimeOpeningApp: action.opened }
    case NOTIFY_ADMINS:
      return state
    case 'CLEAR_STORAGE':
      return { ...state, isFirstTimeOpeningApp: true, pushesEnabled: true }
    case APP_REHYDRATED:
      return { ...state, appRehydrated: true }
    case REHYDRATE:
      var incoming = action.payload
      if (incoming && incoming.locale) return { ...initialState, locale: incoming.locale, uuid: incoming.uuid }
      return initialState
    default: return state
  }
}
