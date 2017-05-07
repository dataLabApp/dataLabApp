
// ----------- Actions
const ADD_CARD = 'ADD_CARD'
const DELETE_CARD = 'DELETE_CARD'

// ----------- Action Creators
export const addCard = (card) => ({
  type: ADD_CARD,
  card
})

export const deleteCard = (card) => ({
  type: DELETE_CARD,
  card
})

// ----------- Reducer
const initialState = {
  cards: {a: {top: 20, left: 100}, b: {top: 200, left: 100}}
}

export default function cardReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case ADD_CARD:
    nextState.cards = Object.assign(nextState.cards, action.card)
    console.log ('~~nextState after add ', nextState)
    break

  case DELETE_CARD:
    console.log('in delete action.card ', action.card)
    delete nextState.cards[action.card]
    console.log ('~~nextState after delete ', nextState)
    break

  default:
    return state
  }
  return nextState
}
