import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AuthLayout, MainLayout } from "../layouts";
import { HomePage } from "@pages/index";

const ErrorPage = lazy(() => import("@pages/error-page"));
const LoginPage = lazy(() => import("@pages/login-page"));
const SignupPage = lazy(() => import("@pages/signup-page"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
