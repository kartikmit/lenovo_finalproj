import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lenovo-finalproj.onrender.com/api',
  withCredentials: true,
});
export default api;
