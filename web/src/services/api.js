import axios from 'axios';

export default function api(token) {
  var reqConfig = {
    baseURL: process.env.ENVIRONMENT == 'development' ? 'http://localhost:3333' : 'https://todo-backend-services.onrender.com'
  };

  if (token) {
    reqConfig.headers = {
      'Authorization': `Bearer ${token}`,
    };
  }

  return axios.create(reqConfig);
}
