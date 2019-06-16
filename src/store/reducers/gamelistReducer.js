import { createReducer } from 'redux-starter-kit'
import md5 from 'md5'

const initialState = {
  gamelist: {
    gameList: {
      game: []
    }
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
  if (a.name > b.name) {
    return 1
  }
  if (a.name < b.name) {
    return -1
  }
  // a must be equal to b
  return 0
}

export const gamelistReducer = createReducer(initialState, {
  LOAD_XML: (state, action) => {
    state.gamelist = action.data
    state.gamelist.gameList.game = state.gamelist.gameList.game.sort(compare)
  },
  
  SELECT_GAME: (state, action) => {
    state.selectedGames.push( md5(action.data.path))
  },
  
  UNSELECT_GAME: (state, action) => {
    state.selectedGames = state.selectedGames.filter(g => g !== md5(action.data.path))
  },
  
  EDIT_GAME: (state, action) => {
    state.game = { ...state.game, ...action.data }
  },
  
  UPDATE_GAME: (state, action) => {
    state.gamelist.gameList.game[action.index] = action.data
    state.gamelist.gameList.game = state.gamelist.gameList.game.sort(compare)
  },
  
  BATCH_UPDATE_GAME: (state, action) => {
    state.gamelist.gameList.game.forEach((g, index, arr) => {
      if ( state.selectedGames.includes(md5(g.path)) )
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
    state.gamelist.gameList.game = state.gamelist.gameList.game.sort(compare)
  },

  ADD_GAME: (state, action) => {
    state.gamelist.gameList.game.push(action.data)
    state.gamelist.gameList.game = state.gamelist.gameList.game.sort(compare)
  },
  
  DEL_GAME: (state, action) => {
    state.gamelist.gameList.game = state.gamelist.gameList.game.filter(g => md5(g.path) !== md5(action.data.path))
    state.gamelist.gameList.game = state.gamelist.gameList.game.sort(compare)
  },
  
  CLEAR_GAME: (state, action) => {
    state.game = initialState.game
  },

  SELECT_ALL_GAMES: (state, action) => {
    state.selectedGames = state.gamelist.gameList.game.map(g => md5(g.path))
  },

  UNSELECT_ALL_GAMES: (state, action) => {
    state.selectedGames = []
  }
})