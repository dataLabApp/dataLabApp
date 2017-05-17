// Required libraries
import axios from 'axios'
// const firebase = require('firebase/app')

// ----------- Actions
const SET_USERS = 'SET_USERS'

// ----------- Action Creators
export const setAllUsers = (users) => ({
  type: SET_USERS,
  users
})

// ----------- Reducer
const initialState = {
  allUsers: []
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
  let tempArray = []
  firebase.database().ref('users').once('value')
    .then(snapshot => {
      snapshot.forEach(x => {
        var childData = x.val()
        let name
        if (childData.username) name=childData.username
        else name=childData.nickname
        tempArray.push(
          {
            username: childData.nickname,
            name: childData.name,
            email: childData.email,
          }
        )
      })
      console.log(tempArray)
    })
    .then(() => dispatch(setAllUsers(tempArray)))
    .catch(console.error)
}
