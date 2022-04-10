import "../styles/Modals.scss";
import { createPortal } from "react-dom"
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import Axios from "axios";

const DeleteFunctionaryModal = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [buttonClassName, setButtonClassName] = useState("accept-btn");
    const [hideCancelButton, setHideCancelButton] = useState(false);

    const deleteFunctionary = () => {
        return Axios.delete(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/functionaries/${props.functionaryId}`);
    };

    const handleClick = async () => {
        setIsLoading(true);
        setButtonClassName("button-loading");
        setHideCancelButton(true);

        await deleteFunctionary();
        props.onClose();
        setIsLoading(false);
        setButtonClassName("accept-btn");
        setHideCancelButton(false);
    }

    const style = css`
        z-index: 1000;
    `;

    return createPortal(
        <div className="modal-background">
            <div className="modal-content">
                <span className="close-btn" onClick={props.onClose}>&times;</span>
                <h1>Estás seguro que deseas eliminar a este funcionario?</h1>
                <p>El funcionario ya no podrá acceder a Visión Civil Web, para que vuelva a poder acceder tendrá que agregarlo de nuevo</p>
                <div className="modal-body-horizontal">
                    <button className="cancel-btn" disabled={isLoading} hidden={hideCancelButton} onClick={props.onClose}>Cancelar</button>
                    <button className={buttonClassName} disabled={isLoading} onClick={handleClick}>
                        {isLoading ? <ClipLoader css={style} color="#2FB986" size={20} loading /> : "Aceptar"}
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    );
}

export default DeleteFunctionaryModal;