import "../styles/Modals.scss";
import { useState, useCallback, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { createPortal } from "react-dom";
import Alert from "./Alert";
import Axios from "axios";

const CreateFunctionaryModal = ({ onClose }) => {
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [isMaster, setIsMaster] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
        }
    }, [email, password, confirmedPassword]);

    return createPortal(
        <>
            <div className="modal-background" />
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h1>Agregar un nuevo funcionario</h1>
                <p>Al finalizar este proceso el funcionario podrá acceder a Visión Civil Web con las credenciales escogidas abajo</p>
                <form className="modal-body-vertical" onSubmit={register}>
                    <label htmlFor="emailInput">Correo del nuevo funcionario</label>
                    <input type="email" id="emailInput" placeholder="Ingrese el email" required onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="isMasterRadio">Seleccione el tipo de funcionario</label>
                    <input type="radio" name="isMasterRadio" value={false} required onChange={(e) => setIsMaster(e.target.value)} />Funcionario normal
                    <input type="radio" name="isMasterRadio" value={true} required onChange={(e) => setIsMaster(e.target.value)} />Funcionario master
                    {message && <Alert text={message} alertType="danger" isDeletable={true} />}
                    <label htmlFor="passwordInput">Contraseña del nuevo funcionario</label>
                    <input type="password" id="passwordInput" placeholder="Ingrese la contraseña" required onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="confirmedPasswordInput">Confirmación de contraseña</label>
                    <input type="password" id="confirmedPasswordInput" placeholder="Confirme la contraseña" required onChange={(e) => setConfirmedPassword(e.target.value)} />
                    <button type="submit" disabled={isLoading}>Crear funcionario</button>
                </form>
            </div>
        </>,
        document.getElementById("portal")
    )
}

export default CreateFunctionaryModal