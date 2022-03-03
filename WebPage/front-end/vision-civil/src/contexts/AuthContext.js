import React, { useContext, useState, useEffect } from "react";
import {auth} from "../firebase";

/* Los context en React son los que resultan del uso del hook useContext().
    Cuando se utilizan contextos todo se reparte en dos grandes secciones:
    Se tiene el context provider (Abajo <AuthContext.Provider/>) que es donde
    vas a colocar todo el código que necesita acceso a toda la información en el contexto.
    La unica propiedad que debe tener el tag del context provider es value={}, la cual va
    a ser igual al valor del contexto en ese momento. 
    Utilizar contextos sirve para pasar props a los hijos de un elemento sin tener que pasar props
    como parametro a cada rato. Al utilizar contextos todos los hijos van a tener acceso a esas props.
    d  */

const AuthContext = React.createContext();

export const useAuth = () => { // Hook personalizado que retorna directamente el contexto de autenticación
    return useContext(AuthContext);
}

export const AuthProvider = (props) => {
    const [currentUser, setCurrentUser] = useState();

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup
    }

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    );
}