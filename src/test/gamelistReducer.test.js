import { initialState, gamelistReducer } from '../store/reducers/gamelistReducer'
import jsonFile from './test.json'

describe('gamelist Reducer', () => {
  it('LOAD_XML', () => {
    const action = { type: 'LOAD_XML', data: jsonFile }
    const state = Object.assign({}, initialState,
                                { games: jsonFile.gameList.game },
                                { backupGames: jsonFile.gameList.game },
                               )
    expect(gamelistReducer(initialState, action)).toEqual(state)
  })

  it('SELECT_GAME', () => {
    const action = { type: 'SELECT_GAME', data: { path: './teste', name: 'teste' }}
    const state = Object.assign({}, initialState, { selectedGames: [action.data.md5]})
    expect(gamelistReducer(initialState, action)).toEqual(state)
  })

  it('UNSELECT_GAME', () => {
    const action = { type: 'UNSELECT_GAME', data: { path: './teste', name: 'teste' }}
    const state = Object.assign({}, initialState, { selectedGames: []})
    expect(gamelistReducer(initialState, action)).toEqual(state)
  })

  it('EDIT_GAME', () => {
    const action = { type: 'EDIT_GAME', data: { path: './teste', name: 'teste' }}
    const state = Object.assign({}, initialState, { game: { ...initialState.game, ...action.data }})
    expect(gamelistReducer(initialState, action)).toEqual(state)
  })

  it('UPDATE_GAME', () => {
    let game = { path: "./# ATARI #", image: "./downloaded_images/logos/atari.png", name: "ABA" }
    const action = { type: 'UPDATE_GAME', index: 0, data: game }

    let originalState = Object.assign({}, initialState,
                                      { games: jsonFile.gameList.game },
                                      { backupGames: jsonFile.gameList.game },
                                     )
    let state = Object.assign({}, initialState,
                              { games: jsonFile.gameList.game },
                              { backupGames: jsonFile.gameList.game },
                             )
    state.games[0].name = 'ABA'

    expect(gamelistReducer(originalState, action)).toEqual(state)
  })

  it('BATCH_UPDATE_GAME', () => {
    
  })

  it('ADD_GAME', () => {
    
  })

  it('DEL_GAME', () => {
    
  })

  it('CLEAR_GAME', () => {
    
  })

  it('SELECT_ALL_GAMES', () => {
    
  })

  it('UNSELECT_ALL_GAMES', () => {
    
  })
})