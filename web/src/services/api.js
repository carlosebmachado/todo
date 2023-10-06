import axios from 'axios';

export default function api(token) {
  return axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}
