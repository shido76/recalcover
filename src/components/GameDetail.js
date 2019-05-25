import React from 'react'

const GameDetail = ({ game }) => {
  return (
    <tr> 
      <td></td>
      <td>{game.name}</td>
      <td>{game.path}</td>
      <td>{game.emulator}</td>
    </tr>
  )
}

export default GameDetail
