import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../contexts/AuthContext";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/CopList";
import { increment } from "../features/CopListAddedItems";
import Alert from "./Alert";
import Axios from "axios";

const CreateCopModal = ({onClose}) => {
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [birthDate, setBirthDate] = useState();
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [policeId, setPoliceId] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState(0);
    const [password, setPassword] = useState("");
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

    console.log("el numero ",cop.phone);

    const initialRenderDone1 = useRef(false);
    useEffect(async () => {
        if(!initialRenderDone1.current) {
            initialRenderDone1.current = true;
        }
        else {
            try {
                const userCredential = await signup(email, password);
                setId(userCredential.user.uid);
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
        }
    }, [password]);

    const initialRenderDone2 = useRef(false);
    useEffect(async () => {
        if(!initialRenderDone2.current) {
            initialRenderDone2.current = true;
        }
        else {
            await createCop();
            await notifyPasswordByEmail();
            onClose();
            setIsLoading(false);
            setButtonClassName("");
            dispatch(increment());
        }
    }, [id]);

    const createCop = () => {
        return Axios.post(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/cops`, cop);
    };

    const getPassword = () => {
        return Axios.get(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/password`);
    };

    const notifyPasswordByEmail = () => {
        return Axios.post(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/password/cops/${email}`, {password: password});
    };

    const register = (async (e) => {
        e.preventDefault();

        setMessage("")
        setIsLoading(true);
        setButtonClassName("button-loading");

        const response = await getPassword();
        setPassword(response.data.password);
    });

    const style = css`
        z-index: 1000;
    `;

    return createPortal(
        <div className="modal-background">
            <form className="modal-content" onSubmit={register}>
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>Agregar un nuevo policía</h2>
                <p className="modal-description">Al finalizar este proceso el sistema generará automáticamente una contraseña que se le enviará al policía por correo. No olvide revisar que en efecto el correo indicado esté bien escrito</p>
                <div className="modal-body-horizontal">
                    <div>
                        <label htmlFor="emailInput">Correo</label><br/>
                        <input type="email" id="emailInput" placeholder="Ingrese el email" required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="phoneInput">Teléfono</label><br/>
                        <input type="tel" id="phoneInput" placeholder="Ingrese el teléfono" required onChange={(e) => setPhone(parseFloat(e.target.value)+0.1)} />
                    </div>
                </div>
                <div className="modal-body-horizontal">
                    <div>
                        <label htmlFor="nameInput">Nombre completo</label><br/>
                        <input type="text" id="nameInput" placeholder="Ingrese el nombre" required onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="birthDateInput">Fecha de nacimiento</label><br/>
                        <input type="date" id="birthDateInput" placeholder="Ingrese la fecha de nacimiento" required onChange={(e) => setBirthDate(e.target.value)} />
                    </div>
                </div>
                <div>
                    <label htmlFor="policeIdInput">Número de placa</label><br/>
                    <input type="text" id="policeIdInput" placeholder="Ingrese el número" required onChange={(e) => setPoliceId(e.target.value)} />
                </div>
                <label htmlFor="genderRadio">Género</label>
                <div className="modal-body-horizontal radio-group">
                    <label>
                        <input type="radio" name="genderRadio" value="Masculino" required onChange={(e) => setGender(e.target.value)} />
                        Masculino
                    </label>
                    <label>
                        <input type="radio" name="genderRadio" value="Femenino" required onChange={(e) => setGender(e.target.value)} />
                        Femenino
                    </label>
                    <label>
                        <input type="radio" name="genderRadio" value="Otro" required onChange={(e) => setGender(e.target.value)} />
                        Otro
                    </label>
                </div>
                {message && <Alert text={message} alertType="danger" isDeletable={false} />}
                <button type="submit" className={buttonClassName} disabled={isLoading}>
                    {isLoading ? <ClipLoader css={style} color="hsl(207, 100%, 50%)" size={20} loading /> : "Crear policía"}
                </button>
            </form>
        </div>,
        document.getElementById("portal")
    )
}

export default CreateCopModal