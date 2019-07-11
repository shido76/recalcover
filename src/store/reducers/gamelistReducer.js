import { createReducer } from 'redux-starter-kit'

export const initialState = {
  basePath: '',
  games: [],
  backupGames: [],
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
    romtype: '',
  }

}

function orderByName(games) {
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

  return games.sort(compare)
}

export const gamelistReducer = createReducer(initialState, {
  LOAD_XML: (state, action) => {
    if ('gameList' in action.data && 'game' in action.data.gameList) {
      state.games = orderByName(action.data.gameList.game)
      state.backupGames = state.games
    }
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
    state.games[action.index] = action.data
    state.games = orderByName(state.games)
    state.backupGames = state.games
  },

  BATCH_UPDATE_GAME: (state, action) => {
    state.games.forEach((g, index, arr) => {
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
    state.games = orderByName(state.games)
    state.backupGames = state.games
  },

  ADD_GAME: (state, action) => {
    state.games.push(action.data)
    state.games = orderByName(state.games)
    state.backupGames = state.games
  },

  DEL_GAME: (state, action) => {
    state.backupGames = state.backupGames.filter(g => g.md5 !== action.data.md5)
    state.backupGames = orderByName(state.backupGames)
    state.games = state.backupGames
  },

  CLEAR_GAME: (state, action) => {
    state.game = initialState.game
  },

  FILTER_GAME: (state, action) => {
    const re = new RegExp(action.data, 'gi')
    if (action.data === '') {
      state.games = state.backupGames
    } else {
      state.games = state.games.filter(g => g.name && g.name.match(re))
      state.games = (state.games.length > 0) ? orderByName(state.games) : state.backupGames
    }
  },

  SELECT_ALL_GAMES: (state, action) => {
    state.selectedGames = state.games.map(g => g.md5)
    state.game = initialState.game
  },

  UNSELECT_ALL_GAMES: (state, action) => {
    state.selectedGames = []
  },

  SET_BASE_PATH: (state, action) => {
    state.basePath = action.data.replace('gamelist.xml', '')
  },

})
