import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../contexts/authContext"
import { createCalendarEvent, deleteEvent, getEventById, googleCalendarAuth, postAttendee } from "../../api"
import { useNavigate, useParams } from "react-router-dom"



const EventPage = () => {
    
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [event, setEvent] = useState({})
    const [addToCalendar, setAddToCalendar] = useState(false)
    const [postEvent, setPostEvent] = useState(false)
    const [calendarEventSent, setCalendarEventSent] = useState(false)
    const {eventId} = useParams()
    const {user, staffHeadUser} = useContext(AuthContext)

    const navigate = useNavigate()

    const formatDateTime = (dateTime => {
        console.log(dateTime)
        const date = new Date(dateTime);
        return date.toISOString().split("Z")[0];
    })
    
    const handleSignUp = async () => {
        await postAttendee(eventId, user.userName)
        setIsSignedUp(true)
        setAddToCalendar(true)
        setPostEvent(true)
    }

    const handleCalendar = async () => {
        try{
            await googleCalendarAuth(eventId)
        }catch(err){
            console.log(err)
        }

    }
    const handleDeleteEvent = async() => {
        await deleteEvent(event._id)
        .then(() => {
            navigate('/events')
        })
    }
    useEffect(() => {
            const fetchEventById = async () => {
                const fetchedEventById = await getEventById(eventId)
                const attendees = fetchedEventById.attendees
                setEvent(fetchedEventById) 
                if(attendees.includes(user.userName)){
                    setIsSignedUp(true)
                }
            } 
            fetchEventById()
    }, [eventId, user.userName])

    useEffect(() => {
        const sendEventToCalendar = async () => {
            const urlParams = new URLSearchParams(window.location.search)
            const authSuccess = urlParams.get('authSuccess')
            const eventIdFromUrl = urlParams.get('eventId')
        
            if (authSuccess==='true' && !calendarEventSent){
                try{
                    const createEvent = await createCalendarEvent(
                        event.name,
                        event.info, 
                        formatDateTime(event.startDateTime),
                        formatDateTime(event.endDateTime)
                    )
                    console.log('events created', createEvent)
                    setCalendarEventSent(true)
                }catch(err) {
                    console.log("didn't Work", err)
                }
            }else{
                console.log('url params issue in frontend')
            }
        } 
        sendEventToCalendar()
    },[event, calendarEventSent])
        

    return (
        <div className="event-page-page">
        <h2>Event Page</h2>
        <div className="event-detail-container">
            <ul>
                <li>{event.name}</li>
                <li>{event.info}</li>
                <li>{event.startDateTime}</li>
                <li>{event.endDateTime}</li>
            </ul>
            {staffHeadUser ? (<button type='submit' onClick={handleDeleteEvent}>DELETE EVENT</button>) : !isSignedUp ? (<button type='submit' onClick={handleSignUp}>Sign Up</button>) : (<button disabled={true}>You are signed up to this event</button>)}
            {addToCalendar && <button type='button' onClick={handleCalendar}>Add To Calendar</button>}
        </div>

    </div>
    )
}
export default EventPage