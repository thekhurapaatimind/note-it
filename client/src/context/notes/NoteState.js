import { useContext, useState } from "react";
import AlertContext from "../alerts/AlertContext";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const [notes, setNotes] = useState([]);
  
  const getNotes = async () => {
    
    //API CAll
    const response = await fetch(`${host}/api/notes/mynotes`, {
      method: 'GET',
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    })
    const json = await response.json()
    setNotes(json);

  }

  const addNote = async (title, description, tag) => {

    //API CAll
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: (tag!=="") ? JSON.stringify({title, description, tag}) : JSON.stringify({title, description})
    })
    const json = await response.json()

    if(json.success) {
      setNotes(notes.concat(json.newNote));
      showAlert("Note Added Successfully", "success");
    }
    else {
      showAlert(json.error, "success");
    }

    //Client Side
    // const newNote = {
    //   _id: json._id,
    //   user: "63a9ec71763bcf52f76cb050",
    //   title: title,
    //   description: description,
    //   tag: (tag!=="") ? tag : "General",
    //   date: "2023-01-04T14:30:20.515Z",
    //   __v: 0,
    // } 
    
  }

  const editNote = async (id, title, description, tag) => {

    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: (tag!=="") ? JSON.stringify({title, description, tag}) : JSON.stringify({title, description})
    })  
    const json = await response.json();

    if(json.success) {
      showAlert("Note Edited Successfully", "success");
      getNotes();
    }
    else {
      showAlert(json.error, "success");
    }

    //client side - Frontend

    // let newNotes = JSON.parse(JSON.stringify(notes));
    // for (let index = 0; index < newNotes.length; index++) {
    //   if(newNotes[index]._id===id) {
    //     // console.log("Found the note with id: "+id);
    //     newNotes[index].title = title;
    //     newNotes[index].description = description;
    //     newNotes[index].tag = tag;
    //     break;
    //   }      
    // }
    // setNotes(newNotes);
    
  }

  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    }) 
    
    const json = await response.json();
    
    //Client Side
    if(json.success) {
      const newNotes = notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes);
      showAlert("Note Deleted Successfully", "success");
    }
    else {
      showAlert(json.error, "success");
    }

    console.log("Deleted note with id = " + id);
  }
  
  return (
    
    <NoteContext.Provider value={{ notes, setNotes , addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>

  );
};

export default NoteState;
