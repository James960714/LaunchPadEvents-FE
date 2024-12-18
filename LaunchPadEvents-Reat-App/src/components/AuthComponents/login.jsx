import React, {useState, useContext} from "react";
import { Link, Navigate } from "react-router-dom";
import { signIn } from "../../firebase/auth";
import { AuthContext } from "../../contexts/authContext/index";
import {auth} from '../../firebase/firebase'
import { getUserByUserName } from "../../../api";

const LogIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [error, setError] = useState(null)

    const { user, setUser } = useContext(AuthContext); 
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError(null); 
        
        if (!isSigningIn) {
            setIsSigningIn(true);
            try{
                await signIn(email, password)
            }catch (err){
                setError(err)
                console.log(err, 'fail')
            } finally {
                setIsSigningIn(false);
            }
        }
    };


    return (
        <div className="login-container">
            {user && <Navigate to="/events" state={user} replace={true} />}
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className="login-form-fields">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="login-form-fields">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" disabled={isSigningIn}>
                    {isSigningIn ? "Signing In..." : "Log In"}
                </button>
            </form>
            <div className='register-route-container'>
                <h2>Dont have an account?</h2>
                <Link to='/register'>
                    <button>
                        Create Account
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LogIn;
