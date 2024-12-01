import axios from "axios";
import { USER } from "../helpers/constants";
import { ROUTES } from "../routes/constants";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

instance.interceptors.request.use((config) => {
  const user = localStorage.getItem(USER);
  if (user) config.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  return config;
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status === 403) {
      localStorage.removeItem(USER);
      window.location.href = ROUTES.login;
    }
    return Promise.reject(error);
  }
);

export default instance;
