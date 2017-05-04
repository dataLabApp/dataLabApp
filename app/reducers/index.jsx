import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  data: dataReducer,
  user: userReducer
})

export default rootReducer
