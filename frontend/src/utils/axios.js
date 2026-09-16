import axios from 'axios';

const api = axios.create({
  baseURL: window.location.hostname === 'localhost'
    ? 'http://localhost:5001/api'
    : 'https://lenovo-finalproj.onrender.com/api',
  withCredentials: true,
});

export default api;