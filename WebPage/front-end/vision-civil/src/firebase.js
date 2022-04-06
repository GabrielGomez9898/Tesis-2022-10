import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/* Main Firebase app for functionaries to authenticate, signIn and logout */
const firebaseApp = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}, "firebaseApp");

/* This Auth instance will be passed to every method for signIn to the web app and logout from it */
export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);

/* Secondary Firebase app so the current logged in master functionary 
is able to create other users without being kicked out */
export const firebaseUserCreatorApp = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}, "firebaseUserCreatorApp");

/* This Auth instance will be passed to the createUserWithEmailAndPassword() 
function that automatically signs out the current user and signs in the newly 
created user in order to preserve the session of the functionary that is creating
the new user*/
export const userCreationAuth = getAuth(firebaseUserCreatorApp);