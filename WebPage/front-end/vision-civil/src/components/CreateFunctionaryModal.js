import "../styles/Modals.scss";
import { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/FunctionaryList";
import { useAuth } from "../contexts/AuthContext";
import { createPortal } from "react-dom";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import Alert from "./Alert";
import Axios from "axios";

const CreateFunctionaryModal = ({ onClose }) => {
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [isMaster, setIsMaster] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [buttonClassName, setButtonClassName] = useState("");

    const { signup } = useAuth();

    const functionary = {
        id: id,
        email: email,
        isMaster: isMaster
    }

    const initialRenderDone = useRef(false);
    useEffect(async () => {
        if(!initialRenderDone.current) {
            initialRenderDone.current = true;
        }
        else {
            await createFunctionary();
            onClose();
            setIsLoading(false);
            setButtonClassName("");
            dispatch(addItem(functionary));
        }
    }, [id]);

    const createFunctionary = () => {
        return Axios.post(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/functionaries`, functionary);
    };

    const register = useCallback(async (e) => {
        e.preventDefault();

        try {
            if(password === confirmedPassword) {
                setMessage("");
                setIsLoading(true);
                setButtonClassName("button-loading");
    
                const userCredential = await signup(email, password);
                setId(userCredential.user.uid);
            }
            else {
                setMessage("Las contraseñas no coinciden");
            }
        }
        catch (error) {
            // https://firebase.google.com/docs/auth/admin/errors

            console.log(error);

            switch (error.code) {
                case "auth/internal-error":
                    setMessage("Error interno del servidor");
                    break;
                case "auth/invalid-email":
                    setMessage("El email provisto no tiene un formato válido");
                    break;
                case "auth/invalid-password":
                    setMessage("La contraseña debe tener por lo menos 6 caracteres");
                    break;
                case "auth/email-already-exists":
                    setMessage("El email provisto ya está en uso por otro usuario");
                    break;
                case "auth/email-already-in-use":
                    setMessage("El email provisto ya está en uso por otro usuario");
                    break;
                default:
                    setMessage("Error desconocido");
                    break;
            }
            setIsLoading(false);
            setButtonClassName("");
        }
    }, [email, password, confirmedPassword]);

    const handleRadioChange = (e) => {
        if(e.target.value === "false") {
            setIsMaster(false);
        }
        else if(e.target.value === "true") {
            setIsMaster(true);
        }
    };

    const style = css`
        z-index: 1000;
    `;

    return createPortal(
        <div className="modal-background">
            <form className="modal-content" onSubmit={register}>
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>Agregar un nuevo funcionario</h2>
                <p className="modal-description">Al finalizar este proceso el funcionario podrá acceder a Visión Civil Web con las credenciales escogidas abajo</p>
                <div>
                    <label htmlFor="emailInput">Correo</label><br/>
                    <input type="email" id="emailInput" placeholder="Ingrese el email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <label htmlFor="isMasterRadio">Tipo de funcionario</label>
                <div className="modal-body-horizontal radio-group">
                    <label>
                        <input type="radio" name="isMasterRadio" value="false" required onChange={(e) => handleRadioChange(e)} />
                        Funcionario normal
                    </label>
                    <label>
                        <input type="radio" name="isMasterRadio" value="true" required onChange={(e) => handleRadioChange(e)} />
                        Funcionario master
                    </label>
                </div>
                {message && <Alert text={message} alertType="danger" isDeletable={true} />}
                <div>
                    <label htmlFor="passwordInput">Contraseña</label><br/>
                    <input type="password" id="passwordInput" placeholder="Ingrese la contraseña" required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="confirmedPasswordInput">Confirme contraseña</label><br/>
                    <input type="password" id="confirmedPasswordInput" placeholder="Confirme la contraseña" required onChange={(e) => setConfirmedPassword(e.target.value)} />
                </div>
                <button type="submit" className={buttonClassName} disabled={isLoading}>
                    {isLoading ? <ClipLoader css={style} color="hsl(207, 100%, 50%)" size={20} loading /> : "Crear funcionario"}
                </button>
            </form>
        </div>,
        document.getElementById("portal")
    )
}

export default CreateFunctionaryModal