<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import router from './router'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
=======
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./utils/router";
import { RouterProvider } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
>>>>>>> ef9b3c076f7ed870734364407f9a4cc7cb9e28b7
