import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Checkbox } from 'rbx'
import Game from './Game'
import Pagination from './Pagination'
import { selectAllGames, unSelectAllGames } from '../actions'

const ListGame = ({ gamelist, selectedGames
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

  const isAllSelected = () => selectedGames.length === gamelist.game.length

  if (gamelist.game.length > 0)
    return (
      <div>
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
        <Pagination items={gamelist.game} initialPage={1} onChangePage={onChangePage} />
      </div>
    )

  return <div />
}

const mapStateToProps = store => ({
  selectedGames: store.gamelistState.selectedGames,
  gamelist: store.gamelistState.gamelist,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectAllGames, unSelectAllGames }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListGame)