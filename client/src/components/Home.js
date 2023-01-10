import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import NotesComponent from './NotesComponent'
import NoteModal from './NoteModal'

export default function Home() {
  return (
    <div>
      <Container>
        <Container className='mt-5'>
          <Row>
            <Col className='d-flex justify-content-center my-3' lg='4' md='6' sm='12'>
              <NoteModal heading="Add New Note" useType="add"/>
            </Col>
          </Row>
        </Container>
        <NotesComponent />
      </Container>
    </div>
  )
}
