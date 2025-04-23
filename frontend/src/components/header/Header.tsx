import { useQuery } from "@tanstack/react-query";
import { NavigationLink } from "./NavigationLink";
import { UserMenu } from "./UserMenu";
import { UserActions } from "./UserActions";
import { getMeAPI } from "../../api/auth";

export const Header = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMeAPI,
    retry: false,
  });

  return (
    <header className="flex items-center justify-between px-10 py-10">
      <div>
        <span className="text-blue-400">E-COM.</span>
      </div>
      <NavigationLink />
      {data ? <UserMenu data={data} isLoading={isLoading} /> : <UserActions />}
    </header>
  );
};
