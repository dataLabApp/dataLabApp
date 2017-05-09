import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import userReducer from './userReducer'
import cardReducer from './cardReducer'

// {data,user,cards}

const rootReducer = combineReducers({
  data: dataReducer,
  user: userReducer,
  cards: cardReducer
})

export default rootReducer
