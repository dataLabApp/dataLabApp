import { combineReducers } from 'redux'
import data from './dataReducer'
import user from './userReducer'
import cards from './cardReducer'
import dashboards from './dashboardReducer'
import auth from './auth'

const rootReducer = combineReducers({
  data,
  user,
  cards,
  dashboards,
  auth
})

export default rootReducer
