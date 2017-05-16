import storage from 'electron-json-storage'
import React from 'react'

var lock = new Auth0Lock('H_0BdQzChMQaVnTgE2iiV4vUpaHdWaYX', 'powerdata.auth0.com', {
        auth: {
          redirect: false,
          sso: false
        }
      });
var auth0 = new Auth0({ domain : 'powerdata.auth0.com', clientID: 'H_0BdQzChMQaVnTgE2iiV4vUpaHdWaYX'})


// ----------- Actions
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

// ----------- Action Creators

export const login = (profile) => ({
  type: LOGIN,
  owner: profile.email,
  profile: profile
})

export const logout = () => ({
  type: LOGOUT,
  owner: null,
  profile: null
})

const initialState = {
    lock,
    auth0,
    owner: null,
    profile: null
  }

export default function authReducer(state = initialState, action) {
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case LOGIN:
      nextState.owner = action.owner,
      nextState.profile = action.profile
      break
    case LOGOUT:
      nextState.owner = action.owner
      nextState.profile = action.profile
      break
  default:
    return state
  }
  return nextState;
}