import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const initnotes = [
    {
      _id: "63ab35eec5457823919c2daf",
      user: "63a9ec71763bcf52f76cb050",
      title: "My First Note",
      description: "I am learning to add Notes",
      tag: "ReactJs",
      date: "2022-12-27T18:14:06.928Z",
      __v: 0,
    },
    {
      _id: "63ad97fb8d035821f1e112ab",
      user: "63a9ec71763bcf52f76cb050",
      title: "My nth Note",
      description: "I am still learning to update Notes",
      tag: "ReactJs",
      date: "2022-12-29T13:36:59.126Z",
      __v: 0,
    },
    {
      _id: "63b58d7b793bb8d8008ec9bf",
      user: "63a9ec71763bcf52f76cb050",
      title: "My First Note",
      description: "I am learning to add Notes",
      tag: "ReactJs",
      date: "2023-01-04T14:30:19.208Z",
      __v: 0,
    },
    {
      _id: "63b58d7b793bb8d8008ec9c1",
      user: "63a9ec71763bcf52f76cb050",
      title: "My First Note",
      description: "I am learning to add Notes",
      tag: "ReactJs",
      date: "2023-01-04T14:30:19.906Z",
      __v: 0,
    },
    {
      _id: "63b58d7c793bb8d8008ec9c3",
      user: "63a9ec71763bcf52f76cb050",
      title: "My First Note",
      description: "I am learning to add Notes",
      tag: "ReactJs",
      date: "2023-01-04T14:30:20.515Z",
      __v: 0,
    },
  ]

  const [notes, setNotes] = useState(initnotes);
  
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
