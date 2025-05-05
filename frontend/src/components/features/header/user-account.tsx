import { UserAccountIcon } from "@assets/svg";
import { LoadingSpinner } from "@components/shared";
import { DropdownMenu } from "@components/ui";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "src/hooks/use-user";

export const UserAccount = () => {
  const { user, isLoading, logout } = useUser();
  const [isUserSettingOpen, setIsUserSettingOpen] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => setIsUserSettingOpen(!isUserSettingOpen)}
    >
      {user ? (
        <>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="h-7 w-7 flex items-center justify-center bg-border rounded-full select-none">
              <div className="font-bold text-xl text-blue">{user.name[0]}</div>
            </div>
          )}
        </>
      ) : (
        <Link to="/auth/login" onClick={logout}>
          <UserAccountIcon />
        </Link>
      )}

      {user && isUserSettingOpen && <DropdownMenu />}
    </div>
  );
};
