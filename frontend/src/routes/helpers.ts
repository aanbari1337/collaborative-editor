import { TOKEN } from "../helpers/constants";

export const isAuthenticated = async () => {
  const token = localStorage.getItem(TOKEN);

  return !!token;
};
