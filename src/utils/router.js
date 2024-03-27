import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/landingpage/LandingPage.jsx";
import Home from "../pages/dashboard/Home.jsx";
import History from "../pages/dashboard/History.jsx";
import Profile from "../pages/profile/Profile.jsx";

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
    path: "/profile",
    element: <Profile />,
  },
]);
