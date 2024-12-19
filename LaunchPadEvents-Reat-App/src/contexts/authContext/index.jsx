import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { getUserByUserName } from "../../../api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [staffHeadUser, setStaffHeadUser] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setFirebaseUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                });
                try{
                    const dbUser = await getUserByUserName(firebaseUser.displayName)
                    setUser(dbUser.data.user)
                    if(dbUser.data.user.userType === 'Staff' || dbUser.data.user.userType === 'Head'){
                        await setStaffHeadUser(true)
                    }
                }catch(err){
                    console.log(err)
                    setUser(null)
                }
            } else {
                setFirebaseUser(null);
            }
            setLoading(false); 
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <AuthContext.Provider value={{ user, setUser, firebaseUser, setFirebaseUser, staffHeadUser, setStaffHeadUser }}>
            {children}
        </AuthContext.Provider>
    );
};

