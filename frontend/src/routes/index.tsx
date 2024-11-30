import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "@/pages/home/home";
import Document from "@/pages/document/document";
import Login from "@/pages/login/login";
import Signup from "@/pages/signup/signup";
import AppLayout from "@/components/app-layout";
import { isAuthenticated } from "./helpers";
import { ROUTES } from "./constants";

const ProtectedRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return isAuthenticated ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to={ROUTES.login} />
  );
};

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <ProtectedRoute isAuthenticated={await isAuthenticated()} />,
    children: [
      { path: ROUTES.home, element: <Home /> },
      { path: ROUTES.document(), element: <Document /> },
    ],
  },
  {
    path: ROUTES.login,
    element: <Login />,
  },
  {
    path: ROUTES.signup,
    element: <Signup />,
  },
  {
    path: ROUTES.not_found,
    element: <h3>Not Found!</h3>,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
