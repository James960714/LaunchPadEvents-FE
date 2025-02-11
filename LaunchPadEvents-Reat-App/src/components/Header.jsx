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
                navigate("/events")
            }catch (err){
                console.log(err, 'fail')
            } 
        }
        
        
        return (
        <>
        <div id="header-div">
            <h1 id="header-title">Select Events</h1>
            {user ? (<button id="signout-button" type='button' onClick={handleSignOut}>sign out</button>) : (<button id="signout-button" type="button"><Link to="/login">sign in</Link></button>)}
        </div>
        <div>
            <p id="website-info">
                Welcome to Select Events. Browse upcoming events, sign up to them and add them to your google calendar 
            </p>
        </div>
        <div>
            <Link to="/events"><button id='navButton' type="button">Events</button></Link>
            <Link to="/privacy-policy"><button id='navButton' type="button">Privacy Policy</button></Link>
        </div>
        </>
    )
};


export default Header