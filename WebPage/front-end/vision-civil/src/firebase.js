import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCtBF-GLQE6yGMokpmJfZBzPAQn46YEODA",
    authDomain: "miproyecto-5cf83.firebaseapp.com",
    projectId: "miproyecto-5cf83",
    storageBucket: "miproyecto-5cf83.appspot.com",
    messagingSenderId: 220146342868,
    appId: "1:220146342868:web:9d691c3c19b8262d151441",
    measurementId: "G-6L9934QVKM"
});

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
        return () => unsubscribe()
    }, [])

    return <AuthContext.Provider value={{ user, error }} {...props} />
}

export const useAuthState = () => {
    const auth = useContext(AuthContext)
    return { ...auth, isAuthenticated: auth.user != null }
}

export const auth = getAuth(firebaseApp);