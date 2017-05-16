// Required libraries
import axios from 'axios'
import storage from 'electron-json-storage'

// ----------- Actions
const SET_DATA = 'SET_DATA'
const LOAD_DATA = 'LOAD_DATA'
const ADD_SLICE = 'ADD_SLICE'


// ----------- Action Creators
export const setCurrentData = (data) => ({
  type: SET_DATA,
  data
})
export const loadData = (data) => ({
  type: LOAD_DATA,
  data
})

export const addSlice = (sliceObj) => ({
  type: ADD_SLICE,
  sliceObj
})

let sampleSliceObj= {
  title: 'Example Slice',
  dateCreated: new Date(),
  SQLQuery: 'SELECT * FROM products',
  data: [{
    xVar: 1,
    yVar: 2,
    extraVar: 3}]
}

// ----------- Reducer
const initialState = {
  currentData: [],
  allSlices: [sampleSliceObj]
}

export default function dataReducer(state = initialState, action) {
  let nextState = Object.assign({}, state)

  switch (action.type) {
  case SET_DATA:
    nextState.currentData = action.data
    break
  case LOAD_DATA:
    nextState = action.data
    return nextState
  case ADD_SLICE:
    nextState.allSlices = [...nextState.allSlices, action.sliceObj]
    break
  default:
    return state
  }
  storage.set('data', nextState, function(err){
    if (err) throw err
  })
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
