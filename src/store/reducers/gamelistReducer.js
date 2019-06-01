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

export const gamelistReducer = createReducer(initialState, {
  LOAD_XML: (state, action) => {
    state.gamelist = action.data
  },
  SELECT_GAME: (state, action) => {
    state.selectedGames.push( md5(action.data.path))
  },
  EDIT_GAME: (state, action) => {
    state.game = { ...state.game, ...action.data }
  },
  UPDATE_GAME: (state, action) => {
    state.gamelist.gameList.game[action.index] = action.data
  },
  ADD_GAME: (state, action) => {
    state.gamelist.gameList.game.push(action.data)
  },
  DEL_GAME: (state, action) => {
    state.gamelist.gameList.game = state.gamelist.gameList.game.filter(g => md5(g.path) !== md5(action.data.path))
  },
  CLEAR_GAME: (state, action) => {
    state.game = initialState.game
  } 
})