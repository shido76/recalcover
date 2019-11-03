import { createReducer } from 'redux-starter-kit'

export const initialState = {
  isNotificationVisible: false,
  notificationMessage: '',
  notificationColor: '',
}

export const uiReducer = createReducer(initialState, {
  SHOW_NOTIFICATION: (state, action) => {
    state.isNotificationVisible = action.visible
    state.notificationColor = action.color
    state.notificationMessage = action.text
  },

})