import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import { Field, Control, Input, Textarea, Button, Help, Image } from 'rbx'
import useValitedForm from 'react-valida-hook'
import md5 from 'md5'
import fs from 'fs'
import validators from './validators'
import validations from './validations'
import { updateGame, addGame, clearGame, batchUpdateGame } from '../../actions'

const GameForm = ({ basePath, gamelist, selectedGames, game
                  , updateGame, addGame, clearGame, batchUpdateGame
                  }) => {
  const [formData, validation, validateForm, getData, setData] = useValitedForm(game, validations, validators)

  useEffect(() => {
    setData(game)
    // zero validation errors
    Object.keys(validation.errors).map(key => validation.errors[key].length = 0)
  }, [game])


  if (gamelist.game.length > 0) {

    const imageFile = (basePath, game) => {
      let path
      if (process.platform === 'win32') {
        path = `file://${basePath}${game.image.replace("/","\\")}`
      } else {
        path = `file://${basePath}${game.image}`
      }

      return path
    }

    const onNew = (e) => {
      e.preventDefault()
      clearGame()
    }

    const onSubmit = (e) => {
      e.preventDefault()
      const game = getData()
      
      if (selectedGames.length > 0) {
        batchUpdateGame(game)
        toast.success('Game(s) atualizados')

      } else {
        const valid = validateForm()

        if (valid) {
          let index = gamelist.game.findIndex( g => g.md5 === game.md5)
          
          if (index !== -1) {
            updateGame(game, index)
            toast.success('Game atualizado!')
          } else {
            game.md5 = md5(game.path)
            addGame(game)
            toast.success('Game salvo!')
          }
          console.log(game, valid)
        }
      } 
      
    }

    const onSaveGamelist = (e) => {
      let gameListFile

      function toXml(games) {
        let xml
        xml = "<?xml version='1.0' encoding='utf-8'?>\n"
        xml += "  <gameList>\n"
      
        games.forEach((game) => {
          xml += "    <game>\n"
          for (let [key, value] of Object.entries(game)) {
            xml += `      <${key}>${value}</${key}>\n`
          }
          xml += "    </game>\n"
        })
        
        xml += "  </gameList>\n"
        return xml
      }

      e.preventDefault()

      if (process.platform === 'win32') {
        gameListFile = `${basePath}gamelist-saved.xml`
      } else {
        gameListFile = `${basePath}gamelist-saved.xml`
      }

      fs.writeFile(gameListFile, toXml(gamelist.game), (err) => {
        if (err)
          toast.success(err.message)
        else
          toast.success('Novo Gamelist Salvo!')
      })
    }

    const hasError = (field) => validation.errors[field].length > 0

    return (
      <form noValidate onSubmit={onSubmit}>
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
                { validation.errors.path.join(', ')}
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
                { validation.errors.image.join(', ')}
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
                { validation.errors.desc.join(', ')}
              </Help>
            </Field>
            <Field>
              <Image.Container size={'4by3'}>
                <Image
                  src={imageFile(basePath, game)}
                />
              </Image.Container>
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
                { validation.errors.developer.join(', ')}
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
                { validation.errors.publisher.join(', ')}
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
                { validation.errors.rating.join(', ')}
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
                { validation.errors.releasedate.join(', ')}
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
                { validation.errors.genre.join(', ')}
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
                { validation.errors.players.join(', ')}
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
                { validation.errors.region.join(', ')}
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
                { validation.errors.core.join(', ')}
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
                { validation.errors.emulator.join(', ')}
              </Help>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="RomType"
                       color={ hasError('romtype') ? 'danger': '' } 
                       name="romtype"
                       { ...formData.romtype.input }
                />
              </Control>
              <Help color={ hasError('romtype') ? 'danger': '' }>
                { validation.errors.romtype.join(', ')}
              </Help>
            </Field>
          </Field.Body>
        </Field>
        <Field kind="group" align="right">
          <Control>
            <Button color="success" disabled={false} onClick={onNew}>Novo</Button>
          </Control>
          <Control>
            <Button color="info" disabled={false}>Salvar</Button>
          </Control>
          <Control>
            <Button color="warning" disabled={false} onClick={onSaveGamelist}>Salvar Gamelist</Button>
          </Control>
        </Field>
      </form>
    )
  }
  return null

}

const mapStateToProps = store => ({
  basePath: store.gamelistState.basePath,
  gamelist: store.gamelistState.gamelist,
  selectedGames: store.gamelistState.selectedGames,
  game: store.gamelistState.game,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateGame, addGame, clearGame, batchUpdateGame }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GameForm)
