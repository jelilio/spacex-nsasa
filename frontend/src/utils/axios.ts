import axios from 'axios';
import { BASEURL } from '../constants';

const instance = axios.create({
  baseURL: BASEURL,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 404) {
      // page not found
      console.log(error);
      // window.location.replace("/*");
    } else {
      return Promise.reject(error);
    }
  },
);

export default instance;
