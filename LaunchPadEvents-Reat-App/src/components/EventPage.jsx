import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../contexts/authContext"
import { getEventById, postAttendee } from "../../api"
import { Link, Navigate, useParams } from "react-router-dom"


const EventPage = () => {
    
    const {eventId} = useParams()
    const {user} = useContext(AuthContext)
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [event, setEvent] = useState({})
    

    const handleSignUp = async () => {
        await postAttendee(eventId, user.userName)
    }
    
    useEffect(() => {
            async function fetchEventById() {
                const fetchedEventById = await getEventById(eventId)
                const attendees = fetchedEventById.attendees
                await setEvent(fetchedEventById) 
                if(attendees.includes(user.userName)){
                    setIsSignedUp(true)
                }
            } 
            fetchEventById()
    }, [])

    return (
        <div className="event-page-page">
        {!user && <Navigate to="/login" state={user} replace={true} />}
        <h2>Event Page</h2>
        <div className="event-detail-container">
            <ul>
                <li>{event.name}</li>
                <li>{event.info}</li>
                <li>{event.startDateTime}</li>
                <li>{event.endDateTime}</li>
            </ul>
            
            {(!isSignedUp) ? <button type='submit' onClick={handleSignUp}>Sign Up</button> : <button disabled={true}>Already Signed Up</button>}
        </div>

    </div>
    )
}
export default EventPage