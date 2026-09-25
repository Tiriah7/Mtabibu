import axios from 'axios';

const API = axios.create({

  baseURL: 'https://mtabibu.onrender.com/api', 

});

export default API;
