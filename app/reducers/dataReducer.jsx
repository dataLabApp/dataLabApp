// Required libraries
import axios from 'axios'

// ----------- Actions
const SET_DATA = 'SET_DATA'
const ADD_SLICE = 'ADD_SLICE'

// ----------- Action Creators
export const setCurrentData = (data) => ({
  type: SET_DATA,
  data
})

export const addSlice = (sliceObj) => ({
  type: ADD_SLICE,
  sliceObj
})

//sliceObj= {
//   title:
//   dateCreated:
//   SQLQuery:
//   data:
// }

// ----------- Reducer
const initialState = {
  currentData: [],
  allSlices: []
}

export default function dataReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case SET_DATA:
    nextState.currentData = action.data
    break

  case ADD_SLICE:
    nextState.allSlices = [...nextState.allSlices, action.sliceObj]
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
