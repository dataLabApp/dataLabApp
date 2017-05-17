// import storage from 'electron-json-storage'
import React from 'react'

var lock = new Auth0Lock('H_0BdQzChMQaVnTgE2iiV4vUpaHdWaYX', 'powerdata.auth0.com', {
        auth: {
          redirect: false,
          sso: false
        }
      });
var auth0 = new Auth0({ domain: 'powerdata.auth0.com', clientID: 'H_0BdQzChMQaVnTgE2iiV4vUpaHdWaYX'})


// ----------- Actions
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

// ----------- Action Creators

export const login = (profile, idToken) => ({
  type: LOGIN,
  owner: profile.email,
  profile,
  idToken
})

export const logout = () => ({
  type: LOGOUT
})


const initialState = {
  lock,
  auth0,
  idToken: null,
  owner: null,
  profile: null
}

export default function authReducer(state = initialState, action) {
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case LOGIN:
      nextState.owner = action.owner
      nextState.profile = action.profile
      nextState.idToken = action.idToken
      break
    case LOGOUT:
      nextState.owner = null
      nextState.profile = null
      nextState.idToken = null
      break
    default:
      return state
  }
  return nextState;
}


