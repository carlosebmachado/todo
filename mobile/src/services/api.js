import axios from 'axios';


export default function api(token) {
  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

  var reqConfig = {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://todo-backend-services.onrender.com' : 'http://10.0.2.2:3333'
  };

  if (token) {
    reqConfig.headers = {
      'Authorization': `Bearer ${token}`,
    };
  }

  return axios.create(reqConfig);
}

