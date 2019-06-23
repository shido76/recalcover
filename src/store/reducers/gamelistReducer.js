import { createReducer } from 'redux-starter-kit'

export const initialState = {
  gamelist: {
    game: []
  },
  selectedGames: [],
  game: {
    id: '',
    source: '',
    path: '',
    name: '',
    desc: '',
    image: '',
    rating: '',
    releasedate: '',
    developer: '',
    publisher: '',
    genre: '',
    players: '',
    region: '',
    core: '',
    emulator: '',
    romtype: ''
  }

}

function compare(a, b) {
  const aa = a.name.toLocaleUpperCase()
  const bb = b.name.toLocaleUpperCase()

  if (aa > bb) {
    return 1
  }
  if (aa < bb) {
    return -1
  }
  // a must be equal to b
  return 0
}

function orderByName(games) {
  return games.sort(compare)
}

export const gamelistReducer = createReducer(initialState, {
  LOAD_XML: (state, action) => {
    if ('gameList' in action.data && 'game' in action.data.gameList)
      state.gamelist.game = orderByName(action.data.gameList.game)
  },
  
  SELECT_GAME: (state, action) => {
    state.selectedGames.push(action.data.md5)
    state.game = initialState.game
  },
  
  UNSELECT_GAME: (state, action) => {
    state.selectedGames = state.selectedGames.filter(g => g !== action.data.md5)
  },
  
  EDIT_GAME: (state, action) => {
    state.game = { ...state.game, ...action.data }
  },
  
  UPDATE_GAME: (state, action) => {
    state.gamelist.game[action.index] = action.data
    state.gamelist.game = orderByName(state.gamelist.game)
  },
  
  BATCH_UPDATE_GAME: (state, action) => {
    state.gamelist.game.forEach((g, index, arr) => {
      if ( state.selectedGames.includes(g.md5) )
        Object.keys(action.data)
              .forEach(key => { 
                if (action.data[key] === '')
                  return
                else
                  arr[index][key] = action.data[key]
              })
      else
        return
    })
    state.selectedGames = []
    state.gamelist.game = orderByName(state.gamelist.game)
  },

  ADD_GAME: (state, action) => {
    state.gamelist.game.push(action.data)
    state.gamelist.game = orderByName(state.gamelist.game)
  },
  
  DEL_GAME: (state, action) => {
    state.gamelist.game = state.gamelist.game.filter(g => g.md5 !== action.data.md5)
    state.gamelist.game = orderByName(state.gamelist.game)
  },
  
  CLEAR_GAME: (state, action) => {
    state.game = initialState.game
  },

  SELECT_ALL_GAMES: (state, action) => {
    state.selectedGames = state.gamelist.game.map(g => g.md5)
    state.game = initialState.game
  },

  UNSELECT_ALL_GAMES: (state, action) => {
    state.selectedGames = []
  }
})