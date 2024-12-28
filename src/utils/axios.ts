import axios from "axios";
import Cookies from "js-cookie";

const initial = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})


initial.interceptors.request.use((config) => {
    const csrftoken = Cookies.get('csrftoken');
    if (csrftoken) {
      config.headers['X-CSRFToken'] = csrftoken;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
});

export default initial