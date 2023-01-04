import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const [state, setstate] = useState("hello")
    return (
        <NoteContext.Provider value={{state, setstate}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;