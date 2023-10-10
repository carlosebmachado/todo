import axios from 'axios';

export default function api(token) {
  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

  var reqConfig = {
    baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:3333' : 'https://todo-backend-services.onrender.com'
  };

  if (token) {
    reqConfig.headers = {
      'Authorization': `Bearer ${token}`,
    };
  }

  return axios.create(reqConfig);
}
