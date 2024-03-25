import {createBrowserRouter} from 'react-router-dom'
import Login from './pages/auth/Login.jsx'
import ResetPassword from './pages/auth/reset-pasword.jsx'
import SignUp from './pages/signup/Signup.jsx'
import CreatePin from './pages/create-pin/CreatePin.jsx'
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
        path: '/reset-password',
        element: <ResetPassword/>
    },
    {
        path: '/signup',
        element: <SignUp/>
    },
    {
        path: '/create-pin',
        element: <CreatePin/>
    },
])