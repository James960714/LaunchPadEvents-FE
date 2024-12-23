import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../contexts/authContext"
import { getEvents } from "../../api"
import { Link, Navigate } from "react-router-dom"
import Header from "./Header"
import { signOut } from "firebase/auth"


export const handleDate = (dateString) => {
    const date = new Date(dateString)
    const monthDate =  date.toLocaleString('en-GB', {month: 'short', day: 'numeric'})
    const day =  date.toLocaleString('en-GB', {weekday: 'short'})
    const time =  date.toLocaleString('en-GB', {hour: 'numeric', minute: 'numeric'})
    return [monthDate, day, time]
}
const EventsList = () => {
    
    const {user, staffHeadUser} = useContext(AuthContext)
    const [events, setEvents] = useState([])
    
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
    <h2 className="component-header">Events</h2>
    {staffHeadUser && 
        <button id="cud-button" type='button'><Link to='/events/create-event'>Create Event</Link>
        </button>}
        <div id="events-list-container">
            <ul id="eventList-list">
                {events.map((event) => {
                    return <li key={event._id}id="eventList-event-cards">
                        <Link id="eventCard-link" to={`/events/${event._id}`}>
                            <ul id="event-card" key={event._id}>
                                <h4 id="eventCard-eventName">{event.name}</h4>
                                <li id="eventCard-eventDateDay">{handleDate(event.startDateTime)[1]}</li>
                                <li id="eventCard-eventDateMonth">{handleDate(event.startDateTime)[0]}</li>
                                {/* <li id="eventCard-eventDateStart">{handleDate(event.startDateTime)[2]}</li> */}
                                <li id="eventCard-eventLocation">{event.location}</li>
                            </ul>
                        </Link>
                    </li>
                })}    
            </ul>    
        </div>
    </div>
    )
}
export default EventsList