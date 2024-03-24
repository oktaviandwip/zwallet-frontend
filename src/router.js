import {createBrowserRouter} from 'react-router-dom'
import Login from './pages/auth/Login.jsx'
import SignUp from './pages/signup/Signup.jsx'
import Home from './pages/dashboard/Home.jsx'


export default createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/signup',
        element: <SignUp/>
    }
])