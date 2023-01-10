import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"

  const [notes, setNotes] = useState([]);
  
  const getNotes = async () => {
    //API CAll
    const response = await fetch(`${host}/api/notes/mynotes`, {
      method: 'GET',
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhOWVjNzE3NjNiY2Y1MmY3NmNiMDUwIn0sImlhdCI6MTY3MjE0ODcyNn0.13UaMRvyyFHGdnkj1dap3gKfj5e-4Eu41tU8AjYKeeU",
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhOWVjNzE3NjNiY2Y1MmY3NmNiMDUwIn0sImlhdCI6MTY3MjE0ODcyNn0.13UaMRvyyFHGdnkj1dap3gKfj5e-4Eu41tU8AjYKeeU",
        "Content-Type": "application/json"
      },
      body: (tag!=="") ? JSON.stringify({title, description, tag}) : JSON.stringify({title, description})
    })
    const newNote = await response.json()
    // console.log(newNote);
    //Client Side
    setNotes(notes.concat(newNote));
  }

  const editNote = async (id, title, description, tag) => {
    // console.log("Editing Notes \nFinding the note with id: "+id);

    //API Call
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhOWVjNzE3NjNiY2Y1MmY3NmNiMDUwIn0sImlhdCI6MTY3MjE0ODcyNn0.13UaMRvyyFHGdnkj1dap3gKfj5e-4Eu41tU8AjYKeeU",
        "Content-Type": "application/json"
      },
      body: (tag!=="") ? JSON.stringify({title, description, tag}) : JSON.stringify({title, description})
    })  

    //client side
    getNotes();
  }

  const deleteNote = (id) => {
    console.log("Deleted note with id = " + id);
    const newNotes = notes.filter((note)=>{return note._id!==id});
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, setNotes , addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
