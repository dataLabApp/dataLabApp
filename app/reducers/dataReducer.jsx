// Required libraries
import axios from 'axios'

// ----------- Actions
const SET_DATA = 'SET_DATA'

// ----------- Action Creators
export const setCurrentData = (data) => ({
  type: SET_DATA,
  data
})

// ----------- Reducer
const initialState = {
  currentData: []
}

export default function dataReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case SET_DATA:
    nextState.currentData = action.data
    break

  default:
    return state
  }
  return nextState
}

// ----------- Dispatchers
// export const fetchData = () => (dispatch) => {
//   axios.get('/api/data')
//       .then(response => {
//         dispatch(receiveData(response.data))
//       })
//       .catch(console.error)
// }
