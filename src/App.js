import React from 'react'
import FileBodyComponent from './components/FileBodyComponent'
import ListGame from './components/ListGame'
import GameDetail from './components/GameDetail'
import { Column, Section, Container } from 'rbx'

function App() {
  
  return (
    <Section>
      <Container>
        <FileBodyComponent />
        <Column.Group>
          <Column>
            <ListGame />
          </Column>
          <Column>
            <GameDetail />
          </Column>
        </Column.Group>
      </Container>
    </Section>
  )
}

export default App

