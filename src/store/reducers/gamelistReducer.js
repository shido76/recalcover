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
    releasedata: '',
    developer: '',
    publisher: '',
    genre: '',
    players: '',
    region: '',
    core: '',
    emulator: ''
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
    state.game = action.data
  },
  UPDATE_FIELD_VALUE: (state, action) => {
    state.game[action.data.field] = action.data.value
  }
})