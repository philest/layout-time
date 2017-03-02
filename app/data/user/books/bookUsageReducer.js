// action types
export const ITEM_MARK_READ                  = 'data/user/books/ITEM_MARK_READ'
export const ITEM_REVEAL                     = 'data/user/books/ITEM_REVEAL'
// export const ITEM_UPDATE_LAST_TIME_OPENED    = 'data/user/books/ITEM_UPDATE_LAST_TIME_READ'
export const RESET_LIBRARY                   = 'data/user/books/RESET_LIBRARY'

// action generators
export const resetLibrary = () => ({
  type: RESET_LIBRARY,
})

export const itemMarkRead = (awsKey, locale) => ({
  type: ITEM_MARK_READ,
  time: Date.now(),
  awsKey,
  locale,
})

export const itemReveal = (awsKey, time = 0, locale) => ({
  type: ITEM_REVEAL,
  awsKey,
  time: time || Date.now(),
  locale,
})

// export const itemUpdateLastTimeRead = (index) => ({
//   type: ITEM_UPDATE_LAST_TIME_OPENED,
//   time: 0,
//   index
// })

const booksDefault = {
  es: {
    rocket: {
      timeRevealedAt: 0,
      timeFirstOpened: 0,
      timeLastRead: 0,
      numTimesRead: 0,
    },
    seed: {
      timeRevealedAt: 0,
      timeFirstOpened: 0,
      timeLastRead: 0,
      numTimesRead: 0,
    },
    bird: {
      timeRevealedAt: 0,
      timeFirstOpened: 0,
      timeLastRead: 0,
      numTimesRead: 0,
    },
  },
  en: {
    rocket: {
      timeRevealedAt: 0,
      timeFirstOpened: 0,
      timeLastRead: 0,
      numTimesRead: 0,
    },
    seed: {
      timeRevealedAt: 0,
      timeFirstOpened: 0,
      timeLastRead: 0,
      numTimesRead: 0,
    },
    cook: {
      timeRevealedAt: 0,
      timeFirstOpened: 0,
      timeLastRead: 0,
      numTimesRead: 0,
    },
  },
}



const itemHelper = (state, action) => {
  switch (action.type) {
    case ITEM_REVEAL:
      const bookKey = action.awsKey
      const updatedBookUsageInfo = Object.assign(
        {},
        state[bookKey],
        { timeRevealedAt: action.time },
      )
      const updateBooksList = Object.assign({}, state, { [bookKey]: updatedBookUsageInfo })
      return updateBooksList
    default:
      return state
  } // END switch...
} // END const bookListItem...


// reducer
const bookUsageReducer = (state = booksDefault, action) => {
  switch (action.type) {
    case ITEM_REVEAL:
      const localeBookList = state[action.locale]
      return Object.assign(
        {},
        state,
        { [action.locale]: itemHelper(localeBookList, action) },
      )
    case 'CLEAR_STORAGE':
      return booksDefault
    // case ITEM_MARK_READ:
    // if (!state[action.index].timeFirstRead) {
    //   return [
    //     ...state.slice(0,action.index),
    //     bookListItem(state[action.index], action),
    //     ...state.slice(action.index+1)
    //   ]
    // }
    // return state
    default:
      return state
  } // END switch
} // END const bookList

export default bookUsageReducer
