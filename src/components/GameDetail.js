import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, Control, Input, Textarea, Button } from 'rbx'
import { updateFieldGame } from '../actions'

const updateField = (e, game) => {
  updateFieldGame(e.target.name, e.target.value)
}

const GameDetail = ({ gamelist, selectedGames, game }) => {

  if (gamelist.gameList.game.length > 0) {

    return (
      <form>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Name" name="name" value={game.name} onChange={e => updateField(e, game)} />
              </Control>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Path" value={game.path} />
              </Control>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Image" value={game.image} />
              </Control>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Textarea rows={10} placeholder="Desc" value={game.desc} />
              </Control>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Developer" value={game.developer} />
              </Control>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Publisher" value={game.publisher} />
              </Control>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="number" placeholder="Rating" value={game.rating} />
              </Control>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Release Date" value={game.releasedata} />
              </Control>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Genre" value={game.genre} />
              </Control>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Players" value={game.players} />
              </Control>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Region" value={game.region} />
              </Control>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Core" value={game.core} />
              </Control>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Emulator" value={game.emulator} />
              </Control>
            </Field>
          </Field.Body>
        </Field>
        <Field kind="group" align="right">
          <Control>
            <Button color="success">Novo</Button>
          </Control>
          <Control>
            <Button color="info">Salvar</Button>
          </Control>
          <Control>
            <Button color="danger">Remover</Button>
          </Control>
        </Field>
      </form>
    )
  }
  return <div />

}

const mapStateToProps = store => ({
  gamelist: store.gamelistState.gamelist,
  selectedGames: store.gamelistState.selectedGames,
  game: store.gamelistState.game
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateFieldGame }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail)
