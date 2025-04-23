import { Link, Outlet, useLocation } from "react-router-dom";

interface PathMap {
  [key: string]: string;
}

const PATH_TITLES: PathMap = {
  "/auth/login": "Sign In",
  "/auth/signup": "Sign Up",
};

const PATH_LINKS: PathMap = {
  "/auth/login": "/auth/signup",
  "/auth/signup": "/auth/login",
};

const LINK_TEXTS: PathMap = {
  "/auth/login": "Sign up",
  "/auth/signup": "Log in",
};

export const AuthLayout = () => {
  const { pathname } = useLocation();

  const currentTitle = PATH_TITLES[pathname] || "";
  const alternatePath = PATH_LINKS[pathname] || "";
  const alternateText = LINK_TEXTS[pathname] || "";

  const message =
    pathname == "/auth/login"
      ? "Don't have an account yet?"
      : "Already have an account?";

  return (
    <div className="flex items-center h-screen">
      <div className="w-1/2 h-full bg-[url(/images/banner-auth.png)] bg-cover bg-center hidden lg:block"></div>
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center text-left px-4 md:px-8">
        <h1 className="text-5xl font-bold mb-8">{currentTitle}</h1>
        <p className="font-semibold">
          {message}{" "}
          <Link
            to={alternatePath}
            className="text-green-600 hover:text-green-700 hover:underline transition-colors"
          >
            {alternateText}
          </Link>
        </p>
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
