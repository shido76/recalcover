import React from 'react'
import FileBodyComponent from './components/FileBodyComponent'
import ListGame from './components/ListGame'
import GameForm from './components/GameForm/'
import NotificationWrapper from './components/NotificationWrapper'
import { Column, Section, Container } from 'rbx'

function App() {

  return (
    <Section>
      <Container>
        <NotificationWrapper />
        <FileBodyComponent />
        <Column.Group>
          <Column size="half">
            <ListGame />
          </Column>
          <Column>
            <GameForm />
          </Column>
        </Column.Group>
      </Container>
    </Section>
  )
}

export default App