import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import NoteContext from "../context/notes/NoteContext";
import NoteModal from "./NoteModal";

function NoteCard(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    const {title, description, tag, _id} = props.note;
    return (
        <Card style={{width: "18rem"}}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text className="text-muted">{tag}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <NoteModal useType="edit" heading="Edit Note" title={title} description={description} tag={tag} id={_id}/>
                <i className="fa-solid fa-trash me-3" onClick={()=>{deleteNote(_id)}}></i>
            </Card.Footer>
        </Card>
    );
}

export default NoteCard;
