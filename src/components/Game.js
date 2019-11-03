import React from 'react'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Checkbox, Button, Icon } from 'rbx'
import { FaTrash } from 'react-icons/fa'
import fs from 'fs'
import { editGame, delGame, clearGame, selectGame, unSelectGame } from '../actions'

const Game = ({ basePath, game, storedGame, selectedGames
              , editGame, delGame, clearGame, selectGame, unSelectGame
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
      toast.success('Jogo removido com sucesso!')
    }
  } 

  const isSelected = game => game.md5 === storedGame.md5

  const isChecked = game => selectedGames.includes(game.md5)

  const isRomExist = (basePath, game) => {
    let romPath
    if (process.platform === 'win32') {
      romPath = `${basePath}${game.path.replace("/","\\")}`
    } else {
      romPath = `${basePath}${game.path}`
    }
    
    return fs.existsSync(romPath)
  }

  const smallCell = {
    width: '5px'  
  }

  return (
    <Table.Row selected={isSelected(game)} style={ isRomExist(basePath,game) ? {} : { background: 'yellow' }}>  
      <Table.Cell style={smallCell}>
        <Checkbox checked={isChecked(game)} onChange={e => handleCheckboxChange(game)}/>
      </Table.Cell>
      <Table.Cell onClick={e => handleRowClick(game)}>
        {game.name}
      </Table.Cell>
      <Table.Cell  style={smallCell}>
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
  basePath: store.gamelistState.basePath,
  selectedGames: store.gamelistState.selectedGames,
  storedGame: store.gamelistState.game,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editGame, delGame, clearGame, selectGame, unSelectGame }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Game)
