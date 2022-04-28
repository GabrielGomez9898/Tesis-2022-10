import { useState } from "react";
import { createPortal } from "react-dom";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useDispatch } from "react-redux";
import { deleteItem } from "../features/CopList";
import Axios from "axios";

const DeleteCopModal = (props) => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [buttonClassName, setButtonClassName] = useState("accept-btn");
    const [hideCancelButton, setHideCancelButton] = useState(false);

    const deleteCop = () => {
        return Axios.delete(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/cops/${props.copIdText}`);
        
    };

    const handleClick = async () => {
        setIsLoading(true);
        setButtonClassName("button-loading");
        setHideCancelButton(true);

        await deleteCop();
        props.onClose();
        setIsLoading(false);
        setButtonClassName("accept-btn");
        setHideCancelButton(false);
        dispatch(deleteItem({id: props.copIdText}));
    };

    const style = css`
        z-index: 1000;
    `;

    return createPortal(
        <div className="modal-background">
            <div className="modal-content">
                <span className="close-btn" onClick={props.onClose}>&times;</span>
                <h2>¿ Estás seguro que deseas eliminar al policía <i>{props.nameText}</i> ?</h2>
                <p className="modal-description">El policía <i>{props.nameText}</i> ya no podrá acceder a la aplicación móvil de Visión Civil, para que vuelva a poder acceder tendrá que agregarlo de nuevo</p>
                <div className="modal-body-horizontal">
                    <button className="cancel-btn" hidden={hideCancelButton} onClick={props.onClose}>Cancelar</button>
                    <button className={buttonClassName} onClick={handleClick}>
                        {isLoading ? <ClipLoader css={style} color="#2FB986" size={20} loading /> : "Aceptar"}
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    );
}

export default DeleteCopModal