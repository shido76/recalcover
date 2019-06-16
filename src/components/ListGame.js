import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectAllGames, unSelectAllGames } from '../actions'
import { Table, Checkbox } from 'rbx'
import Game from './Game'
import md5 from 'md5'

const ListGame = ({ gamelist
                  , selectAllGames, unSelectAllGames
                  }) => {
  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = (e) => {
    setChecked(prevChecked => !prevChecked)
    
    if (e.target.checked)
      selectAllGames()
    else
      unSelectAllGames()
  }

  if (gamelist.gameList.game.length > 0)
    return (
      <div className="table-responsive">
        <Table bordered hoverable narrow fullwidth>
          <Table.Head>
            <Table.Row>
              <Table.Heading>
                <Checkbox checked={checked} onChange={e => handleCheckboxChange(e)} />
              </Table.Heading>
              <Table.Heading>
                Name
              </Table.Heading>
              <Table.Heading />
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {
              gamelist.gameList.game.map(g =>
                <Game key={md5(g.path)} game={g} />
              )
            }
          </Table.Body>
        </Table>
      </div>
    )

  return <div />
}

const mapStateToProps = store => ({
  gamelist: store.gamelistState.gamelist
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectAllGames, unSelectAllGames }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListGame)