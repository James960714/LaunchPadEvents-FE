import './App.css'
import LogIn from './components/AuthComponents/login'
import Register from './components/AuthComponents/register'
import Home from './components/home'
import { AuthProvider } from './contexts/authContext/index'
import {Routes, Route, Navigate} from 'react-router-dom'


function App() {
  return (
  <div className='App-router'>
    <h1>Events Platform</h1>
  <Routes>
    <Route path="/login" element={<LogIn/>}/>
    <Route path="/home"element={<Home/>}/>
    {/* <Route path="/profile"element={<Profile/>}/> */}
    <Route path="/register"element={<Register/>}/>
    <Route path="*" element={<Navigate to="/login"/>}/>
  </Routes>
  </div>
  )
}

export default App
