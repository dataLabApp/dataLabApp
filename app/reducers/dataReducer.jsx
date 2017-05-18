// Required libraries
import axios from 'axios'
import storage from 'electron-json-storage'
import pg from 'pg'

// ----------- Actions
const SET_CURRENT_DATA = 'SET_CURRENT_DATA'
const LOAD_DATA = 'LOAD_DATA'
const ADD_SLICE = 'ADD_SLICE'
const UPDATE_SLICE_DATA = 'UPDATE_SLICE_DATA'

// ----------- Action Creators
export const setCurrentData = (data) => ({
  type: SET_CURRENT_DATA,
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

export const updateSliceData = (sliceId, newData) => ({
  type: UPDATE_SLICE_DATA,
  sliceId,
  newData
})

export const fetchSliceData = sliceId => {
  return (dispatch, getState) => {
    let data = getState().data
    console.log('data is' , data)
    let [requestedSlice] = data.allSlices.filter(slice => {
      console.log('comparing slice',slice,' with id', sliceId)
      return +slice.id===+sliceId
    })
    let client = new pg.Client(`postgres://localhost/${requestedSlice.database}`)
    console.log(`postgres://localhost/${requestedSlice.database}`)
    client.connect()
    client.query(requestedSlice.SQLQuery, function(err, data) {
      if (err)console.error(err)
      else {
        dispatch(updateSliceData(sliceId, data.rows))
      }
      client.end()
    })
  }
}

const sampleSliceObj= {
  id: 1,
  title: 'Example Slice',
  dateCreated: new Date(),
  SQLQuery: 'SELECT name, description, price FROM product',
  database: 'video-shopper',
  data: [{xVar: 1, yVar: 2, extraVar: 3}]
}

// ----------- Reducer
const initialState = {
  currentData: [],
  allSlices: [sampleSliceObj],
  sliceIdCounter: 2
}

export default function dataReducer(state = initialState, action) {
  let nextState = Object.assign({}, state)

  switch (action.type) {
  case SET_CURRENT_DATA:
    nextState.currentData = action.data
    break
  case LOAD_DATA:
    nextState = action.data
    return nextState
  case ADD_SLICE:
    nextState.allSlices = [...nextState.allSlices, Object.assign(action.sliceObj, {id: nextState.sliceIdCounter++})]
    break
  case UPDATE_SLICE_DATA:
    nextState.allSlices.forEach(slice => slice.id===action.sliceId ? slice.data=action.newData : null)  // this mutates the state
    break
  default:
    return state
  }

  storage.set('data', nextState, function(err) {

    if (err) throw err
  })
  return nextState
}

