import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editGame } from '../actions'
import { Table, Checkbox } from 'rbx'
import md5 from 'md5'

const Game = (props) => {
  const { game, editGame } = props

  const handleRowClick = (game) => {
    editGame(game)
  }

  return (
    <Table.Row onClick={e => handleRowClick(game)}> 
      <Table.Cell>
        <Checkbox />
      </Table.Cell>
      <Table.Cell>{game.name}</Table.Cell>
      <Table.Cell>{game.path}</Table.Cell>
      <Table.Cell>{md5(game.path)}</Table.Cell>
    </Table.Row>
  )
}

const mapStateToProps = store => ({
  selectedGames: store.gamelistState.selectedGames
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editGame }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Game)
