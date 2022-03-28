import "../styles/Alert.scss";
import "../styles/Forms.scss";
import React, { useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import Alert from "./Alert";

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { signup } = useAuth();

    const register = useCallback(async (e) => {
        e.preventDefault();

        try {
            if(password === confirmedPassword) {
                setMessage("");
                setIsLoading(true);
                await signup(email, password);
            }
            else {
                setMessage("Las contraseñas no coinciden");
            }
        }
        catch(error) {

            // https://firebase.google.com/docs/auth/admin/errors

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
                default:
                    setMessage("Error desconocido");
                    break;
            }

            console.log(error);
        }

        setIsLoading(false);
    }, [email, password, confirmedPassword]);

    return (
        <>
            {message && <Alert text={message} alertType="danger" isDeletable={false}/>}
            <form className="login-form" onSubmit={register}>
                <label htmlFor="email" id="email-label">Email</label><br/>
                <input type="email" id="email" name="email" placeholder="Ingrese su email" required onChange={(e) => {setEmail(e.target.value)}}/><br/>
                <label htmlFor="password" id="password-label">Contraseña</label><br/>
                <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" required onChange={(e) => {setPassword(e.target.value)}}/><br/>
                <label htmlFor="repeat-password" id="repeat-password-label">Contraseña</label><br/>
                <input type="password" id="repeat-password" name="repeat-password" placeholder="Confirme su contraseña" required onChange={(e) => {setConfirmedPassword(e.target.value)}}/><br/>
                <button type="submit" disabled={isLoading}>Registrar</button>
            </form>
        </>
    )
}

export default SignupForm