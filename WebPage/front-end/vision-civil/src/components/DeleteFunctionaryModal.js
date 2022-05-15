import "../styles/Modals.scss";
import { createPortal } from "react-dom"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteItem } from "../features/FunctionaryList";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import Axios from "axios";

const DeleteFunctionaryModal = (props) => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [buttonClassName, setButtonClassName] = useState("accept-btn");
    const [hideCancelButton, setHideCancelButton] = useState(false);

    const deleteFunctionary = () => {
        return Axios.delete(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/functionaries/${props.functionaryId}`);
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
        dispatch(deleteItem({id: props.functionaryId}));
    }

    const style = css`
        z-index: 1000;
    `;

    return createPortal(
        <div className="modal-background">
            <div className="modal-content">
                <span className="close-btn" onClick={props.onClose}>&times;</span>
                <h2>¿ Estás seguro que deseas eliminar al funcionario <i>{props.emailText}</i> ?</h2>
                <p className="modal-description">El funcionario <i>{props.emailText}</i> ya no podrá acceder a Visión Civil Web, para que vuelva a poder acceder tendrá que agregarlo de nuevo</p>
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