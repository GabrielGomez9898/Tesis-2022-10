import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { auth } from "../firebase";

export const authContext = createContext();

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState();
    const [error, setError] = useState();

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser, setError)
        return () => unsubscribe()
    }, []);

    return <authContext.Provider value={{ user, error, signup, signIn, logout }} {...props} />
}

export const useAuth = () => {
    const auth = useContext(authContext);
    return { ...auth, isAuthenticated: auth.user != null };
}