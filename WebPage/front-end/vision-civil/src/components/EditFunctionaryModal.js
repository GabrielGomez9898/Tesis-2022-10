import "../styles/Modals.scss";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Axios from "axios";

const EditFunctionaryModal = (props) => {
    const [isMaster, setIsMaster] = useState();

    const updateFunctionary = () => {
        return Axios.patch(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/functionaries/${props.functionaryId}`, {isMaster: isMaster});
    };

    useEffect( async () => {
        await updateFunctionary();
        props.onClose();
    }, [isMaster])

    return createPortal(
        <>
            <div className="modal-background"/>
            <div className="modal-content">
                <span className="close-btn" onClick={props.onClose}>&times;</span>
                <h1>Seleccionar privilegios del funcionario</h1>
                <div className="modal-body-horizontal">
                    <button onClick={() => setIsMaster(false)}>Privilegios normales</button>
                    <button onClick={() => setIsMaster(true)}>Privilegios master</button>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
}

export default EditFunctionaryModal;