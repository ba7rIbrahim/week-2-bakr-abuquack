import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupFormData } from "../types/authType";
import { Button, Input } from "../components";
import { PasswordInput } from "../components/ui/Input";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signupAPI } from "../api/auth";

type ErrorResponse = {
  message: string;
};

export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [terms, setTerms] = useState(false);

  const signupMutation = useMutation<
    void,
    AxiosError<ErrorResponse>,
    SignupFormData
  >({
    mutationFn: signupAPI,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      return error.response?.data.message || "Signup failed";
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-4">
      <Input
        placeholder="Your name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <Input
        type="email"
        placeholder="Your email address"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <PasswordInput
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <div className="flex flex-col gap-1 text-gray-500 text-xl font-medium cursor-pointer w-fit mb-6">
        <div className="flex items-center gap-2">
          <input
            onChange={() => setTerms(!terms)}
            type="checkbox"
            className=" w-4 h-4 cursor-pointer"
            id="terms"
          />
          <label htmlFor="terms" className="cursor-pointer">
            Agree to <span className="font-bold text-black">Terms</span> and{" "}
            <span className="font-bold text-black">Conditions</span>
          </label>
        </div>
      </div>
      {signupMutation.isError && (
        <p className={`mb-2 text-sm text-red-600`}>
          {signupMutation.error.response?.data?.message}
        </p>
      )}
      <Button type="submit" disabled={signupMutation.isPending}>
        {signupMutation.isPending ? "Please wait..." : "Sign Up"}
      </Button>
    </form>
  );
};
