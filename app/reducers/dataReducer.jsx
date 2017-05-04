// Required libraries
import axios from 'axios'

// ----------- Actions
const FETCH_DATA = 'FETCH_DATA'

// ----------- Action Creators
export const receiveData = (data) => ({
  type: FETCH_DATA,
  data
})

// ----------- Reducer
const initialState = {
  allData: []
}

export default function dataReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case FETCH_DATA:
    nextState.allData = action.data
    break

  default:
    return state
  }
  return nextState
}

// ----------- Disptachers
// export const fetchData = () => (dispatch) => {
//   axios.get('/api/data')
//       .then(response => {
//         dispatch(receiveData(response.data))
//       })
//       .catch(console.error)
// }
