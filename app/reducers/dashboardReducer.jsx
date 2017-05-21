import BubbleChart from '../components/BubbleChart'
import Chart from '../components/Chart'
import {DEFAULT_TEMPLATE} from '../constants'
import {storeChartGenerator} from '../utils/chartGenerators'

import BarChart from '../components/BarChart'
import React from 'react'
import storage from 'electron-json-storage'
// ----------- Actions
const ADD_DASHBOARD = 'ADD_DASHBOARD'
const DELETE_DASHBOARD = 'DELETE_DASHBOARD'
const ADD_CARD_TO_DASHBOARD = 'ADD_CARD_TO_DASHBOARD'
const DELETE_CARD_FROM_DASHBOARD = 'DELETE_CARD_FROM_DASHBOARD'
const UDPATE_DASHBOARD_CARD = 'UPDATE_DASHBOARD_CARD'
const UPDATE_DASHBOARD = 'UPDATE_DASHBOARD'
const SET_CURRENT_DASHBOARD = 'SET_CURRENT_DASHBOARD'
const UPDATE_DASHBOARD_LAYOUT = 'UPDATE_DASHBOARD_LAYOUT'
const LOAD_DASHBOARDS = 'LOAD_DASHBOARDS'

// ----------- Action Creators
export const addDashboard = (dashboardTitle) => ({
  type: ADD_DASHBOARD,
  dashboardTitle
})
export const setCurrentDashboard = (dashboardId) => ({
  type: SET_CURRENT_DASHBOARD,
  dashboardId
})
export const deleteDashboard = (dashboardId) => ({
  type: DELETE_DASHBOARD,
  dashboardId
})
// be sure to call this on a card that already exists in the card reducer
export const addCardToDashboard = (dashboardId, card) => ({
  type: ADD_CARD_TO_DASHBOARD,
  dashboardId,
  card
})

export const updateDashboardCard = (dashboardId, updatedCard) => ({
  type: UDPATE_DASHBOARD_CARD,
  dashboardId,
  updatedCard
})

export const deleteCardFromDashboard = (dashboardId, cardId) => ({
  type: DELETE_CARD_FROM_DASHBOARD,
  dashboardId,
  cardId
})

export const updateDashboard = (dashboard) => ({
  type: UPDATE_DASHBOARD,
  dashboard
})

export const updateDashboardLayout = (dashboardTitle, layout) => ({
  type: UPDATE_DASHBOARD_LAYOUT,
  dashboardTitle,
  layout
})
export const loadDashboards = (dashboards) => ({
  type: LOAD_DASHBOARDS,
  dashboards
})
// ----------- Reducer
const ProductLaunch = {
  id: 1,
  counter: 1,
  title: 'Product Launch',
  cards: []
}
const MonthlySales = {
  id: 2,
  counter: 2,
  title: 'Monthly Sales',
  cards: []
}
const gdpData = {
  id: 3,
  counter: 3,
  title: 'GDP Data',
  cards: [{title: 'GDP Data ', sliceId: 1, i: '1', w: 3, h: 3, x: 1, y: Infinity, chart: <BubbleChart />, rawCode: DEFAULT_TEMPLATE}]
}
const initialState = {
  dashboardCounter: 3,
  currentDashboard: ProductLaunch,
  dashboards: [ProductLaunch, MonthlySales]
}

export default function dashboardReducer(state = initialState, action) {
  let nextState = Object.assign({}, state)

  switch (action.type) {
  case ADD_DASHBOARD:
    const newDash = {counter: 1, id: ++nextState.dashboardCounter, title: action.dashboardTitle, cards: []}
    nextState.dashboards=nextState.dashboards.concat([newDash])
    break
  case DELETE_DASHBOARD:
    nextState.dashboards=nextState.dashboards.filter(dashboard => dashboard.id!==action.dashboardId)
    break
  case SET_CURRENT_DASHBOARD:
    const [selectedDash] = nextState.dashboards.filter(dashboard => dashboard.id===action.dashboardId)
    nextState = Object.assign(nextState, {currentDashboard: selectedDash})
    break
  case ADD_CARD_TO_DASHBOARD:
    {
      const [thisDashboard] = nextState.dashboards.filter(dashboard => dashboard.id===action.dashboardId)
      ++thisDashboard.counter // this mutates the old state
      const thisCard = Object.assign({title: 'DefaultCardTitle', i: ''+thisDashboard.counter, w: 6, h: 8, x: 1, y: Infinity, chart: null, rawCode: DEFAULT_TEMPLATE}, action.card)
      thisDashboard.cards = thisDashboard.cards.concat([thisCard])
      break
    }
  case UDPATE_DASHBOARD_CARD:
    {
      const [thisDashboard] = nextState.dashboards.filter(dashboard => dashboard.id===action.dashboardId)
      let [thisCard] = thisDashboard.cards.filter(card => card.id===action.cardId)
      thisCard = Object.assign({}, thisCard, action.card) // this mutates the old state
      break
    }
  case DELETE_CARD_FROM_DASHBOARD:
    {
      const [thisDashboard] = nextState.dashboards.filter(dashboard => dashboard.id===action.dashboardId)
      thisDashboard.cards = thisDashboard.cards.filter(card => card.id!==action.cardId)
      break
    }
  case UPDATE_DASHBOARD:
    {
      let [thisDashboard] = nextState.dashboards.filter(dashboard => dashboard.id===action.dashboard.id)
      thisDashboard = Object.assign({}, thisDashboard, action.dashboard) // this mutates state
      break
    }
  case UPDATE_DASHBOARD_LAYOUT:
    {
      const [thisDashboard] = nextState.dashboards.filter(dashboard => dashboard.title===action.dashboardTitle)
      // console.log("thisDashboard", thisDashboard, action.dashboardTitle);
      thisDashboard.cards = action.layout
      break
    }
  case LOAD_DASHBOARDS:
    nextState=action.dashboards
    return nextState
  default:
    return state
  }
  storage.set('dashboards', nextState, function(err) {
    if (err) throw err
  })
  return nextState
}


const oldDashboardCards = [{title: 'Invoices By Region', sliceId: 1, i: '1', w: 3, h: 3, x: 1, y: Infinity, chart: storeChartGenerator(DEFAULT_TEMPLATE), rawCode: DEFAULT_TEMPLATE}, {title: 'Sales by Quarter', sliceId: 1, i: '1', w: 3, h: 3, x: 1, y: Infinity, chart: storeChartGenerator(DEFAULT_TEMPLATE), rawCode: DEFAULT_TEMPLATE}, {title: 'Monthly Sales', sliceId: 1, i: '2', w: 3, h: 3, x: 1, y: Infinity, chart: storeChartGenerator(DEFAULT_TEMPLATE), rawCode: DEFAULT_TEMPLATE}]
