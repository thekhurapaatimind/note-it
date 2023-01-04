import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import NoteContext from "../context/notes/NoteContext";

function NoteCard(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    const {title, description, tag, _id} = props.note;
    return (
        <Card style={{width: "18rem"}}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>{tag}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <i className="fa-solid fa-pen-to-square  me-3"></i>
                <i className="fa-solid fa-trash me-3" onClick={()=>{deleteNote(_id)}}></i>
            </Card.Footer>
        </Card>
    );
}

export default NoteCard;
