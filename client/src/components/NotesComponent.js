import React, { useContext, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import NoteContext from '../context/notes/NoteContext';
import NoteCard from './NoteCard';

function NotesComponent() {
    const context = useContext(NoteContext);
    const { notes, getNotes } = context;
    useEffect(() => {
      getNotes();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
  return (
    <div>
      <h4 className='display-6 text-center my-4'>Your Notes</h4>
      <Container>
            <Row>
                {notes.map((element)=>{
                    return (
                        <Col className='d-flex justify-content-center my-3' key={element._id} lg='4' md='6' sm='12'>
                            <NoteCard note={element} />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    </div>
  )
}

export default NotesComponent
