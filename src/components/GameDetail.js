import React from 'react'
import { connect } from 'react-redux'
import { Field, Control, Input, Textarea, Button } from 'rbx'

const GameDetail = ({ gamelist, selectedGames }) => {
  if (gamelist.gameList.game.length > 0)
    return (
      <form>
        <code>{selectedGames}</code>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Name" />
              </Control>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Path" />
              </Control>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Image" />
              </Control>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Textarea rows={10} placeholder="Desc" />
              </Control>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Developer" />
              </Control>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Publisher" />
              </Control>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="number" placeholder="Rating" />
              </Control>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Release Date" />
              </Control>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Genre" />
              </Control>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Players" />
              </Control>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Region" />
              </Control>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Core" />
              </Control>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" placeholder="Emulator" />
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

  return <div />
}

const mapStateToProps = store => ({
  gamelist: store.gamelistState.gamelist,
  selectedGames: store.gamelistState.selectedGames
})

export default connect(mapStateToProps)(GameDetail)
