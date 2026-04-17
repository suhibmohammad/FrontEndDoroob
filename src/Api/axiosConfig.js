import axios from 'axios';
import Api from './axiosConfig.js';
const api = axios.create({
 
  baseURL: 'http://doroob.runasp.net/api/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;