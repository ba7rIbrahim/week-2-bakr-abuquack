import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SignupFormData } from "src/types/auth-type";
import { Button, Input } from "@components/ui";
import { PasswordInput } from "@components/ui/input";
import { signupAPI } from "@api/auth";
import { signupSchema } from "src/schema/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

type ErrorResponse = {
  message: string;
};

const SignupPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

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

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    toast.promise(signupMutation.mutateAsync(data), {
      loading: "Signing up...",
      success: "Signup successful!",
      error: (err) => err.response?.data.message || "Signup failed",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 my-4"
    >
      <SignupInputs register={register} errors={errors} />

      <Button type="submit" disabled={signupMutation.isPending}>
        {signupMutation.isPending ? "Please wait..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignupPage;

const SignupInputs = ({
  register,
  errors,
}: {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
}) => (
  <>
    <Input
      placeholder="Your name"
      {...register("name")}
      error={errors.name?.message}
    />
    <Input
      placeholder="Username"
      {...register("username")}
      error={errors.username?.message}
    />
    <Input
      type="email"
      placeholder="Your email address"
      {...register("email")}
      error={errors.email?.message}
    />
    <PasswordInput
      placeholder="Password"
      {...register("password")}
      error={errors.password?.message}
    />
    <div className="flex flex-col gap-1 text-primary text-xl font-medium cursor-pointer w-fit mb-6">
      <div className="flex items-center gap-2">
        <input type="checkbox" className=" w-4 h-4 cursor-pointer" id="terms" />
        <label htmlFor="terms" className="cursor-pointer">
          Agree to <span className="font-bold text-primary">Terms</span> and{" "}
          <span className="font-bold text-primary">Conditions</span>
        </label>
      </div>
    </div>
  </>
);
