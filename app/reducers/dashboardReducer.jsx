
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

const initialState = [dashboard1]


export default function dashboardReducer(state = initialState, action) {
  let nextState = Object.assign({}, state)

  switch (action.type) {
  case ADD_DASHBOARD:
    let newDash = {title: action.dashboardTitle, cards:[]}
    nextState=nextState.concat([newDash])
    break
  case DELETE_DASHBOARD:
    nextState=nextState.filter(dashboard=>dashboard.title!==action.dashboardTitle)
    break
  case ADD_CARD_TO_DASHBOARD:
  {
    let [thisDashboard] = nextState.filter(dashboard=>dashboard.title===action.dashboardTitle)
    thisDashboard.cards = thisDashboard.cards.concat(action.card)
    break
  }
  case UDPATE_DASHBOARD_CARD:
  {
    let [thisDashboard] = nextState.filter(dashboard=>dashboard.title===action.dashboardTitle)
    let [thisCard] = thisDashboard.cards.filter(card=>card.title===action.card.title)
    thisCard = Object.assign({},thisCard, action.card)
    break
  }
  case DELETE_CARD_FROM_DASHBOARD:
  {
    let [thisDashboard] = nextState.filter(dashboard=>dashboard.title===action.dashboardTitle)
    thisDashboard.cards = thisDashboard.cards.filter(card=>card.title!==action.cardTitle)
    break
  }
  default:
    return state
  }
  return nextState
}
