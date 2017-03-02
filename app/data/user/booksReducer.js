import { combineReducers } from 'redux'

import bookUsageReducer  from './books/bookUsageReducer'

import bookSpecsReducer from './books/bookSpecsReducer'

export {
  itemMarkRead,
  itemReveal,
} from './books/bookUsageReducer'


export {
  bookSpecsGetRequest,
  bookSpecsGetSuccess,
  bookSpecsGetError,
} from './books/bookSpecsReducer'


export default combineReducers({
  usage: bookUsageReducer,
  specs: bookSpecsReducer,
})
