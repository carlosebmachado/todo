import axios from 'axios';

export default function api(token) {
  return axios.create({
    baseURL: process.env.ENVIRONMENT == 'development' ? 'http://localhost:3333' : 'https://todo-backend-services.onrender.com',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}
