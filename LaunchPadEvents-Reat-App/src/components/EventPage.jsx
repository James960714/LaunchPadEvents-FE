import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../contexts/authContext"
import { createCalendarEvent, deleteEvent, getEventById, googleCalendarAuth, postAttendee } from "../../api"
import { useNavigate, useParams } from "react-router-dom"
import { handleDate } from "./EventsList"


const EventPage = () => {
    
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [event, setEvent] = useState({})
    const [addToCalendar, setAddToCalendar] = useState(false)
    const [postEvent, setPostEvent] = useState(false)
    const [calendarEventSent, setCalendarEventSent] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
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
        try{
            await deleteEvent(event._id)
        }
        catch(err){
            console.log(err)
        }
        return navigate('/events')
    }
    useEffect(() => {
            const fetchEventById = async () => {
                const fetchedEventById = await getEventById(eventId)
                const attendees = fetchedEventById.attendees
                setEvent(fetchedEventById) 
                if(user && attendees.includes(user.userName)){
                    setIsSignedUp(true)
                }
            } 
            fetchEventById()
    }, [])

    useEffect(() => {
        if (!event || !event.name) return;
    
        const sendEventToCalendar = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const authSuccess = urlParams.get('authSuccess');
            const eventIdFromUrl = urlParams.get('eventId');
    
            if (authSuccess === 'true' && !calendarEventSent) {
                try {
                    const createEvent = await createCalendarEvent(
                        event.name,
                        event.info, 
                        formatDateTime(event.startDateTime),
                        formatDateTime(event.endDateTime)
                    );
                    navigate(`/events/${eventId}`);
                    alert('This event has been added to your Google Calendar');
                    setCalendarEventSent(true);
                } catch (err) {
                    console.log("didn't Work", err);
                }
            } else {
                console.log('url params issue in frontend');
            }
        };
    
        sendEventToCalendar();
    }, [event?.name, calendarEventSent]); 
        

    return (
        <div id="eventPage-page">
        <h2 className="component-header">Event Page</h2>
        <div className="event-detail-container">
            <h3 id="eventPage-event-name">{event.name}</h3>
            {handleDate(event.startDateTime)[0] === handleDate(event.endDateTime)[0] ? 
            (<p className="eventPage-dateTime">Date: {handleDate(event.startDateTime)[1]} {handleDate(event.startDateTime)[0]}</p>) : (<p className="eventPage-dateTime">Date: {handleDate(event.startDateTime)[1]} {handleDate(event.startDateTime)[0]} - {handleDate(event.endDateTime)[1]} {handleDate(event.endDateTime)[0]}</p>)}
            <p className="eventPage-dateTime">Time: {handleDate(event.startDateTime)[2]} - {handleDate(event.endDateTime)[2]}</p>     
            <p id="eventPage-event-info">{event.info}</p>
        </div>
        <div id="eventPage-buttons">
            {user ? 
            (staffHeadUser ? (<button className="cud-button" type='submit' onClick={handleDeleteEvent}>DELETE EVENT</button>) : !isSignedUp ? (<button id="signed-up-note" type='submit' onClick={handleSignUp}>Sign Up</button>) : (<button id="signed-up-note" disabled={true}>You are signed up to this event</button>)) : (<p><a href="/login">Login</a> to sign up to this event</p>)
        }
            {addToCalendar && <button className="google-calendar-button" type="button" onClick={handleCalendar}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Google Calendar" className="google-calendar-icon" width="24" height="24"/>Add to Google Calendar</button>
        }
        </div>
    </div>
    )
}
export default EventPage