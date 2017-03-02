
export const SMS_REQUEST_REQUEST = 'data/forgotPassword/SMS_REQUEST_REQUEST'
export const SMS_REQUEST_SUCCESS = 'data/forgotPassword/SMS_REQUEST_SUCCESS'
export const SMS_REQUEST_ERROR = 'data/forgotPassword/SMS_REQUEST_ERROR'


export const CODE_CHECK_REQUEST = 'data/forgotPassword/CODE_CHECK_REQUEST'
export const CODE_CHECK_SUCCESS = 'data/forgotPassword/CODE_CHECK_SUCCESS'
export const CODE_CHECK_ERROR = 'data/forgotPassword/CODE_CHECK_ERROR'


export const RESET_PASSWORD_REQUEST = 'data/forgotPassword/RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'data/forgotPassword/RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_ERROR = 'data/forgotPassword/RESET_PASSWORD_ERROR'

export const SET_PHONE = 'data/forgotPassword/SET_PHONE'

const defaultForgottenPassword = {
  isGetting: false,
  isReseting: false,
  phone: null,
  error: {
    time: 0,
    message: '',
    type: null,
  },
  refresh: {
    tkn: null,
    time: 0,
  },
  access: {
    tkn: null,
    time: 0,
  },
}

export const ACCESS = 'reset/access'
export const REFRESH = 'reset/refresh'
export const RESET = 'reset/actual_reset'


function tokenSuccess(type, tkn) {
  return {
    type,
    payload: {
      tkn,
      time: Date.now(),
    },
  }
}


function generalError(actionType, errorType, message) {
  return {
    type: actionType,
    payload: {
      type: errorType,
      time: Date.now(),
      message,
    },
  }
}

export function smsRequestSuccess(tkn) {
  return tokenSuccess(SMS_REQUEST_SUCCESS, tkn)
}

export function codeCheckSuccess(tkn) {
  return tokenSuccess(CODE_CHECK_SUCCESS, tkn)
}


export function smsRequestError(message = 'unspecified') {
  return generalError(SMS_REQUEST_ERROR, ACCESS, message)
}

export function codeCheckError(message = 'unspecified') {
  return generalError(SMS_REQUEST_ERROR, REFRESH, message)
}

export function resetPasswordError(message = 'unspecified') {
  return generalError(SMS_REQUEST_ERROR, RESET, message)
}

function extractError(state, payload) {
  return {
    ...state,
    isGetting: false,
    error: {
      time: payload.time,
      message: payload.error || 'unspecified',
      type: payload.type,
    },
  }
}

function extractToken(payload) {
  return {
    tkn: payload.tkn,
    time: payload.time,
  }
}

export default forgotPasswordReducer = (state = defaultForgottenPassword, action) => {

  switch (action.type) {

    case SET_PHONE: {
      return { ...state, phone: action.phone }
    }


    case SMS_REQUEST_REQUEST: {
      return { ...state, isGetting: true }
    }

    case CODE_CHECK_REQUEST: {
      return { ...state, isGetting: true }
    }

    case RESET_PASSWORD_REQUEST: {
      return { ...state, isGetting: true }
    }




    case SMS_REQUEST_ERROR: {
      return extractError(state, action.payload)
    }

    case CODE_CHECK_ERROR: {
      return extractError(state, action.payload)
    }

    case RESET_PASSWORD_ERROR: {
      return extractError(state, action.payload)
    }




    case SMS_REQUEST_SUCCESS: {
      return { ...state, isGetting: false, access: extractToken(action.payload) }
    }

    case CODE_CHECK_SUCCESS: {
      return { ...state, isGetting: false, refresh: extractToken(action.payload) }
    }

    case RESET_PASSWORD_SUCCESS: {
      return { ...state, isGetting: false }
    }

    default:
      return state
  } // END switch
} // END const bookList
