import "../styles/Alert.scss";
import "../styles/Forms.scss";
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Alert from "./Alert";

const LoginForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { signIn } = useAuth();

    const login = useCallback(async (e) => {
        e.preventDefault();

        try {
            setMessage("");
            setIsLoading(true);
            await signIn(email, password);
            navigate("/");
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
                default:
                    setMessage("Error desconocido");
                    break;
            }

            console.log(error.code);
        }

        setIsLoading(false);
    }, [email, password]);

    return (
        <>
            {message && <Alert text={message} alertType="danger" isDeletable={false} />}
            <form className="login-form" onSubmit={login}>
                <label htmlFor="email" id="email-label">Email</label><br />
                <input type="email" id="email" name="email" placeholder="Ingrese su email" required onChange={(e) => { setEmail(e.target.value) }} /><br />
                <label htmlFor="password" id="password-label">Contraseña</label><br />
                <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" required onChange={(e) => { setPassword(e.target.value) }} /><br />
                <button type="submit" disabled={isLoading}>Acceder</button>
            </form>
        </>
    )
}

export default LoginForm