import { initialState, gamelistReducer } from '../store/reducers/gamelistReducer'

describe('gamelist Reducer', () => {
  it('LOAD_XML', () => {
    const action = { type: 'LOAD_XML', data: '' }
    expect(gamelistReducer(initialState, action)).toEqual(initialState)
  })

  it('SELECT_GAME', () => {

  })

  it('UNSELECT_GAME', () => {
    
  })

  it('EDIT_GAME', () => {
    
  })

  it('UPDATE_GAME', () => {
    
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