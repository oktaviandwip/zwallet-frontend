import { useState, useEffect } from "react";
import axios from "axios";
// import { useSelector } from "react-redux";

function useApi(urls = "") {
  // const { token } = useSelector((s) => s.users);
  const token = true;

  const [requests, setRequests] = useState({
    baseURL: "http://localhost:3001",
    // baseURL: import.meta.env.VITE_APP_BASEURL || urls,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzExNDU5NDU1LCJleHAiOjE3MTE1NDU4NTV9.S819-XOHyZAqHVzXfPcBqR1cvq_q0EIk11mFHQUALJg`,
    },
  });

  useEffect(() => {
    setRequests({
      ...requests,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzExNDU5NDU1LCJleHAiOjE3MTE1NDU4NTV9.S819-XOHyZAqHVzXfPcBqR1cvq_q0EIk11mFHQUALJg`,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return axios.create(requests); // yang dipakai ini
}

export default useApi;
