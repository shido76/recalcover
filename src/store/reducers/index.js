import { combineReducers } from 'redux'
import { gamelistReducer } from './gamelistReducer'
//import { uiReducer } from './uiReducer'

export const rootReducer = combineReducers({
  gamelistState: gamelistReducer,
  //uiState: uiReducer
})