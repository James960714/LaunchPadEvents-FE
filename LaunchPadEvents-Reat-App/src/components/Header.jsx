import { AuthContext } from "../contexts/authContext"
import { signOut } from "../firebase/auth"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
const Header = () => {

    const [isSigningOut, setIsSigningOut] = useState(false)
    const [error, setError] = useState(null)
    const {setUser, setFirebaseUser, setStaffHeadUser} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSignOut = async () => {
            try{
                await signOut()
                setUser(null)
                setFirebaseUser(null)
                setStaffHeadUser(false)
                navigate("/login")
            }catch (err){
                console.log(err, 'fail')
            } 
        }
        
        
        return (
            <>
        <h1 className="header-title">Events Platform</h1>
        <button type='button' onClick={handleSignOut}>sign out</button>
        </>
    )
};


export default Header