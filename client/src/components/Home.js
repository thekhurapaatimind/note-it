import React, { useContext, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import NoteContext from '../context/notes/NoteContext';
import NotesComponent from './NotesComponent'
import NoteModal from './NoteModal'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  const { getNotes } = context;
  useEffect(() => {
    if(localStorage.getItem('token')) {
      getNotes();
    }
    else {
      navigate("/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
