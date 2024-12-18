import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const signOut = () => {
    return auth.signOut()
}