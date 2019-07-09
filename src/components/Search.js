import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, Control, Input, Button } from 'rbx'
import { filterGame } from '../actions'

const Search = ({ gamelist
                , filterGame
                }) => {

  const onChange = e => filterGame(e.target.value)

  return (
    <Field>
      <Control expanded>
        <Input placeholder="Digite o nome de um jogo" onChange={onChange} />
      </Control>
    </Field>
  )
}

const mapStateToProps = store => ({
  gamelist: store.gamelistState.gamelist,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ filterGame }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Search)
