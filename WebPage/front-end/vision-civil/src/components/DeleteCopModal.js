import { createPortal } from "react-dom";
import Axios from "axios";

const DeleteCopModal = (props) => {
    const deleteCop = async () => {
        await Axios.delete(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/cops/${props.copIdText}`);
        props.onClose();
    };

    return createPortal(
        <div className="modal-background">
            <div className="modal-content">
                <span className="close-btn" onClick={props.onClose}>&times;</span>
                <h1>Estás seguro que deseas eliminar a este policía?</h1>
                <p>El policía ya no podrá acceder a la aplicación móvil de Visión Civil, para que vuelva a poder acceder tendrá que agregarlo de nuevo</p>
                <div className="modal-body-horizontal">
                    <button className="cancel-btn" onClick={props.onClose}>Cancelar</button>
                    <button className="accept-btn" onClick={() => deleteCop()}>Aceptar</button>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    );
}

export default DeleteCopModal