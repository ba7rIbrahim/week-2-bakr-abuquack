import { getMeAPI, logoutAPI } from "@api/auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMeAPI,
    retry: false,
  });

  const logout = async () => {
    await logoutAPI();
    navigate("/auth/login");
  };


  return { user: data, isLoading, logout }
}