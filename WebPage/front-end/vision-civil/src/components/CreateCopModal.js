import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../contexts/AuthContext";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import Alert from "./Alert";
import Axios from "axios";

const CreateCopModal = ({onClose}) => {
    const [id, setId] = useState("");
    const [birthDate, setBirthDate] = useState();
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [policeId, setPoliceId] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [buttonClassName, setButtonClassName] =  useState("");

    const { signup } = useAuth();

    const cop = {
        id: id,
        birth_date: birthDate,
        disponible: true,
        email: email,
        enServicio: false,
        gender: gender,
        id_policia: policeId,
        name: name,
        phone: phone,
        role: "POLICIA"
    }

    const initialRenderDone = useRef(false);
    useEffect(async () => {
        if(!initialRenderDone.current) {
            initialRenderDone.current = true;
        }
        else {
            await createCop();
            onClose();
            setIsLoading(false);
            setButtonClassName("");
        }
    }, [id]);

    const createCop = () => {
        return Axios.post(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/cops`, cop);
    };

    const register = useCallback(async (e) => {
        e.preventDefault();

        try {
            if (password === confirmedPassword) {
                setMessage("")
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

    const style = css`
        z-index: 1000;
    `;

    return createPortal(
        <>
            <div className="modal-background" />
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h1>Agregar un nuevo policia</h1>
                <p>Al finalizar este proceso el policia podrá acceder a la aplicación móvil de Visión Civil con las credenciales escogidas abajo</p>
                <form className="modal-body-vertical" onSubmit={register}>
                    <label htmlFor="emailInput">Correo del nuevo policía</label>
                    <input type="email" id="emailInput" placeholder="Ingrese el email" required onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="phoneInput">Numero telefónico del nuevo policía</label>
                    <input type="tel" id="phoneInput" placeholder="Ingrese el teléfono" required onChange={(e) => setPhone(e.target.value)} />
                    <label htmlFor="nameInput">Nombre completo del nuevo policía</label>
                    <input type="text" id="nameInput" placeholder="Ingrese el nombre" required onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="birthDateInput">Fecha de nacimiento del nuevo policía</label>
                    <input type="date" id="birthDateInput" placeholder="Ingrese la fecha de nacimiento" required onChange={(e) => setBirthDate(e.target.value)} />
                    <label htmlFor="genderRadio">Genero del nuevo policía</label>
                    <input type="radio" name="genderRadio" value="Masculino" required onChange={(e) => setGender(e.target.value)} />Masculino
                    <input type="radio" name="genderRadio" value="Femenino" required onChange={(e) => setGender(e.target.value)} />Femenino
                    <input type="radio" name="genderRadio" value="Otro" required onChange={(e) => setGender(e.target.value)} />Otro
                    <label htmlFor="policeIdInput">Numero de placa policial</label>
                    <input type="text" id="policeIdInput" placeholder="Ingrese el numero" required onChange={(e) => setPoliceId(e.target.value)} />
                    {message && <Alert text={message} alertType="danger" isDeletable={true} />}
                    <label htmlFor="passwordInput">Contraseña del nuevo policía</label>
                    <input type="password" id="passwordInput" placeholder="Ingrese la contraseña" required onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="confirmedPasswordInput">Confirmación de contraseña</label>
                    <input type="password" id="confirmedPasswordInput" placeholder="Confirme la contraseña" required onChange={(e) => setConfirmedPassword(e.target.value)} />
                    <button type="submit" className={buttonClassName} disabled={isLoading}>
                        {isLoading ? <ClipLoader css={style} color="hsl(207, 100%, 50%)" size={20} loading /> : "Crear policía"}
                    </button>
                </form>
            </div>
        </>,
        document.getElementById("portal")
    )
}

export default CreateCopModal