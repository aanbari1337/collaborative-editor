import axios from "axios";
import { TOKEN } from "../helpers/constants";
import { ROUTES } from "../routes/constants";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN);
  if (token)
    config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN)}`;
  return config;
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status === 403) {
      localStorage.removeItem(TOKEN);
      window.location.href = ROUTES.login;
    }
    return Promise.reject(error);
  }
);

export default instance;
