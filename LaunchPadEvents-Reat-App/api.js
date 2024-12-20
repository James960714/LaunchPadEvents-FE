import axios from 'axios';

const launchPadEventsApi = axios.create({
    baseURL: 'https://launchpadeventsplatform.onrender.com',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

export const getAllUsers = async () => {
    try{
        const users = await launchPadEventsApi.get('/users')
        return users.data.users
    } catch(err){
        console.log(err)
    }
} 
export const getUserByUserName = async (userName) => {
    try{
        const user = await launchPadEventsApi.get(`/users/${userName}`)
        return user
    }catch(err){
        console.log(err, 'api err')
    }
} 
export const postNewUser = async (firstName, lastName, userName, dob) => {

    const newUser = await launchPadEventsApi.post('/users/user', {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        dob: dob
    })
    return newUser.data
}
export const getEvents = async () => {
    const events = await launchPadEventsApi.get('/events')
    return events.data.events
} 

export const getEventById = async (_id) => {
    try{
        const event = await launchPadEventsApi.get(`/events/${_id}`)
        return event.data.event
    }catch(err){
        console.log(err)
    }
}

export const postAttendee = async (eventId, userName) => {
    try{
        const addAttendee = await launchPadEventsApi.post(`/events/${eventId}/attendees`, {user: userName})
        return addAttendee
    }catch(err){
        console.log(err)
    }
}

export const postEvent = async (name, startTime, endTime, location, info) => {
        const createNewEvent = await launchPadEventsApi.post('/events/event', {
            name: name,
            startDateTime: startTime,
            endDateTime: endTime,
            location: location,
            info: info
        })
        return createNewEvent.data.event
}

export const deleteEvent = async (eventId) => {
        await launchPadEventsApi.delete(`/events/${eventId}`)
}

export const googleCalendarAuth = async (eventId) => {
    console.log(eventId)
    if(!eventId){
        console.log('event id missing')
    }
    const url = `https://launchpadeventsplatform.onrender.com/google-calendar/auth?eventId=${eventId}`
    window.location.href = url
}

export const createCalendarEvent = async (name, info, startTime, endTime) => {
    try{
        const requestDetails = {
            summary: name,
            description:info,
            startDateTime:startTime,
            endDateTime:endTime
        }
        console.log(requestDetails)

        const createdEvent = await launchPadEventsApi.post('/google-calendar/create-event', requestDetails)
        return createdEvent
    }catch(err){
        console.log(err)
    }
}
