import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editGame, delGame, clearGame, selectGame, unSelectGame, showNotification } from '../actions'
import { Table, Checkbox, Button, Icon } from 'rbx'
import { FaTrash } from 'react-icons/fa'
import md5 from 'md5'

const Game = ({ game, storedGame, selectedGames
              , editGame, delGame, clearGame, selectGame, unSelectGame, showNotification
              }) => {

  const handleRowClick = game => editGame(game)

  const handleCheckboxChange = (game) => { 
    if (isChecked(game)) 
      unSelectGame(game)
    else
      selectGame(game)
  }

  const handleRowDelete = game => {
    if (window.confirm("Tem certeza que deseja remover este jogo?")) {
      delGame(game)
      clearGame()
      showNotification(true, 'success', 'Jogo removido com sucesso!')
    }
  } 

  const isSelected = game => md5(game.path) === md5(storedGame.path)

  const isChecked = game => selectedGames.includes(md5(game.path))

  return (
    <Table.Row selected={isSelected(game)}>  
      <Table.Cell>
        <Checkbox checked={isChecked(game)} onChange={e => handleCheckboxChange(game)}/>
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
  selectedGames: store.gamelistState.selectedGames,
  storedGame: store.gamelistState.game
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editGame, delGame, clearGame, selectGame, unSelectGame, showNotification }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Game)
