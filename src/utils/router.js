import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/landingpage/LandingPage.jsx";
import Home from "../pages/dashboard/Home.jsx";
import History from "../pages/dashboard/History.jsx";
import Topup from "../pages/topup/Topup.jsx";
import Profile from "../pages/profile/Profile.jsx";
import Detail from "../pages/profile/Detail.jsx";
import ChangePin from "../pages/profile/ChangePin.jsx";
import ChangePass from "../pages/profile/ChangePass.jsx";
import AddPhone from "../pages/profile/AddPhone.jsx";
import ManagePhone from "../pages/profile/ManagePhone.jsx";
import Login from "../pages/auth/Login.jsx";
import ResetPassword from "../pages/auth/reset-pasword.jsx";
import SignUp from "../pages/signup/Signup.jsx";
import CreatePin from "../pages/create-pin/CreatePin.jsx";

export default createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/topup",
    element: <Topup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/detail",
    element: <Detail />,
  },
  {
    path: "/profile/change-pin",
    element: <ChangePin />,
  },
  {
    path: "/profile/change-pass",
    element: <ChangePass />,
  },
  {
    path: "/profile/add-phone",
    element: <AddPhone />,
  },
  {
    path: "/profile/manage-phone",
    element: <ManagePhone />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/create-pin",
    element: <CreatePin />,
  },
]);
