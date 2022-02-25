import {useState} from "react";
import variables from "../styles/Variables.module.scss";

const Alert = (props) => {

    const [isShown, setIsShown] = useState(true);
    const handleClick = () => setIsShown(false);

    const color = {
        backgroundColor: ""
    }

    if(props.alertType === "danger") {
        color.backgroundColor = variables.dangerAlertColor;
    }
    else if(props.alertType === "success") {
        color.backgroundColor = variables.successAlertColor;
    }
    else if(props.alertType === "info") {
        color.backgroundColor = variables.infoAlertColor;
    }
    else if(props.alertType === "warning") {
        color.backgroundColor = variables.warningAlertColor;
    }

    return (
        <>
            {isShown ? 
            <div className="alert-container" id="alert-box" style={color}>
                { props.text }
                { props.isDeletable ? <span className="close-btn" onClick={handleClick}>&times;</span> : null}
            </div> : null}
        </>
    )
}

export default Alert