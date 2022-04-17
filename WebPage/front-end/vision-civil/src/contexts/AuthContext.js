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
import { db } from "../firebase";
import { collection, query, where, getDocs, doc } from "firebase/firestore";

export const authContext = createContext();

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        }, setError)
        return () => unsubscribe()
    }, []);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(userCreationAuth, email, password);
    };

    const signIn = async (email, password, rememberMe = true) => {
        // Create a reference to the functionaries collection
        const functionariesRef = collection(db, "functionaries");
        // Create a query to retrieve all the documents in the collection
        const q = query(functionariesRef);
        // Execute the query
        const querySnapshot = await getDocs(q);
        // SignIn to retrieve the userCredential obj
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        //Check if the user that wants to access is a functionary
        const index = querySnapshot.docs.findIndex((doc) => doc.id === userCredential.user.uid);
        if(index !== -1) {
            const functionaryObj = querySnapshot.docs[index].data();
            localStorage.setItem("isMaster", functionaryObj["isMaster"]);
            return true;
        }
        else {
            await logout();
            throw {code: "auth/user-not-functionary"};
        }
    }

    const logout = () => signOut(auth);

    return <authContext.Provider value={{ user, error, isLoading, signup, signIn, logout }} {...props} />
}

export const useAuth = () => {
    const auth = useContext(authContext);
    return { ...auth, isAuthenticated: auth.user != null };
}