// Required libraries
import axios from 'axios'
const firebase = require('firebase/app')

// ----------- Actions
const SET_USERS = 'SET_USERS'

// ----------- Action Creators
export const setAllUsers = (users) => ({
  type: SET_USERS,
  users
})

// ----------- Reducer
const initialState = {
  allUsers: {}
}

export default function userReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case SET_USERS:
    nextState.allUsers = action.users
    break

  default:
    return state
  }
  return nextState
}

// -----------Dispatchers

export const fetchUsers = () => (dispatch) => {
  firebase.database().ref('users').once('value')
    .then(usersObject => setAllUsers(usersObject))
    .catch(console.error)
}
