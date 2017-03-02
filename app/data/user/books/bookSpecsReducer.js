import { REHYDRATE } from 'redux-persist/constants'
// action types
export const BOOK_SPECS_GET_REQUEST = 'data/user/books/BOOK_SPECS_GET_REQUEST'
export const BOOK_SPECS_GET_SUCCESS = 'data/user/books/BOOK_SPECS_GET_SUCCESS'
export const BOOK_SPECS_GET_ERROR   = 'data/user/books/BOOK_SPECS_GET_ERROR'



// action generators
export const bookSpecsGetRequest = () => ({
  type: BOOK_SPECS_GET_REQUEST,
})

export const bookSpecsGetSuccess = (payload, time = Date.now()) => ({
  type: BOOK_SPECS_GET_SUCCESS,
  payload,
  time,
})

export const bookSpecsGetError = (errorMessage, time = Date.now()) => ({
  type: BOOK_SPECS_GET_ERROR,
  time,
  errorMessage,
})

// load defaults
const curriculumDefault     = require('./data/curriculum.json')
const bookListArraysDefault = require('./data/fullBookList.json')

const defaultSpecs = {
  isGetting: false,
  timeLastUpdated: 0,
  // version: 0, todo: uhhh should i do this?
  error: {
    type: null,
    time: 0,
    message: null,
  },
  bookList: bookListArraysDefault,
  curriculum: curriculumDefault,
  schedule: [
    {
      storyNumber: 5,
      schedule: [0, 0, 0, 1, 0, 0, 0],
    },
    {
      storyNumber: 10000,
      schedule: [0, 0, 0, 0, 0, 0, 0],
    },
  ],
}

// reducer
export default bookSpecsReducer = (state = defaultSpecs, action) => {
  switch (action.type) {
    case BOOK_SPECS_GET_REQUEST:
      return { ...state,
        isGetting: true,
      }

    case BOOK_SPECS_GET_ERROR:
      return { ...state,
        isGetting: false,
        error: {
          type: action.type,
          time: action.time,
          message: action.errorMessage,
        },
      }

    case BOOK_SPECS_GET_SUCCESS:
      if (!action.payload || !action.payload.freshInfo) { // case where server doesn't send new info
        return state
      }
      const s = { ...state,
        timeLastUpdated: action.time,
        version: action.payload.lastUpdate,
        bookList: {
          en: Object.assign(state.bookList.en, action.payload.specs.en),
          es: Object.assign(state.bookList.es, action.payload.specs.es),
        },
        curriculum: Object.assign(state.curriculum, action.payload.curriculum),
        schedule: Object.assign(state.schedule, action.payload.schedule),
      }
      return s
    case REHYDRATE:
      const incoming = action.payload
      if (incoming && incoming.data && incoming.data.user && incoming.data.user.books) {
        return { ...state, ...incoming.data.user.books.specs  }
      }
      return state
    default:
      return state
  }
}
