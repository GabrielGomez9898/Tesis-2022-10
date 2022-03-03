import "../styles/Alert.scss";
import "../styles/Forms.scss";
import React, { useState, useCallback } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Alert from "./Alert";

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const register = useCallback(async (e) => {
        e.preventDefault();

        try {
            if(password === confirmedPassword) {
                setMessage("");
                setIsLoading(true);
                await createUserWithEmailAndPassword(auth, email, password).then( (userCredential) => {
                    console.log(userCredential);
                    const user = userCredential.user;
                    // sessionStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
                });
            }
            else {
                setMessage("Las contraseñas no coinciden");
            }
        }
        catch {
            setMessage("Error al hacer el registro");
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