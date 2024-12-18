import axios from 'axios';

const launchPadEventsApi = axios.create({
    baseURL: 'https://launchpadeventsplatform.onrender.com'
})

export const getAllUsers = async () => {
    try{
        const users = await launchPadEventsApi.get('/users')
        console.log(users)
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
export const postNewUser = async (firstName, lastName, userName, dob) =>{
    const newUser = await launchPadEventsApi.post('/users/user', {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        dob: dob
    })
    console.log(newUser.data)
    return newUser.data
} 