import { combineReducers }                  from 'redux'
import reduceReducers                       from 'reduce-reducers'
import accountReducer                       from './accountReducer'
import booksReducer                         from './booksReducer'
import chatReducer, { MESSAGE_GET_SUCCESS } from './chatReducer'


export {
  MESSAGE_GET_REQUEST,
  MESSAGE_GET_SUCCESS,
  MESSAGE_GET_ERROR,
  ADD_MESSAGES,
  USER_SEND_MESSAGE,
  userSendMessage,
  messageGetRequest,
  messageGetSuccess,
  messageGetError,
} from './chatReducer'

export {
  USER_GET_ALL_DATA_REQUEST,
  USER_GET_ALL_DATA_SUCCESS,
  USER_POST_ALL_DATA_SUCCESS,
  SET_DBUUID,
  setDBUUID,
  setUserExistsRequesting,
  userGetAllDataRequest,
  userGetAllDataSuccess,
  userGetAllDataError,
  userPostAllDataRequest,
  userPostAllDataSuccess,
  userPostAllDataError,
  incrementStoryNumber,
} from './accountReducer'



export {
  BOOK_SPECS_GET_REQUEST,
  BOOK_SPECS_GET_SUCCESS,
  BOOK_SPECS_GET_ERROR,
  ITEM_MARK_READ,
  ITEM_REVEAL,
  RESET_LIBRARY,
  itemMarkRead,
  itemReveal,
  bookSpecsGetRequest,
  bookSpecsGetSuccess,
  bookSpecsGetError,
} from './booksReducer'



const correctStoryNumber = (messages, numBooks, booksTable) => (
  messages.map(m => {
    if (m.newStory + 1) {
      return ({ ...m, newStory: booksTable[m.newStory % numBooks] })
    }
    return m
  })
)


const parseMessages = (msgs, parent, teacher, school) => {
  function parseText(m) {
    return m.replace(/__APP__/g, 'StoryTime')
    .replace(/__TEACHER__/g, teacher || 'Ms. Stobierski')
    .replace(/__PARENT__/g, parent || 'StoryTime parent')
    .replace(/__SCHOOL__/g, school || 'School')
  }

  function parseHelper(marr) {
    return marr.map(m => ({
      _id: parseInt(m._id, 10),
      createdAt: m.createdAt,
      text: m.text ? parseText(m.text) : '',
      user: {
        _id: m.user._id,
        name: (m.user.name ? parseText(m.user.name) : null),
      },
      newStory: m.newStory,
    }))
  }

  const parsed = {
    en: parseHelper(msgs['en']),
    es: parseHelper(msgs['es']),
  }

  return parsed
}


const handleSuccess = (state, action) => {
  if (!(action.messages.en.length || action.messages.es.length)) {
    return state.chat
  }

  const lastStoryTime = state.chat.timeLastStoryMessageReceived
  // TODO: add condition if was user :)
  const parsed = parseMessages(
    action.messages,
    state.account.items.firstName,
    state.account.items.teacherName,
    state.account.items.schoolName,
  )
  const newHistory = {
    en: correctStoryNumber(parsed.en, state.books.specs.curriculum.en.length, state.books.specs.curriculum.en)
      .concat(state.chat.history.en),
    es: correctStoryNumber(parsed.es, state.books.specs.curriculum.es.length, state.books.specs.curriculum.en)
      .concat(state.chat.history.es),
  }

  function getTime(m, now) {
    return m.en[0] ? m.en[0].createdAt || now : now
  }

  return {
    isGetting: false,
    timeLastStoryMessageReceived: action.isStory ? getTime(newHistory, Date.now()) : lastStoryTime,
    timeLastMessageReceived: action.time,
    history: newHistory,
  }
}


export default userReducer = reduceReducers(
  combineReducers({
    account: accountReducer,
    chat: chatReducer,
    books: booksReducer,
  }),
  (state, action) => {
    switch (action.type) {
      case MESSAGE_GET_SUCCESS:
        return {
          ...state,
          chat: handleSuccess(state, action),
        }
      default:
        return state
    }
  },
)

