import { Link } from "react-router-dom";
import { navigationLinks } from "src/config/navigation";

export const NavItems = () => {
  return (
    <>
      {navigationLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className="text-sm transition-colors hover:text-primary/70"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};
