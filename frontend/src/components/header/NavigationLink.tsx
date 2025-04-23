import { Link } from "react-router-dom";

export const NavigationLink = () => {
  return (
    <nav className="flex items-center gap-4">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/contact-us">Contact Us</Link>
    </nav>
  );
};
