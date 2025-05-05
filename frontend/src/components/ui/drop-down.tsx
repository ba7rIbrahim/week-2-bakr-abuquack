import { Link } from "react-router-dom";

export const DropdownMenu = () => {
  return (
    <div
      role="menu"
      className="absolute flex flex-col divide-y divide-border border border-border shadow-md min-w-38 bg-white rounded-md z-50 right-0"
    >
      <Link
        to="/account"
        className={`block px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-gray-100 hover:text-gray-900`}
      >
        Account Setting
      </Link>
      <Link
        to="auth/login"
        className={`block w-full px-3 py-2 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50 cursor-pointer`}
      >
        Logout
      </Link>
    </div>
  );
};
