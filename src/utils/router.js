import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login.jsx';
import ResetPassword from '../pages/auth/reset-pasword.jsx';
import History from '../pages/dashboard/History.jsx';
import Home from '../pages/dashboard/Home.jsx';
import LandingPage from '../pages/landingpage/LandingPage.jsx';
import ChangePass from '../pages/profile/ChangePass.jsx';
import ChangePin from '../pages/profile/ChangePin.jsx';
import Detail from '../pages/profile/ProfileDetails.jsx';
import Profile from '../pages/profile/Profile.jsx';
import SignUp from '../pages/signup/Signup.jsx';
import Topup from '../pages/topup/Topup.jsx';
import SendMoney from '../pages/transfer/SendMoney.jsx';
import Transfer from '../pages/transfer/Transfer.jsx';
import TransferDetails from '../pages/transfer/TransferDetails.jsx';
import AddReceiver from '../pages/transfer/AddReceiver.jsx';
import PrivateRoute from '../utils/privateRoute.js';

export default createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/home',
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: '/history',
    element: (
      <PrivateRoute>
        <History />
      </PrivateRoute>
    ),
  },
  {
    path: '/transfers',
    element: <Transfer />,
  },
  {
    path: '/transfers/add-receiver',
    element: <AddReceiver />,
  },
  {
    path: '/transfers/send',
    element: <SendMoney />,
  },
  {
    path: '/transfers/details',
    element: (
      <PrivateRoute>
        <TransferDetails />
      </PrivateRoute>
    ),
  },
  {
    path: '/topup',
    element: (
      <PrivateRoute>
        <Topup />
      </PrivateRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: '/profile/detail',
    element: (
      <PrivateRoute>
        <Detail />
      </PrivateRoute>
    ),
  },
  {
    path: '/profile/change-pin',
    element: (
      <PrivateRoute>
        <ChangePin />
      </PrivateRoute>
    ),
  },
  {
    path: '/profile/change-password',
    element: (
      <PrivateRoute>
        <ChangePass />
      </PrivateRoute>
    ),
  },
]);
