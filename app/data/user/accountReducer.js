// @flow
import uuid from 'react-native-uuid'

import { Platform } from 'react-native'
import { REHYDRATE } from 'redux-persist/constants'
  

// helper
// import { updateObject, updateItemInArray } from 'app/reducerUtils'

// actions types
// note: in this document, POST and GET represent the HTTP verbs
export const USER_GET_ALL_DATA_REQUEST = 'data/user/account/USER_GET_ALL_DATA_REQUEST'
export const USER_GET_ALL_DATA_SUCCESS = 'data/user/account/USER_GET_ALL_DATA_SUCCESS'
export const USER_GET_ALL_DATA_ERROR   = 'data/user/account/USER_GET_ALL_DATA_ERROR'

export const USER_POST_ALL_DATA_REQUEST = 'data/user/account/USER_POST_ALL_DATA_REQUEST'
export const USER_POST_ALL_DATA_SUCCESS = 'data/user/account/USER_POST_ALL_DATA_SUCCESS'
export const USER_POST_ALL_DATA_ERROR   = 'data/user/account/USER_POST_ALL_DATA_ERROR'

export const INCREMENT_STORY_NUMBER     = 'data/user/account/INCREMENT_STORY_NUMBER'

export const USER_EXISTS_REQUESTING = 'data/user/account/USER_EXISTS_REQUESTING'

export const SET_DBUUID = 'data/user/account/SET_DBUUID'

export const setUserExistsRequesting = (isGetting) => ({
  type: USER_EXISTS_REQUESTING,
  isGetting,
})


// action generators
export const userGetAllDataRequest = () => ({
  type: USER_GET_ALL_DATA_REQUEST,
})

export const userGetAllDataSuccess = (payload = {}, time = Date.now()) => ({
  type: USER_GET_ALL_DATA_SUCCESS,
  time,
  payload,
})

export const userGetAllDataError = (errorMessage = 'USERGETALL FAIL', time = Date.now()) => ({
  type: USER_GET_ALL_DATA_ERROR,
  time,
  errorMessage,
})

export const userPostAllDataRequest = () => ({
  type: USER_POST_ALL_DATA_REQUEST,
})

export const userPostAllDataSuccess = (payload = {}, time = Date.now()) => ({
  type: USER_POST_ALL_DATA_SUCCESS,
  time,
  payload,
})
export const userPostAllDataError = (errorMessage = 'USERPOSTALL FAIL', time = Date.now()) => ({
  type: USER_POST_ALL_DATA_ERROR,
  time,
  errorMessage,
})

export const incrementStoryNumber = (time = Date.now()) => ({
  type: INCREMENT_STORY_NUMBER,
  time,
})

export const setDBUUID = (dbuuid) => ({
  type: SET_DBUUID,
  dbuuid,
})


// construct default state
const defaultAccountItems = {
  anonuuid: uuid.v4(),
  classCode: '',
  dbuuid: null,
  email: '',
  fullName: '',
  firstName: '',
  lastName: '',
  locale: 'en',
  mostRecentStoryOpened: 0,
  phoneNumber: null,
  receiptTime: 18, // 6 PM
  schoolName: '',
  storyNumber: 40,
  // storyNumber: 40,
  teacherName: '',
  teacherId: null,
  timeLastStoryOpened: 0,
  timezone: ((new Date()).getTimezoneOffset() / 60) - 1,
  userRole: '',
}



export const defaultAccount = {
  lastFetchSuccess: {
    time: 0,
    type: null,
  },
  platform: Platform.OS,
  isGetting: false,
  isPosting: false,
  error: {
    type: null,
    time: 0,
    message: '',
  },
  items: defaultAccountItems,
}

const handleSuccess = (state, action, httpVerb) => {
  if (action.time < state.lastFetchSuccess.time) {
    return state
  }

  const successInfo = {
    time: action.time,
    type: httpVerb,
  }

  const items = {
    classCode: action.payload.class_code,
    dbuuid: action.payload.dbuuid,
    email: action.payload.email,
    firstName: action.payload.first_name,
    lastName: action.payload.last_name,
    phoneNumber: action.payload.phone_number,
    schoolName: action.payload.school_signature,
    storyNumber: action.payload.story_number,
    teacherName: action.payload.teacher_signature, // TODO: not teacherName, should be teacherSig
    teacherId: action.payload.teacher_id,
    userRole: action.payload.role,
  }

  const newState = Object.assign({},
    state,
    (httpVerb === 'GET') ? { isGetting: false } : { isPutting: false },
    { lastFetchSuccess: successInfo },
    (httpVerb === 'GET') ? { items: { ...state.items, ...items } } : {},
  )
  return newState
}


// reducer
export default userReducer = (state = defaultAccount, action) => {
  switch (action.type) {
    case USER_GET_ALL_DATA_REQUEST:
      return { ...state,
        isGetting: true,
      }

    case USER_EXISTS_REQUESTING:
      return {
        ...state,
        isGetting: action.isGetting,
      }

    case USER_GET_ALL_DATA_ERROR:
      return { ...state,
        isGetting: false,
        error: {
          type: action.type,
          time: action.time,
          message: action.errorMessage,
        },
      }
    case USER_POST_ALL_DATA_ERROR:
      return { ...state,
        isPosting: false,
        error: {
          type: action.type,
          time: action.time,
          message: action.errorMessage,
          visible: action.visible,
        },
      }

    case USER_GET_ALL_DATA_SUCCESS:
      return handleSuccess(state, action, 'GET')

    case USER_POST_ALL_DATA_SUCCESS:
      return handleSuccess(state, action, 'POST')

    case SET_DBUUID:
      return {
        ...state,
        items: {
          ...state.items,
          dbuuid: action.dbuuid,
        },
      }
    case INCREMENT_STORY_NUMBER:
      return {
        ...state,
        items: {
          ...state.items,
          storyNumber: state.items.storyNumber + 1,
        },
      }

    case REHYDRATE:
      const incoming = action.payload
      if (incoming && incoming.data && incoming.data.user && incoming.data.user.account) {
        const items = { ...state.items,  ...incoming.data.user.account.items }
        return { ...state, items }
      }
      return state

    // todo: write unit test here to test that uuid gets changed!!!
    case 'CLEAR_STORAGE':
      const freshItems = defaultAccountItems
      return { ...defaultAccount, items: { ...freshItems, anonuuid: uuid.v4() } }

    default:
      return state
  }
}
