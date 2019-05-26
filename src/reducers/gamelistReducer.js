const initialState = {
  gamelist: {
    gameList: {
      game: []
    }
  },
  selectedGames: [] 
}

export const gamelistReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_XML':
      return {
        ...state,
        gamelist: action.gamelist
      }
    case 'SELECT_GAME':
      return {
        ...state,
        selectedGames: [
          ...state.selectedGames,
          action.game
        ]
      }
    default:
      return state
  }
}