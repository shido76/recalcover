import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editGame, delGame, clearGame } from '../actions'
import { Table, Checkbox, Button, Icon } from 'rbx'
import { FaTrash } from 'react-icons/fa'

const Game = ({ game, editGame, delGame, clearGame }) => {

  const handleRowClick = (game) => {
    editGame(game)
  }

  const handleRowDelete = (game) => {
    if (window.confirm("Tem certeza que deseja remover este jogo?")) {
      delGame(game)
      clearGame()
    }
      
  } 

  return (
    <Table.Row> 
      <Table.Cell>
        <Checkbox />
      </Table.Cell>
      <Table.Cell onClick={e => handleRowClick(game)}>
        {game.name}
      </Table.Cell>
      <Table.Cell>
        <Button color="danger" size="small" onClick={e => handleRowDelete(game)}>
          <Icon size="small" color="white">
            <FaTrash />
          </Icon>
        </Button>
      </Table.Cell>
    </Table.Row>
  )
}

const mapStateToProps = store => ({
  selectedGames: store.gamelistState.selectedGames
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editGame, delGame, clearGame }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Game)
