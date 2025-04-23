import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Signup } from "../pages";
import { AuthLayout, MainLayout } from "../layouts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);
