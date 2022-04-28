import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Alert from "./Alert";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";

const ChangePasswordForm = () => {
    const navigate = useNavigate();

    const { changePassword } = useAuth();

    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [message, setMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [buttonClassName, setButtonClassName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setMessage("");
            setSuccessMessage("");
            setIsLoading(true);
            setButtonClassName("button-loading");

            if(newPassword === confirmedPassword) {
                await changePassword(newPassword);
                setSuccessMessage("La contraseña ha sido cambiada con éxito");
                console.log("Las contraseñas son iguales")
            }
            else {
                setTimeout(() => {
                    setMessage("Las contraseñas no coinciden");
                }, 50);
                console.log("Las contraseñas NO son iguales");
                console.log(message);
            }
        }
        catch (error) {
            console.log(error);
            switch (error.code) {
                // https://firebase.google.com/docs/auth/admin/errors

                case "auth/internal-error":
                    setMessage("Error interno del servidor");
                    break;
                case "auth/weak-password":
                    setMessage("La contraseña debe tener por lo menos 6 caracteres");
                    break;
                case "auth/too-many-requests":
                    setMessage("Demasiados intentos");
                    break;
                default:
                    setMessage("Error desconocido");
                    break;
            }
        }

        setIsLoading(false);
        setButtonClassName("");
        clearInputs();
    };

    const clearInputs = () => {
        setNewPassword("");
        setConfirmedPassword("");
    };

    const style = css`
    z-index: 1000;
    `;

    return createPortal(
        <div className="password-modal-background">
            <form className="login-modal-content" onSubmit={handleSubmit}>
                <h2>Cambia tu contraseña</h2>
                {message && <Alert text={message} alertType="danger" isDeletable={false} />}
                {successMessage && <Alert text={successMessage} alertType="success" isDeletable={false} />}
                <div>
                    <label htmlFor="new-password">Nueva contraseña</label><br />
                    <input type="password" id="new-password" placeholder="Ingrese la nueva contraseña" value={newPassword} required onChange={(e) => { setNewPassword(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="confirmed-password">Confirme nueva contraseña</label><br />
                    <input type="password" id="confirmed-password" placeholder="Confirme la nueva contraseña" value={confirmedPassword} required onChange={(e) => { setConfirmedPassword(e.target.value) }} />
                </div>
                <button type="submit" className={buttonClassName} disabled={isLoading}>
                    {isLoading ? <ClipLoader css={style} color="hsl(207, 100%, 50%)" size={20} loading /> : "Cambiar contraseña"}
                </button>
                <a onClick={() => navigate("/")}><u>Regresa a la aplicación</u></a>
            </form>
        </div>,
        document.getElementById("portal")
    );
    }

    export default ChangePasswordForm;