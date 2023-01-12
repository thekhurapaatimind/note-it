import { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
    const [alert, setAlert] = useState(null)

    const showAlert = (message, type) => {
        setTimeout(() => {
            setAlert(null)
        }, 2500);
        setAlert({
            msg: message,
            type: type
        })
    }
    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;