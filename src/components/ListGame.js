import React from 'react'
import { connect } from 'react-redux'
import Game from './Game'

const ListGame = ({ gamelist }) => {
  if (gamelist.gameList.game.length > 0)
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Path</th>
              <th>Emulator</th>
            </tr>
          </thead>
          <tbody>
            {
              gamelist.gameList.game.map(g =>
                <Game key={g.id} game={g} />
              )
            }
          </tbody>
        </table>
      </div>  
    )

  return <div />
}

const mapStateToProps = store => ({
  gamelist: store.gamelistState.gamelist
})

export default connect(mapStateToProps)(ListGame)