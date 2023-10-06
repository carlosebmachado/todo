import axios from 'axios';

export default function api(token) {
  return axios.create({
    //baseURL: 'http://localhost:3333',
    baseURL: 'https://todo-backend-services.onrender.com',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}
