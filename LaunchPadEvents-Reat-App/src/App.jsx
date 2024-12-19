import './App.css'
import LogIn from './components/AuthComponents/login'
import Register from './components/AuthComponents/register'
import EventsList from './components/EventsList'
import EventPage from './components/EventPage'
import Header from './components/Header'
import CreateEventPage from './components/CreateEventPage'
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './contexts/authContext'


function App() {

  const location = useLocation() 
  const {firebaseUser, user} = useContext(AuthContext)
  const noHeader = location.pathname === "/login" || location.pathname === ("/register")

  return (
  <div className='App-router'>
    {/* {!firebaseUser && <Navigate to='/login'/>} */}
    {!noHeader && <Header/>}
  <Routes>
    <Route path="/login" element={<LogIn/>}/>
    <Route path="/register"element={<Register/>}/>
    <Route path="/events"element={<EventsList/>}/>
    <Route path="/events/:eventId"element={<EventPage/>}/>
    <Route path="/events/create-event"element={<CreateEventPage/>}/>
    {/* <Route path="/profile"element={<Profile/>}/> */}
    <Route path="*" element={<Navigate to="/login"/>}/>
  </Routes>
  </div>
  )
}

export default App
