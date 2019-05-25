import { gamelistReducer } from './gamelistReducer'
//import { otherReducer } from './otherReducer'
import { combineReducers } from 'redux'

export const Reducers = combineReducers({
  gamelistState: gamelistReducer,
  //otherState: otherReducer
})