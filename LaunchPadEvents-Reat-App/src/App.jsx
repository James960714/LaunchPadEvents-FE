import './App.css'
import LogIn from './components/AuthComponents/login'
import Register from './components/AuthComponents/register'
import EventsList from './components/EventsList'
import EventPage from './components/EventPage'
import Home from './components/EventsList'
import { AuthContext } from './contexts/authContext/index'
import {Routes, Route, Navigate} from 'react-router-dom'
import { useContext } from 'react'

//const {user} = useContext(AuthContext)

function App() {
  return (
  <div className='App-router'>
    <h1>Events Platform</h1>
  <Routes>
    <Route path="/login" element={<LogIn/>}/>
    <Route path="/register"element={<Register/>}/>
    
    <Route path="/events"element={<EventsList/>}/>
    <Route path="/events/:eventId"element={<EventPage/>}/>
    {/* <Route path="/profile"element={<Profile/>}/> */}
    <Route path="*" element={<Navigate to="/login"/>}/>
  </Routes>
  </div>
  )
}

export default App
