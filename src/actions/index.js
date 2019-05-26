export const loadXML = value => ({
  type: 'LOAD_XML',
  gamelist: value
})

export const selectGame = game => ({
  type: 'SELECT_GAME',
  game: game 
})