import { combineReducers } from 'redux'
import userReducer from './user/state'
import credentialsReducer from './credentials/state'
import forgotPasswordReducer from './forgotPassword/state'

export default combineReducers({
  user: userReducer,
  credentials: credentialsReducer,
  forgotPassword: forgotPasswordReducer,
})
