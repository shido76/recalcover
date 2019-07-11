import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Checkbox, Field, Control, Input, Button } from 'rbx'
import Game from './Game'
import Search from './Search'
import Pagination from './Pagination'
import { selectAllGames, unSelectAllGames } from '../actions'

const ListGame = ({ games, selectedGames
                  , selectAllGames, unSelectAllGames
                  }) => {

  const [pageOfItems, setPageOfItems] = useState([])

  const handleCheckboxChange = (e) => {
    if (e.target.checked)
      selectAllGames()
    else
      unSelectAllGames()
  }

  const onChangePage = (pageOfItems) => {
    setPageOfItems(pageOfItems)
  }

  const isAllSelected = () => selectedGames.length === games.length

  if (games.length > 0)
    return (
      <div>
        <Search />
        <Table bordered hoverable narrow fullwidth>
          <Table.Head>
            <Table.Row>
              <Table.Heading>
                <Checkbox checked={isAllSelected()} onChange={e => handleCheckboxChange(e)} />
              </Table.Heading>
              <Table.Heading>
                Name
              </Table.Heading>
              <Table.Heading />
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {
              pageOfItems.map(g =>
                <Game key={g.md5} game={g} />
              )
            }
          </Table.Body>
        </Table>
        <Pagination items={games} initialPage={1} onChangePage={onChangePage} />
      </div>
    )

  return <div />
}

const mapStateToProps = store => ({
  selectedGames: store.gamelistState.selectedGames,
  games: store.gamelistState.games,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectAllGames, unSelectAllGames }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListGame)