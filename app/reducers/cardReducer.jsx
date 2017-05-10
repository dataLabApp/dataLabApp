
// ----------- Actions
const ADD_CARD = 'ADD_CARD'
const DELETE_CARD = 'DELETE_CARD'
const UPDATE_CARD = 'UPDATE_CARD'

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

// ----------- Reducer
const initialState =  [{
    id: 1,
    title: 'Sample Card',
    chart: undefined
  }]

initialState.count = 1;

export default function cardReducer(state = initialState, action) {
  let count = state.count
  let nextState = state.slice()
  nextState.count = count
  switch (action.type) {

  case ADD_CARD:
    action.card.id = count
    nextState = nextState.concat([action.card])
    nextState.count = count + 1
    break

  case DELETE_CARD:
  {
    nextState = nextState.filter(card=>card.id!==action.card.id)
    nextState.count = count
    break
  }
  case UPDATE_CARD:
  {
    let [selectedCard] = nextState.filter(card=>card.id===action.updatedCard.id)
    nextState = nextState.filter(card=>card.id!==action.updatedCard.id)
    action.updatedCard = Object.assign({title:action.updatedCard.title, id:action.updatedCard.id, chart: action.updatedCard.chart})
    nextState.push(action.updatedCard)
    nextState.count = count
  }
  default:
    return state

  }

  return nextState

}
