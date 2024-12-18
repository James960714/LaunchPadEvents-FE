import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../contexts/authContext"
import { getEvents } from "../../api"
import { Link } from "react-router-dom"


const Profile = () => {
    
    const {user} = useContext(AuthContext)
    return (
    <>
    <h2>Profile</h2>
    </>
    )
}
export default Profile