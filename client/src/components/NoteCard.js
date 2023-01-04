import React from "react";
import { Card } from "react-bootstrap";

function NoteCard(props) {

    const {title, description, tag} = props.note;
    return (
        <Card style={{width: "18rem"}}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>{tag}</Card.Text>
            </Card.Body>
            <Card.Footer>
                
            </Card.Footer>
        </Card>
    );
}

export default NoteCard;
