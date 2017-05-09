
// ----------- Actions
const ADD_DASHBOARD = 'ADD_DASHBOARD'
const DELETE_DASHBOARD = 'DELETE_DASHBOARD'
const ADD_CARD_TO_DASHBOARD = 'ADD_CARD_TO_DASHBOARD'
const DELETE_CARD_FROM_DASHBOARD = 'DELETE_CARD_FROM_DASHBOARD'
const UDPATE_DASHBOARD_CARD = 'UPDATE_DASHBOARD_CARD'
const CHANGE_DASHBOARD_TITLE = 'CHANGE_DASHBOARD_TITLE'
const CHANGE_DASHBOARD_CARD_TITLE = 'CHANGE_DASHBOARD_CARD_TITLE'
const SET_CURRENT_DASHBOARD = 'SET_CURRENT_DASHBOARD'

// ----------- Action Creators
export const addDashboard = (dashboardTitle) => ({
  type: ADD_DASHBOARD,
  dashboardTitle
})
export const setCurrentDashboard = (dashboardTitle) => ({
  type: SET_CURRENT_DASHBOARD,
  dashboardTitle
})
export const deleteDashboard = (dashboardTitle) => ({
  type: DELETE_DASHBOARD,
  dashboardTitle
})

export const addCardToDashboard = (dashboardTitle, card) => ({
  type: ADD_CARD_TO_DASHBOARD,
  dashboardTitle,
  card
})

export const updateDashboardCard = (dashboardTitle, card) => ({
  type: UDPATE_DASHBOARD_CARD,
  dashboardTitle,
  card
})

export const deleteCardFromDashboard = (dashboardTitle, cardTitle) => ({
  type: DELETE_CARD_FROM_DASHBOARD,
  dashboardTitle,
  cardTitle
})

export const changeDashboardCardTitle = (dashboardTitle, oldCardTitle, newCardTitle) => ({
  type: CHANGE_DASHBOARD_CARD_TITLE,
  dashboardTitle,
  oldCardTitle,
  newCardTitle
})

export const changeDashboardTitle = (oldDashboardTitle, newDashboardTitle) => ({
  type: CHANGE_DASHBOARD_TITLE,
  oldDashboardTitle,
  newDashboardTitle
})

// ----------- Reducer
const dashboard1 = {
  title:'dashboard1',
  cards:[{
    title: 'Sample Card',
    i: 'a',
    x: 2,
    y: 1,
    w: 3,
    h: 3,
    chart: undefined
  }]
}

const initialState = {
  currentDashboard: dashboard1,
  dashboards: [dashboard1]
}

export default function dashboardReducer(state = initialState, action) {
  let nextState = Object.assign({}, state)

  switch (action.type) {
  case ADD_DASHBOARD:
    let newDash = {title: action.dashboardTitle, cards:[]}
    nextState.dashboards=nextState.dashboards.concat([newDash])
    break
  case DELETE_DASHBOARD:
    nextState.dashboards=nextState.dashboards.filter(dashboard=>dashboard.title!==action.dashboardTitle)
    break
  case SET_CURRENT_DASHBOARD:
    [nextState.currentDashboard]=nextState.dashboards.filter(dashboard=>dashboard.title===action.dashboardTitle)
    break
  case ADD_CARD_TO_DASHBOARD:
  {
    let [thisDashboard] = nextState.dashboards.filter(dashboard=>dashboard.title===action.dashboardTitle)
    thisDashboard.cards = thisDashboard.cards.concat(action.card)
    break
  }
  case UDPATE_DASHBOARD_CARD:
  {
    let [thisDashboard] = nextState.dashboards.filter(dashboard=>dashboard.title===action.dashboardTitle)
    let [thisCard] = thisDashboard.cards.filter(card=>card.title===action.card.title)
    thisCard = Object.assign({},thisCard, action.card)
    break
  }
  case DELETE_CARD_FROM_DASHBOARD:
  {
    let [thisDashboard] = nextState.dashboards.filter(dashboard=>dashboard.title===action.dashboardTitle)
    thisDashboard.cards = thisDashboard.cards.filter(card=>card.title!==action.cardTitle)
    break
  }
  case CHANGE_DASHBOARD_CARD_TITLE:
  {
    let [thisDashboard] = nextState.dashboards.filter(dashboard=>dashboard.title===action.dashboardTitle)
    let [thisCard] = thisDashboard.cards.filter(card=>card.title===action.oldCardTitle)
    thisCard.title = action.newCardTitle
  }
  case CHANGE_DASHBOARD_TITLE:
  {
    let [thisDashboard] = nextState.dashboards.filter(dashboard=>dashboard.title===action.oldDashboardTitle)
    thisDashboard.title = action.newDashboardTitle
  }
  default:
    return state
  }
  return nextState
}
