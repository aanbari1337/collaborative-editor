export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  document: (id?: string) => (id ? `/document/${id}` : "/document/:id"),
  not_found: "/*",
};
