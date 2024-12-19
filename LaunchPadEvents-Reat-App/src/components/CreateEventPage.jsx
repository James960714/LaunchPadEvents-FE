import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { postEvent } from "../../api"


const CreateEventPage = () => {
    const [eventName, setEventName] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [location, setLocation] = useState("")
    const [eventInfo, setEventInfo] = useState("")
    const [buttonClicked, setButtonClicked] = useState(false)
    
    const navigate = useNavigate()

    const handleEventCreation = async (e) => {
        e.preventDefault()
       setButtonClicked(true)
       try{
           await postEvent(eventName,startTime, endTime, location, eventInfo)     
            navigate('/events')
        }catch(err){
            console.log(err, 'error event creation')
        }
    }

    return (
        <div className="create-event-container">
        <h2>Create New Event</h2>
            <form className="create-event-form" onSubmit={handleEventCreation}>
                <div className="create-event-form-fields">
                    <label htmlFor="event-name">Event name:</label>
                        <input
                            type="text"
                            id="event-name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                </div>
                <div className="create-event-form-fields">
                    <label htmlFor="event-start-time">Event start time:</label>
                        <input
                            type="datetime-local"
                            id="event-start-time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                        />
                </div>
                <div className="create-event-form-fields">
                    <label htmlFor="event-end-time">Event end time:</label>
                        <input
                            type="datetime-local"
                            id="event-end-time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                        />
                </div>
                <div className="create-event-form-fields">
                    <label htmlFor="event-location">Event location:</label>
                        <input
                            type="text"
                            id="event-location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                </div>
                <div className="create-event-form-fields">
                    <label htmlFor="event-information">Event information:</label>
                        <input
                            type="text"
                            id="event-information"
                            value={eventInfo}
                            onChange={(e) => setEventInfo(e.target.value)}
                            required
                        />
                </div>
                <div>
                    {!buttonClicked ? <button type="submit">Create Event
                    </button> : <button type="button" disabled={true}>Create Event</button>}
                </div>
            </form>
        </div>
    )
    
}

export default CreateEventPage