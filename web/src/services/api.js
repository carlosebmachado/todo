import axios from 'axios';

export default function api(token) {
  var reqConfig = {
    baseURL: process.env.ENVIRONMENT === 'production' ? 'https://todo-backend-services.onrender.com' : 'http://localhost:3333',
  };

  if (token) {
    reqConfig.headers = {
      'Authorization': `Bearer ${token}`,
    };
  }

  return axios.create(reqConfig);
}
