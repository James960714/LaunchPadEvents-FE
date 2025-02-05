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
import PrivacyPolicy from './components/PrivacyPolicy'


function App() {

  const location = useLocation() 
  const {firebaseUser, user} = useContext(AuthContext)
  const noHeader = location.pathname === "/login" || location.pathname === ("/register")

  const isPublicRoute = location.pathname === "/privacy-policy"

  return (
  <div className='App-router'>
    {!user && !isPublicRoute && <Navigate to='/login'/>}
    {!noHeader && <Header/>}
  <Routes>
    <Route path="/login" element={<LogIn/>}/>
    <Route path="/register"element={<Register/>}/>
    <Route path="/events"element={<EventsList/>}/>
    <Route path="/events/:eventId"element={<EventPage/>}/>
    <Route path="/events/create-event"element={<CreateEventPage/>}/>
    <Route path="/privacy-policy"element={<PrivacyPolicy/>}/>
    <Route path="*" element={<Navigate to="/login"/>}/>
  </Routes>
  </div>
  )
}

export default App
