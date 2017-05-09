import { combineReducers } from 'redux'
import data from './dataReducer'
import user from './userReducer'
import cards from './cardReducer'
import dashboard from './dashboardReducer'

const rootReducer = combineReducers({
  data,
  user,
  cards,
  dashboard
})

export default rootReducer
