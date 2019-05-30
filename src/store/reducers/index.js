import { gamelistReducer } from './gamelistReducer'
//import { otherReducer } from './otherReducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  gamelistState: gamelistReducer,
  //otherState: otherReducer
})