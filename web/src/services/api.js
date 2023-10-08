import axios from 'axios';

export default function api(token) {
  return axios.create({
    baseURL: process.env.ENVIRONMENT === 'production' ? 'https://todo-backend-services.onrender.com' : 'http://localhost:3333',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}
