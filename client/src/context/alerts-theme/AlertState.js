import { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {

    //--------ALERT--------//
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

    //--------THEME--------//
    const [mode, setmode] = useState('light');
    const [bgColor, setbgColor] = useState('#E6E9EA')
    document.body.style.backgroundColor = bgColor;

    const toggleMode = () => {
        if (mode === 'dark') {
            setmode('light');
            setbgColor('#E6E9EA');
        }
        else {
            setmode('dark');
            setbgColor('#000124');
        }
    }
    return (
        <AlertContext.Provider value={{ alert, showAlert, mode, toggleMode }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;