import React, { useState, useContext } from "react";
import { updateProfile } from "@firebase/auth";
import { createUser } from "../../firebase/auth";
import { getAllUsers, postNewUser } from '../../../api';
import axios from "axios";
import { AuthContext } from '../../contexts/authContext/index';
import { Navigate, useNavigate } from "react-router-dom";


const Register = () => {

  const [userName, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  const navigate = useNavigate()
  const { user, setUser } = useContext(AuthContext); 


  const handleRegister = async (e) => {
    e.preventDefault()
    const formInputs = [firstName, lastName, email, password, confirmPassword];
    if(!isRegistering){
      setIsRegistering(true)
      if (formInputs.includes("") || formInputs.includes(undefined)) {
        setErrorMessage("Please fill in all fields");
        setIsRegistering(false)
        console.log('error')
        return;
      }
      
      try {
        const users = await getAllUsers();
        const userNames = users.map((user) => user.userName);
        
        if (userNames.includes(userName)) {
          setUserNameError('Sorry, this username is taken. Please choose another.');
          setIsRegistering(false)
          console.log('error')
          return;
        }
        
        if (password !== confirmPassword) {
          setPasswordError('Both passwords must match');
          setIsRegistering(false)
          console.log('error')
          return;
        }
        
        setPasswordError('')
        setUserNameError('')
        setErrorMessage('')
        
        try {
          const userCredential = await createUser(email, password);
          const updateUserProfile = await updateProfile(userCredential.user, { displayName: userName });
          const postedUser = await postNewUser(firstName, lastName, userName, dob)
          navigate('/events')
          
        } catch (error) {
          console.log('error')
          setIsRegistering(false)
        }
      } catch (error) {
        setIsRegistering(false)
        console.log(`Failed to get users: ${error.message}`)
      }
    }
  }

  return (
    <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <div className="register-form-fields">
                <label>First Name:  
                <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => {setFirstName(e.target.value);setErrorMessage('')}}
                required
                /> 
                </label>
            </div>
            <div className="register-form-fields">
                <label>Last Name:  
                <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => {setLastName(e.target.value); setErrorMessage('')}}
                required
                /> 
                </label>
            </div>
            <div className="register-form-fields">
                <label>E-Mail Address:
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value); setErrorMessage('')}}
                required
                /> 
                </label>
            </div>
            <div className="register-form-fields">
                <label>Username:

                <input
                type="text"
                id="Username"
                value={userName}
                onChange={(e) => {setUsername(e.target.value); setErrorMessage('')}}
                required
                /> 
                </label>
                {userNameError ? <p>{userNameError}</p> : null}
            </div>
            <div className="register-form-fields">
                <label>Password:

                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value); setErrorMessage('')}}
                required
                /> 
                </label>
            </div>
            <div className="register-form-fields">
                <label>Confirm password:

                <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {setConfirmPassword(e.target.value); setErrorMessage(''); setPasswordError('')}}
                required
                /> 
                </label>
                {passwordError ? <p>{passwordError}</p> : null}
            </div>
            <div className="register-form-fields">
                <label>Date of birth:

                <input
                type="date"
                id="dateOfBirth"
                value={dob}
                onChange={(e) => {setDob(e.target.value); setErrorMessage('')}}
                required
                /> 
                </label>
            </div>
            {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
            <button type="submit" disabled={isRegistering}>
                    {isRegistering ? "Registering..." : "Register"}
            </button>
        </form>
    </div>
  );
}

export default Register;