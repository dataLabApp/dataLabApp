import storage from 'electron-json-storage'
import Chart from '../components/Chart'
import {DEFAULT_TEMPLATE} from '../constants'
import React from 'react'

// ----------- Actions
const ADD_CARD = 'ADD_CARD'
const DELETE_CARD = 'DELETE_CARD'
const UPDATE_CARD = 'UPDATE_CARD'
const LOAD_CARDS = 'LOAD_CARDS'

// ----------- Action Creators
export const addCard = (card) => ({
  type: ADD_CARD,
  card
})

export const deleteCard = (card) => ({
  type: DELETE_CARD,
  card
})

export const updateCard = (updatedCard) => ({
  type: UPDATE_CARD,
  updatedCard
})

export const loadCards = (cards) => ({
  type: LOAD_CARDS,
  cards
})

// ----------- Reducer
const initialState = [
//   {
//   id: 1,
//   title: 'Sample Card',
//   rawCode: DEFAULT_TEMPLATE,
//   chart: () => (<Chart />),
//   sliceId: 1,
//   owner: "DuperSet",
//   public: true
// }
]

initialState.count = 1

export default function cardReducer(state = initialState, action) {
  const count = state.count
  let nextState = state.slice()
  nextState.count = count
  switch (action.type) {
  case ADD_CARD:
    action.card.id = count + 1
    nextState = nextState.concat([action.card])
    nextState.count = count + 1
    break

  case DELETE_CARD:
    {
    nextState = nextState.filter(card => card.id!==action.card)
    nextState.count = count
    break
  }
  case UPDATE_CARD:
    {
    const [selectedCard] = nextState.filter(card => card.id===action.updatedCard.id)
    nextState = nextState.filter(card => card.id!==action.updatedCard.id)
    action.updatedCard = Object.assign({title: action.updatedCard.title, id: action.updatedCard.id, chart: action.updatedCard.chart})
    nextState.push(action.updatedCard)
    nextState.count = count
  }
  case LOAD_CARDS:
    nextState=action.cards
    return nextState
  default:
    return state
  }
  storage.set('cards', nextState, function(err) {
    if (err) throw err
  })
  return nextState
}
