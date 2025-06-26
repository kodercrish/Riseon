import axios from 'axios';

const api = axios.create({
  withCredentials: true, // send cookies like HttpOnly JWT
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
