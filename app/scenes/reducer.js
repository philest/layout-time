import { combineReducers } from 'redux'

import homePageReducer from './homePage/state'
import loginReducer		 from './login/state'

export default reducer = combineReducers({
	homePage: homePageReducer,
	login: loginReducer,
})
