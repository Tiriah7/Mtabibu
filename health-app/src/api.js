import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // use env variable for production
});

export default API;
