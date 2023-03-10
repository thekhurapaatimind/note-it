import React, { useContext, useState } from 'react';
import { Button, Form, Modal, Card } from 'react-bootstrap';
import NoteContext from '../context/notes/NoteContext';

function NoteModal(props) {
    const context = useContext(NoteContext);
    const { addNote, editNote } = context;
    const [note, setNote] = useState({ title: props.title, description: props.description, tag: props.tag })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setNote({ title: props.title, description: props.description, tag: props.tag })
    }

    const handleClick = (e) => {
        e.preventDefault();
        if(props.useType==="add")
            addNote(note.title, note.description, note.tag);
        else if(props.useType==="edit") {
            editNote(props.id, note.title, note.description, note.tag);
        }
        handleClose();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            {props.useType==="edit" && <i className="fa-solid fa-pen-to-square  me-3" onClick={handleShow}></i>}
            {props.useType==="add" && <Card className="d-flex align-items-center justify-content-center" onClick={handleShow} style={{ width: "18rem", height: "150px", cursor: "pointer" }}>
                <Card.Text className='display-4'>
                    <i className="fa-regular fa-plus"></i>
                </Card.Text>
            </Card>}

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleClick}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.heading}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    as="input"
                                    value={note.title}
                                    onChange={onChange}
                                    name="title"
                                    minLength={5}
                                    required
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    value={note.description}
                                    onChange={onChange}
                                    name="description"
                                    rows={5}
                                    minLength={5}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tags(Optional)</Form.Label>
                                <Form.Control
                                    as="input"
                                    value={note.tag}
                                    onChange={onChange}
                                    name="tag"
                                />
                            </Form.Group>
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: 'center' }}>
                        <Button variant="danger" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button disabled={note.title.length<5 || note.description.length<5} type="submit" variant="success">
                            Apply
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

NoteModal.defaultProps = {
    title: "",
    description: "",
    tag: ""
}
export default NoteModal