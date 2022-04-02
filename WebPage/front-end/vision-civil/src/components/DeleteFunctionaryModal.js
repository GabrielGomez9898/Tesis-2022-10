import "../styles/Modals.scss";
import { createPortal } from "react-dom"

const DeleteFunctionaryModal = (props) => {

    return createPortal(
        <div className="modal-background">
            <div className="modal-content">
                <span className="close-btn" onClick={props.onClose}>&times;</span>
                <h1>Estás seguro que deseas eliminar a este funcionario?</h1>
                <p>El funcionario ya no podrá acceder a Visión Civil Web, para que vuelva a poder acceder tendrá que agregarlo de nuevo</p>
                <div className="modal-body-horizontal">
                    <button className="cancel-btn">Cancelar</button>
                    <button className="accept-btn">Aceptar</button>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    );
}

export default DeleteFunctionaryModal;