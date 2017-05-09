import { combineReducers } from 'redux'
import data from './dataReducer'
import user from './userReducer'
import cards from './cardReducer'
import dashboards from './dashboardReducer'

const rootReducer = combineReducers({
  data,
  user,
  cards,
  dashboards
})

export default rootReducer
