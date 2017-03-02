// @flow
import { REHYDRATE } from 'redux-persist/constants'


export const TKN_GET_REQUEST = 'data/credentials/TKN_GET_REQUEST'
export const TKN_GET_SUCCESS = 'data/credentials/TKN_GET_SUCCESS'
export const TKN_GET_ERROR   = 'data/credentials/TKN_GET_ERROR'


export const START_LOGIN_FLOW = 'data/credentials/START_LOGIN_FLOW'
export const LOGOUT = 'data/credentials/LOGOUT'
export const TRASH_TKNS = 'data/credentials/TRASH_TKNS'
export const LOGIN_SUCCESS   = 'data/credentials/LOGIN_SUCCESS'

export const UPDATE_FCM_TKN = 'data/credentials/UPDATE_FCM_TKN'

export const updateFCMTkn = (tkn, time = Date.now()) => ({
  type: UPDATE_FCM_TKN,
  payload: { time, tkn },
})

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
})

export const logout = (source = 'unspecified', force = false) => ({
  type: LOGOUT,
  payload: {
    source,
    force,
  },
})

export const trashTkns = () => ({
  type: TRASH_TKNS,
})

export const tknGetRequest = (tknType, credentials = {}) => ({
  type: TKN_GET_REQUEST,
  payload: {
    tknType,
    credentials,
  },
})

export const tknGetSuccess = (tkn, tknType, time = Date.now()) => ({
  type: TKN_GET_SUCCESS,
  payload: { tknType, tkn, time },
})

export const tknGetError = (message, tknType, time = Date.now()) => ({
  type: TKN_GET_ERROR,
  payload: { time, tknType, message },
})


export const startLoginFlow = (username, inputType) => ({
  type: START_LOGIN_FLOW,
  payload: {
    username,
    inputType,
  },
})



const defaultCredentials = {
  fetchInfo: {
    tknType: null,
    isGetting: false,
    error: {
      tknType: null,
      visible: false,
      time: 0,
      message: '',
    },
  },
  forgottenPassword: 'welp this is awkward',
  refresh: {
    tkn: null,
    time: 0,
  },
  access: {
    tkn: null,
    time: 0,
  },
  reset: {
    tkn: null,
    time: 0,
  },
  fcm: {
    tkn: null,
    time: 0,
  },
}

export const ACCESS = 'tkn/access'
export const REFRESH = 'tkn/refresh'
export const RESET   = 'tkn/reset'

const credentialsReducer = (state = defaultCredentials, action) => {
  const payload = action.payload
  switch (action.type) {
    case TRASH_TKNS:
      return {
        ...state,
        refresh: {
          tkn: null,
          time: 0,
        },
        access: {
          tkn: null,
          time: 0,
        },
        fcm: {
          tkn: null,
          time: 0,
        },
      }

    case UPDATE_FCM_TKN: {
      return { ...state, fcm: { tkn: action.payload.tkn, time: action.payload.time } }
    }

    case TKN_GET_REQUEST: {
      const fetchInfo = { ...state.fetchInfo, isGetting: true, tknType: payload }
      return { ...state, fetchInfo }
    }

    case TKN_GET_ERROR: {
      const err = {
        tknType: payload.tknType,
        time: payload.time,
        message: payload.message,
      }
      const fetchInfo = { ...state.fetchInfo, isGetting: false, error: err }
      return { ...state, fetchInfo }
    }

    case TKN_GET_SUCCESS: {
      const tknInfo = { time: payload.time, tkn: payload.tkn }
      const fetchInfo = { ...state.fetchInfo, isGetting: false }
      return Object.assign(
        {},
        state,
        { fetchInfo },
        (payload.tknType === REFRESH) ? { refresh: tknInfo } : { access: tknInfo },
      )
    }
    case REHYDRATE:
      var incoming = action.payload
      console.log(incoming)
      if (incoming && incoming.data) {
        if (incoming.data.credentials) return { ...state, ...incoming.data.credentials, forgottenPassword: defaultCredentials.forgottenPassword }
      }
      return state
    default:
      return state
  } // END switch
} // END const bookList

export default credentialsReducer
