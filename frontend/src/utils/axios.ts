import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
