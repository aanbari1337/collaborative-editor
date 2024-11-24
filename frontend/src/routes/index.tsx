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

const ProtectedRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return isAuthenticated ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to='/login' />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute isAuthenticated={await isAuthenticated()} />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/document/:id", element: <Document /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/*",
    element: <h3>Not Found!</h3>,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
