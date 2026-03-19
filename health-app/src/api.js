import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mtabibu-backend.onrender.com', 
});

export default API;
