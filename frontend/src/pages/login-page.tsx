import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Button, Input } from "@components/ui";
import { PasswordInput } from "@components/ui/input";
import { LoginFormData } from "src/types/auth-type";
import { loginAPI } from "@api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "src/schema/login-schema";
import toast from "react-hot-toast";

type ErrorResponse = {
  message: string;
};

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(signInSchema),
  });

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

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    toast.promise(loginMutation.mutateAsync(data), {
      loading: "Signing in...",
      success: "Welcome! 🎉",
      error: (err) => err.response?.data.message || "Signin failed",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 my-4"
    >
      <SigninInputs register={register} errors={errors} />
      <Button type="submit">
        {loginMutation.isPending ? "Please wait..." : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginPage;

const SigninInputs = ({
  register,
  errors,
}: {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
}) => {
  const [rememberUser, setRememberUser] = useState(false);
  return (
    <>
      <Input
        placeholder="Your email address"
        {...register("email")}
        error={errors.email?.message}
      />
      <PasswordInput
        placeholder="Password"
        {...register("password")}
        error={errors.password?.message}
      />
      <div className="flex items-center gap-1 text-primary text-xl cursor-pointer w-fit mb-6">
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
    </>
  );
};
