import "../styles/Alert.scss";
import "../styles/Forms.scss";
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import Alert from "./Alert";

const LoginForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [buttonClassName, setButtonClassName] = useState("");

    const { signIn } = useAuth();

    const login = useCallback(async (e) => {
        e.preventDefault();

        try {
            setMessage("");
            setIsLoading(true);
            setButtonClassName("button-loading")
            
            const isSuccessful = await signIn(email, password);
            if(isSuccessful) {
                navigate("/");
            }
        }
        catch (error) {

            // https://firebase.google.com/docs/auth/admin/errors

            switch (error.code) {
                case "auth/internal-error":
                    setMessage("Error interno del servidor");
                    break;
                case "auth/wrong-password":
                    setMessage("Contraseña incorrecta");
                    break;
                case "auth/user-not-found":
                    setMessage("Usuario no existente");
                    break;
                case "auth/too-many-requests":
                    setMessage("Demasiados intentos");
                    break;
                case "auth/user-not-functionary":
                    setMessage("Solo los funcionarios tienen acceso");
                    break;
                default:
                    setMessage("Error desconocido");
                    break;
            }

            console.log(error.code);
        }
        
        setIsLoading(false);
        setButtonClassName("");
    }, [email, password]);

    const style = css`
        z-index: 1000;
    `;

    return (
        <>
            {message && <Alert text={message} alertType="danger" isDeletable={false} />}
            <form className="login-form" onSubmit={login}>
                <label htmlFor="email" id="email-label">Email</label><br />
                <input type="email" id="email" name="email" placeholder="Ingrese su email" required onChange={(e) => { setEmail(e.target.value) }} /><br />
                <label htmlFor="password" id="password-label">Contraseña</label><br />
                <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" required onChange={(e) => { setPassword(e.target.value) }} /><br />
                <button type="submit" className={buttonClassName} disabled={isLoading}>
                    {isLoading ? <ClipLoader css={style} color="hsl(207, 100%, 50%)" size={20} loading /> : "Acceder"}
                </button>
            </form>
        </>
    )
}

export default LoginForm