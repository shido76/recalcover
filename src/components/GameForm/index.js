import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, Control, Input, Textarea, Button, Help } from 'rbx'
import { updateFieldGame } from '../../actions'
import useValitedForm from 'react-valida-hook'
import validators from './validators'
import validations from './validations'

const initialState = {
  id: '',
  source: '',
  path: '',
  name: '',
  desc: '',
  image: '',
  rating: '',
  releasedate: '',
  developer: '',
  publisher: '',
  genre: '',
  players: '',
  region: '',
  core: '',
  emulator: ''
}

const GameForm = ({ gamelist, selectedGames, game }) => {
  const [formData, validation, validateForm, getData] = useValitedForm(initialState, validations, validators)

  if (gamelist.gameList.game.length > 0) {

    const submit = (e) => {
      e.preventDefault()
      const valid = validateForm()
      console.log(getData(), valid)
    }
    
    const hasError = (field) => validation.errors[field].length > 0

    return (
      <form noValidate={true} onSubmit={submit}>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Name" 
                       color={ hasError('name') ? 'danger': '' } 
                       name="name"
                       { ...formData.name.input }
                />
              </Control>
              <Help color={ hasError('name') ? 'danger': '' }>
                { validation.errors.name.join(', ')}
              </Help>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Path" 
                       color={ hasError('path') ? 'danger': '' } 
                       name="path"
                       { ...formData.path.input }
                />
              </Control>
              <Help color={ hasError('path') ? 'danger': '' }>
                { validation.errors.name.join(', ')}
              </Help>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Image"
                       color={ hasError('image') ? 'danger': '' } 
                       name="image"
                       { ...formData.image.input }
                />
              </Control>
              <Help color={ hasError('image') ? 'danger': '' }>
                { validation.errors.name.join(', ')}
              </Help>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Textarea rows={10} 
                          placeholder="Desc" 
                          color={ hasError('desc') ? 'danger': '' } 
                          name="desc"
                          { ...formData.desc.input }
                />
              </Control>
              <Help color={ hasError('desc') ? 'danger': '' }>
                { validation.errors.name.join(', ')}
              </Help>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Developer"
                       color={ hasError('developer') ? 'danger': '' } 
                       name="developer"
                       { ...formData.developer.input }
                />
              </Control>
              <Help color={ hasError('developer') ? 'danger': '' }>
                { validation.errors.name.join(', ')}
              </Help>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Publisher"
                       color={ hasError('publisher') ? 'danger': '' } 
                       name="publisher"
                       { ...formData.publisher.input }
                />
              </Control>
              <Help color={ hasError('publisher') ? 'danger': '' }>
                { validation.errors.name.join(', ')}
              </Help>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="number" 
                       placeholder="Rating"
                       color={ hasError('rating') ? 'danger': '' } 
                       name="rating"
                       { ...formData.rating.input }
                />
              </Control>
              <Help color={ hasError('rating') ? 'danger': '' }>
                { validation.errors.name.join(', ')}
              </Help>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Release Date"
                       color={ hasError('releasedate') ? 'danger': '' } 
                       name="releasedate"
                       { ...formData.releasedate.input }
                />
              </Control>
              <Help color={ hasError('releasedate') ? 'danger': '' }>
                { validation.errors.name.join(', ')}
              </Help>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Genre"
                       color={ hasError('genre') ? 'danger': '' } 
                       name="genre"
                       { ...formData.genre.input }
                />
              </Control>
              <Help color={ hasError('genre') ? 'danger': '' }>
                { validation.errors.name.join(', ')}
              </Help>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Players"
                       color={ hasError('players') ? 'danger': '' } 
                       name="players"
                       { ...formData.players.input }
                />
              </Control>
              <Help color={ hasError('players') ? 'danger': '' }>
                { validation.errors.name.join(', ')}
              </Help>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Region"
                       color={ hasError('region') ? 'danger': '' } 
                       name="region"
                       { ...formData.region.input }
                />
              </Control>
              <Help color={ hasError('region') ? 'danger': '' }>
                { validation.errors.name.join(', ')}
              </Help>
            </Field>
          </Field.Body>
        </Field>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Core"
                       color={ hasError('core') ? 'danger': '' } 
                       name="core"
                       { ...formData.core.input }
                />
              </Control>
              <Help color={ hasError('core') ? 'danger': '' }>
                { validation.errors.name.join(', ')}
              </Help>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Emulator"
                       color={ hasError('emulator') ? 'danger': '' } 
                       name="emulator"
                       { ...formData.emulator.input }
                />
              </Control>
              <Help color={ hasError('emulator') ? 'danger': '' }>
                { validation.errors.name.join(', ')}
              </Help>
            </Field>
          </Field.Body>
        </Field>
        <Field kind="group" align="right">
          <Control>
            <Button color="success">Novo</Button>
          </Control>
          <Control>
            <Button color="info" disabled={!validation.valid}>Salvar</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(GameForm)
