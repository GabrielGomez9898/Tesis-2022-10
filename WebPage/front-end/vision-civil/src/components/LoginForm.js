import "../styles/Alert.scss";
import "../styles/Forms.scss";
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Alert from "./Alert";

const LoginForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const login = useCallback(async (e) => {
        e.preventDefault();

        try {
            setMessage("");
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password).then( (userCredential) => {
                console.log(userCredential);
                const user = userCredential.user;
            });
            navigate("/");
        }
        catch {
            setMessage("Error al tratar de acceder");
        }

        setIsLoading(false);
    }, [email, password]);

    return (
        <>
            {message && <Alert text={message} alertType="danger" isDeletable={false}/>}
            <form className="login-form" onSubmit={login}>
                <label htmlFor="email" id="email-label">Email</label><br/>
                <input type="email" id="email" name="email" placeholder="Ingrese su email" required onChange={(e) => {setEmail(e.target.value)}}/><br/>
                <label htmlFor="password" id="password-label">Contraseña</label><br/>
                <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" required onChange={(e) => {setPassword(e.target.value)}}/><br/>
                <button type="submit" disabled={isLoading}>Acceder</button>
            </form>
        </>
    )
}

export default LoginForm