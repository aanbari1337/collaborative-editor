import { USER } from "../helpers/constants";

export const isAuthenticated = async () => {
  const token = localStorage.getItem(USER);

  return !!token;
};
