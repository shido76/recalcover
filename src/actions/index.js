export const loadXML = value => ({
  type: 'LOAD_XML',
  data: value
})

export const selectGame = game => ({
  type: 'SELECT_GAME',
  data: game 
})

export const editGame = game => ({
  type: 'EDIT_GAME',
  data: game
})

export const updateFieldGame = (field,value) => ({
  type: 'UPDATE_FIELD_GAME',
  data: { field, value }
})