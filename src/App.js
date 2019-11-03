import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FileBodyComponent from './components/FileBodyComponent'
import ListGame from './components/ListGame'
import GameForm from './components/GameForm'
import { Column, Container, Card } from 'rbx'

function App() {

  return (
    <Card>
      <Card.Content>
        <Container>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
          />
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
      </Card.Content> 
    </Card>
  )
}

export default App