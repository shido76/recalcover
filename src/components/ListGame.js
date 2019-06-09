import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'rbx'
import Game from './Game'
import md5 from 'md5'

const ListGame = ({ gamelist }) => {
  if (gamelist.gameList.game.length > 0)
    return (
      <div className="table-responsive">
        <Table bordered hoverable narrow fullwidth>
          <Table.Head>
            <Table.Row>
              <Table.Heading />
              <Table.Heading>Name</Table.Heading>
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

export default connect(mapStateToProps)(ListGame)