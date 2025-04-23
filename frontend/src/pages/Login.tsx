import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoginFormData } from "../types/authType";
import { Button, Input } from "../components";
import { PasswordInput } from "../components/ui/Input";
import { loginAPI } from "../api/auth";

type ErrorResponse = {
  message: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [rememberUser, setRememberUser] = useState(false);

  const loginMutation = useMutation<
    void,
    AxiosError<ErrorResponse>,
    LoginFormData
  >({
    mutationFn: loginAPI,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      return error.response?.data?.message || "Login failed";
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-4">
      <Input
        placeholder="Your email address"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <PasswordInput
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <div className="flex items-center gap-1 text-gray-500 text-xl cursor-pointer w-fit mb-6">
        <input
          onChange={() => setRememberUser(!rememberUser)}
          type="checkbox"
          className=" w-4 h-4 cursor-pointer"
          id="remember-me"
        />
        <label htmlFor="remember-me" className="cursor-pointer">
          Remember me
        </label>
      </div>
      {loginMutation.isError && (
        <p className={`mb-2 text-sm text-red-600`}>
          {loginMutation.error.response?.data?.message}
        </p>
      )}
      <Button type="submit">Sign In</Button>
    </form>
  );
};
