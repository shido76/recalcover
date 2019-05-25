const initialState = {
  gamelist: {
    gameList: {
      game: []
    }
  }
}

export const gamelistReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_XML':
      return {
        ...state,
        gamelist: action.gamelist
      }
    default:
      return state
  }
}