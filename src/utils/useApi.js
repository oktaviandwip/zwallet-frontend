import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function useApi(urls = '') {
  const { token } = useSelector((s) => s.auth);

  const [requests, setRequests] = useState({
    baseURL: 'https://zwallet-backend-production.up.railway.app/' || urls,
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
