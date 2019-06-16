export const loadXML = value => ({
  type: 'LOAD_XML',
  data: value
})

export const selectGame = game => ({
  type: 'SELECT_GAME',
  data: game 
})

export const unSelectGame = game => ({
  type: 'UNSELECT_GAME',
  data: game 
})

export const editGame = game => ({
  type: 'EDIT_GAME',
  data: game
})

export const updateGame = (game, index) => ({
  type: 'UPDATE_GAME',
  index: index,
  data: game
})

export const batchUpdateGame = (game) => ({
  type: 'BATCH_UPDATE_GAME',
  data: game
})

export const addGame = game => ({
  type: 'ADD_GAME',
  data: game
})

export const delGame = game => ({
  type: 'DEL_GAME',
  data: game
})

export const clearGame = () => ({
  type: 'CLEAR_GAME',
})

export const selectAllGames = () => ({
  type: 'SELECT_ALL_GAMES',
})

export const unSelectAllGames = () => ({
  type: 'UNSELECT_ALL_GAMES',
})