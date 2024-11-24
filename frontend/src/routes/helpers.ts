export const isAuthenticated = async () => {
  const token = localStorage.getItem("token");

  return !!token;
};
