import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../contexts/authContext"
import { getEvents } from "../../api"
import { Link, Navigate } from "react-router-dom"
import Header from "./Header"
import { signOut } from "firebase/auth"


const EventsList = () => {
    
    const {user, staffHeadUser} = useContext(AuthContext)
    const [events, setEvents] = useState([])
    
    const handleDate = (dateString) => {
        const date = new Date(dateString)
        const monthDate =  date.toLocaleString('en-GB', {month: 'short', day: 'numeric'})
        const day =  date.toLocaleString('en-GB', {weekday: 'short'})
        const startTime =  date.toLocaleString('en-GB', {hour: 'numeric', minute: 'numeric'})
        return [monthDate, day, startTime]
    }
    useEffect(() => {
            async function fetchEvents() {
                const fetchedEvents = await getEvents()
                await setEvents(fetchedEvents) 
                return fetchedEvents
            } 
            fetchEvents()
    }, [])

    return (
    <div className="events-list-page">
    <div className="events-list-subheader">
    <h2>Events</h2>
    {staffHeadUser && 
        <button type='button'><Link to='/events/create-event'>Create Event</Link></button>}
    </div>
        <div className="events-list-container">
            <ul>
                {events.map((event) => {
                    return <ul key={event._id} id='events-list-cards'>
                        <Link to={`/events/${event._id}`}>
                        <h4>{event.name}</h4>
                        <li>{handleDate(event.startDateTime)[0]}</li>
                        <li>{handleDate(event.startDateTime)[1]}</li>
                        <li>{handleDate(event.startDateTime)[2]}</li>
                        <li>{event.location}</li>
                        </Link>
                    </ul>
                })}    
            </ul>    
        </div>
    </div>
    )
}
export default EventsList