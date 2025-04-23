import { Search, ShoppingBagIcon, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export const UserActions = () => {
  return (
    <div className="flex gap-4">
      <button>
        <Search size={30} />
      </button>
      <Link to="/auth/login">
        <UserCircle2 size={30} />
      </Link>
      <button>
        <ShoppingBagIcon size={30} />
      </button>
    </div>
  );
};
