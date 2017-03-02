import { REHYDRATE } from 'redux-persist/constants'

export const MESSAGE_GET_REQUEST = 'data/user/chat/MESSAGE_GET_REQUEST'
export const MESSAGE_GET_SUCCESS = 'data/user/chat/MESSAGE_GET_SUCCESS'
export const MESSAGE_GET_ERROR   = 'data/user/chat/MESSAGE_GET_ERROR'
export const USER_SEND_MESSAGE   = 'data/user/chat/USER_SEND_MESSAGE'
export const ADD_MESSAGES        = 'data/user/chat/ADD_MESSAGES'



export const userSendMessage = (message, time = Date.now()) => ({
  type: USER_SEND_MESSAGE,
  message,
  time,
})

// action generators
export const messageGetRequest = () => ({
  type: MESSAGE_GET_REQUEST,
})

export const messageGetSuccess = (messages, isStory = false, time = Date.now()) => ({
  type: MESSAGE_GET_SUCCESS,
  time,
  messages,
  isStory,
})

export const messageGetError = (errorMessage = 'MESSAGE GET FAIL', time = Date.now()) => ({
  type: MESSAGE_GET_ERROR,
  time,
  errorMessage,
})


export const defaultChat = {
  isGetting: false,
  error: {
    time: 0,
    message: '',
  },
  timeLastMessageReceived: 0,
  timeLastStoryMessageReceived: Date.now() -  8640000, // 24 hrs ago
  history: { en: [], es: [] },
}


// reducer
export default chatReducer = (state = defaultChat, action) => {
  switch (action.type) {

    case MESSAGE_GET_REQUEST:
      return {  ...state, isGetting: true }

    case MESSAGE_GET_ERROR:
      return {
        ...state,
        isGetting: false,
        error: {
          time: action.time,
          message: action.message,
        },
      }

    case REHYDRATE:
      var incoming = action.payload
      console.log(incoming)
      if (incoming && incoming.data && incoming.data.user ) {
        if (incoming.data.user.chat) return {...state, ...incoming.data.user.chat }
      }
      return state
    // case MESSAGE_GET_SUCCESS:
    //   see '../state.js' for the ;-)

    case 'CLEAR_STORAGE':
      return defaultChat
    default:
      return state
  }
}
