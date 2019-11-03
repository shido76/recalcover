import { gamelistReducer } from './gamelistReducer'
//import { uiReducer } from './uiReducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  gamelistState: gamelistReducer,
  //uiState: uiReducer
})