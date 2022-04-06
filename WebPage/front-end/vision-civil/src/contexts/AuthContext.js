import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { auth, userCreationAuth } from "../firebase";

export const authContext = createContext();

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(userCreationAuth, email, password);
    };

    const signIn = (email, password, rememberMe = true) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        }, setError)
        return () => unsubscribe()
    }, []);

    return <authContext.Provider value={{ user, error, isLoading, signup, signIn, logout }} {...props} />
}

export const useAuth = () => {
    const auth = useContext(authContext);
    return { ...auth, isAuthenticated: auth.user != null };
}