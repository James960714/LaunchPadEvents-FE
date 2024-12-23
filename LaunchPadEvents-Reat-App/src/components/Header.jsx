import { AuthContext } from "../contexts/authContext"
import { signOut } from "../firebase/auth"
import { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
const Header = () => {

    const [isSigningOut, setIsSigningOut] = useState(false)
    const [error, setError] = useState(null)
    const {setUser, setFirebaseUser, setStaffHeadUser, user} = useContext(AuthContext)
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
        <div id="header-div">
            <h1 id="header-title">Events Platform</h1>
            <button id="signout-button" type='button' onClick={handleSignOut}>sign out</button>
        </div>
        <div>
        <Link to="/events"><button id='navButton' type="botton">Events</button></Link>
        </div>
        </>
    )
};


export default Header