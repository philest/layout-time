export const SET_FORM_VALUE = 'scenes/login/SET_FORM_VALUE'
export const SUBMIT_SIGNUP_FORM = 'scenes/login/SUBMIT_SIGNUP_FORM'
export const SHOW_LOGIN_SYNC_MODDAL = 'scenes/login/SHOW_LOGIN_SYNC_MODDAL'
export const SHOW_COVER           = 'scenes/login/SHOW_COVER'

export const SET_PASSWORD         = 'scenes/login/SET_PASSWORD'
export const FORGOT_PASSWORD_PRESSED = 'scenes/login/FORGOT_PASSWORD_PRESSED'
export const SET_RANDOM_CODE      = 'scenes/login/SET_RANDOM_CODE'

export const showLoginSyncModal = (show) => ({
  type: SHOW_LOGIN_SYNC_MODDAL,
  show,
})

export const showCover = (show) => ({
  type: SHOW_COVER,
  show,
})

export const setFormValue = (key, value) => ({
  type: SET_FORM_VALUE,
  key,
  value,
})

export const submitSignupForm = (formValues) => ({
  type: SUBMIT_SIGNUP_FORM,
  formValues,
})

export function setPassword(password) {
  return {
    type: SET_PASSWORD,
    password,
  }
}

const initialState = {
  showSyncModal: false, // ehh this lives above root stack. maybe control this state elsewhere? TODO
  showCover: false,
  form: {
    username: '',
    usernameType: 'unclear',
    password: '',
    literalName: '',
    role: '',
    classCode: '',
  },
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case SET_FORM_VALUE: {
      const form = { ...state.form, [action.key]: action.value }
      return { ...state, form }
    }

    case SHOW_LOGIN_SYNC_MODDAL: {
      return { ...state, showSyncModal: action.show }
    }

    case SHOW_COVER: {
      return { ...state, showCover: action.show }
    }

    case SUBMIT_SIGNUP_FORM: {
      return state
    }

    case 'CLEAR_STORAGE': {
      return initialState
    }

    default: return state;
  }
}
