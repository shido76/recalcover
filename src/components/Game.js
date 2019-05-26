import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectGame } from '../actions'
import { Table, Checkbox } from 'rbx'

const Game = (props) => {
  const { game, selectGame } = props

  const handleRowClick = (game) => {
    selectGame(game)
  }

  return (
    <Table.Row onClick={e => handleRowClick(game)}> 
      <Table.Cell>
        <Checkbox />
      </Table.Cell>
      <Table.Cell>{game.name}</Table.Cell>
      <Table.Cell>{game.path}</Table.Cell>
      <Table.Cell>{game.emulator}</Table.Cell>
    </Table.Row>
  )
}

const mapStateToProps = store => ({
  selectedGames: store.gamelistState.selectedGames
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectGame }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Game)
