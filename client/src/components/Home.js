import React from 'react'
import { Container } from 'react-bootstrap'
import NotesComponent from './NotesComponent'

export default function Home() {
  return (
    <div>
      <Container>
        <NotesComponent/>
      </Container>
    </div>
  )
}
