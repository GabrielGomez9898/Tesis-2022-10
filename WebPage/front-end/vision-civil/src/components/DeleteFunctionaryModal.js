import "../styles/Modals.scss";
import { createPortal } from "react-dom"
import { useEffect } from "react";
import Axios from "axios";

const DeleteFunctionaryModal = (props) => {

    const deleteFunctionary = async () => {
        await Axios.delete(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/functionaries/${props.functionaryId}`);
        props.onClose();
    };

    return createPortal(
        <div className="modal-background">
            <div className="modal-content">
                <span className="close-btn" onClick={props.onClose}>&times;</span>
                <h1>Estás seguro que deseas eliminar a este funcionario?</h1>
                <p>El funcionario ya no podrá acceder a Visión Civil Web, para que vuelva a poder acceder tendrá que agregarlo de nuevo</p>
                <div className="modal-body-horizontal">
                    <button className="cancel-btn" onClick={props.onClose}>Cancelar</button>
                    <button className="accept-btn" onClick={() => deleteFunctionary()}>Aceptar</button>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    );
}

export default DeleteFunctionaryModal;