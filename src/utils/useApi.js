import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function useApi() {
  const { token } = useSelector((s) => s.auth);

  const [requests, setRequests] = useState({
    baseURL: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    setRequests({
      ...requests,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  return axios.create(requests);
}

export default useApi;
