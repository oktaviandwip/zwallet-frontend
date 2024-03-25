import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/landingpage/LandingPage.jsx";
import Home from "../pages/dashboard/Home.jsx";
import Topup from "../pages/topup/Topup.jsx";
import Profile from "../pages/profile/Profile.jsx";
import Detail from "../pages/profile/Detail.jsx";
import ChangePass from "../pages/profile/ChangePass.jsx";
import AddPhone from "../pages/profile/AddPhone.jsx";
import ManagePhone from "../pages/profile/ManagePhone.jsx";

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
    element: <Profile />,
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
]);
