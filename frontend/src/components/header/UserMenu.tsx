import { Button } from "../ui/Button";
import { UserType } from "../../types/authType";
import { useNavigate } from "react-router-dom";
import { logoutAPI } from "../../api/auth";

interface UserMenuProps {
  data: UserType;
  isLoading: boolean;
}

export const UserMenu = ({ data, isLoading }: UserMenuProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAPI();
    navigate("/auth/login");
  };
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex items-center gap-2">
          <span>
            welcome, <span className="text-blue-400">{data.name}</span>
          </span>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </>
  );
};
