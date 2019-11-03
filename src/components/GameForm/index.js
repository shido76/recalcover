import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import { Field, Control, Input, Textarea, Button, Help, Image, Checkbox, Label } from 'rbx'
import useForm from 'react-hook-form'
import md5 from 'md5'
import fs from 'fs'
import { updateGame, addGame, clearGame, batchUpdateGame } from '../../actions'

const GameForm = ({ basePath, games, selectedGames, game
                  , updateGame, addGame, clearGame, batchUpdateGame
                  }) => {

  const { register, handleSubmit, getValues, setValue, errors, reset, formState } = useForm()

  useEffect(() => {
    setValue('name', game.name)
    setValue('md5', game.md5)
    setValue('path', game.path)
    setValue('image', game.image)
    setValue('desc', game.desc)
    setValue('favorite', game.favorite)
    setValue('hidden', game.hidden)
    setValue('developer', game.developer)
    setValue('publisher', game.publisher)
    setValue('rating', game.rating)
    setValue('releasedate', game.releasedate)
    setValue('genre', game.genre)
    setValue('players', game.players)
    setValue('region', game.region)
    setValue('core', game.core)
    setValue('emulator', game.emulator)
    setValue('romtype', game.romtype)
  }, [game])

  if (games.length > 0) {

    const imageFile = (basePath, game) => {
      let path
      if (process.platform === 'win32') {
        path = `file://${basePath}${game.image.replace('/', '\\')}`
      } else {
        path = `file://${basePath}${game.image}`
      }

      return path
    }

    const onNew = (e) => {
      e.preventDefault()
      clearGame()
      reset()
    }

    const onSubmit = (data) => {
      const game = data
      
      if (selectedGames.length > 0) {
        batchUpdateGame(game)
        toast.success('Game(s) atualizados')

      } else {
        if (formState.isValid) {
          let index = games.findIndex( g => g.md5 === game.md5)
          
          if (index !== -1) {
            updateGame(game, index)
            toast.success('Game atualizado!')
          } else {
            game.md5 = md5(game.path)
            addGame(game)
            toast.success('Game salvo!')
          }
          console.log(game)

        }
      } 
      
    }

    const onSaveGamelist = (e) => {
      let gameListFile

      const toXml = (games) => {
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

      fs.writeFile(gameListFile, toXml(games), (err) => {
        if (err)
          toast.success(err.message)
        else
          toast.success('Novo Gamelist Salvo!')
      })
    }

    const hasError = (field) => errors[field]

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Field.Body>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Name" 
                       color={ hasError('name') ? 'danger': '' } 
                       name="name"
                       ref={register}
                       defaultValue={game.name}
                />
                <Input type="hidden"
                       name="md5"
                       ref={register}
                       defaultValue={game.md5}
                />
              </Control>
              <Help color={ hasError('name') ? 'danger': '' }>
                { errors.name }
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
                       ref={register}
                       defaultValue={game.path}
                />
              </Control>
              <Help color={ hasError('path') ? 'danger': '' }>
                { errors.path}
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
                       ref={register}
                       defaultValue={game.image}
                />
              </Control>
              <Help color={ hasError('image') ? 'danger': '' }>
                { errors.image}
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
                          ref={register}
                          defaultValue={game.desc}
                />
              </Control>
              <Help color={ hasError('desc') ? 'danger': '' }>
                { errors.desc}
              </Help>
            </Field>
            <Field>
              <Image.Container size={'4by3'}>
                <Image
                  src={imageFile(basePath, game)}
                />
              </Image.Container>
              <Label>
                <Checkbox name="favorite"
                          ref={register}
                          defaultChecked={game.favorite}
                /> Favorito
              </Label>
              &nbsp;
              <Label>
                <Checkbox name="hidden"
                          ref={register}
                          defaultChecked={game.hidden}
                /> Oculto
              </Label>
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
                       ref={register}
                       defaultValue={game.developer}
                />
              </Control>
              <Help color={ hasError('developer') ? 'danger': '' }>
                { errors.developer}
              </Help>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Publisher"
                       color={ hasError('publisher') ? 'danger': '' } 
                       name="publisher"
                       ref={register}
                       defaultValue={game.publisher}
                />
              </Control>
              <Help color={ hasError('publisher') ? 'danger': '' }>
                { errors.publisher}
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
                       ref={register}
                       defaultValue={game.rating}
                />
              </Control>
              <Help color={ hasError('rating') ? 'danger': '' }>
                { errors.rating}
              </Help>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Release Date"
                       color={ hasError('releasedate') ? 'danger': '' } 
                       name="releasedate"
                       ref={register}
                       defaultValue={game.releasedate}
                />
              </Control>
              <Help color={ hasError('releasedate') ? 'danger': '' }>
                { errors.releasedate}
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
                       ref={register}
                       defaultValue={game.genre}
                />
              </Control>
              <Help color={ hasError('genre') ? 'danger': '' }>
                { errors.genre}
              </Help>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Players"
                       color={ hasError('players') ? 'danger': '' } 
                       name="players"
                       ref={register}
                       defaultValue={game.players}
                />
              </Control>
              <Help color={ hasError('players') ? 'danger': '' }>
                { errors.players}
              </Help>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Region"
                       color={ hasError('region') ? 'danger': '' } 
                       name="region"
                       ref={register}
                       defaultValue={game.region}
                />
              </Control>
              <Help color={ hasError('region') ? 'danger': '' }>
                { errors.region}
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
                       ref={register}
                       defaultValue={game.core}
                />
              </Control>
              <Help color={ hasError('core') ? 'danger': '' }>
                { errors.core}
              </Help>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="Emulator"
                       color={ hasError('emulator') ? 'danger': '' } 
                       name="emulator"
                       ref={register}
                       defaultValue={game.emulator}
                />
              </Control>
              <Help color={ hasError('emulator') ? 'danger': '' }>
                { errors.emulator}
              </Help>
            </Field>
            <Field>
              <Control expanded>
                <Input type="text" 
                       placeholder="RomType"
                       color={ hasError('romtype') ? 'danger': '' } 
                       name="romtype"
                       ref={register}
                       defaultValue={game.romtype}
                />
              </Control>
              <Help color={ hasError('romtype') ? 'danger': '' }>
                { errors.romtype}
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
  games: store.gamelistState.games,
  selectedGames: store.gamelistState.selectedGames,
  game: store.gamelistState.game,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateGame, addGame, clearGame, batchUpdateGame }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GameForm)
