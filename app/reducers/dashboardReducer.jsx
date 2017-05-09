
// ----------- Actions
const ADD_DASHBOARD = 'ADD_DASHBOARD'
const DELETE_DASHBOARD = 'DELETE_DASHBOARD'
const ADD_CARD_TO_DASHBOARD = 'ADD_CARD_TO_DASHBOARD'
const DELETE_CARD_FROM_DASHBOARD = 'DELETE_CARD_FROM_DASHBOARD'
const UDPATE_DASHBOARD_CARD = 'UPDATE_DASHBOARD_CARD'

// ----------- Action Creators
export const addDashboard = (dashboardTitle) => ({
  type: ADD_DASHBOARD,
  dashboardTitle
})

export const deleteDashboard = (dashboardTitle) => ({
  type: DELETE_DASHBOARD,
  dashboardTitle
})

export const addCardToDashboard = (dashboardTitle, cardTitle, card) => ({
  type: ADD_CARD_TO_DASHBOARD,
  dashboardTitle,
  cardTitle,
  card
})

export const updateDashboardCard = (dashboardTitle, cardTitle, card) => ({
  type: UDPATE_DASHBOARD_CARD,
  dashboardTitle,
  cardTitle,
  card
})

// ----------- Reducer
const initialState = {
  seedDashboard : {exampleCardTitle:{position:{top:1,left:2},chart:window.explorerFauxNode}}
}

export default function dashboardReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case ADD_DASHBOARD:
    nextState[action.dashboardTitle] = {}
    break
  case DELETE_DASHBOARD:
    delete nextState[action.dashboardTitle]
    break
  case ADD_CARD_TO_DASHBOARD:
    nextState[action.dashboardTitle][action.cardTitle] = action.card
    break
  case UDPATE_DASHBOARD_CARD:
    nextState[action.dashboardTitle][action.cardTitle] = Object.assign(nextState[action.dashboardTitle][action.cardTitle],action.card)
    break
  case DELETE_CARD_FROM_DASHBOARD:
    delete nextState[action.dashboardTitle][action.cardTitle]
    break

  default:
    return state
  }
  return nextState
}
