import "../styles/Alert.scss";
import "../styles/Forms.scss";
import React, { useState, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Alert from "./Alert";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const LoginForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { signIn, logout, isAuthenticated } = useAuth();

    const login = useCallback(async (e) => {
        e.preventDefault();

        try {
            setMessage("");
            setIsLoading(true);
            
            // Create a reference to the functionaries collection
            const functionariesRef = collection(db, "functionaries");
            // Create a query to retrieve all the documents in the collection
            const q = query(functionariesRef);
            // Execute the query
            const querySnapshot = await getDocs(q);
            // SignIn to retrieve userCredential obj
            const userCredential = await signIn(email, password);
            //Check if the user that wants to access is a functionary
            if(querySnapshot.docs.findIndex((doc) => doc.id === userCredential.user.uid) !== -1) {
                navigate("/");
            }
            else {
                await logout();
                setMessage("Solo los funcionarios tienen acceso");
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