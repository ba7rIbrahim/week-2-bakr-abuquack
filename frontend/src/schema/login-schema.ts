import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().nonempty("email is require").email("invalid email address"),
  password: z.string().nonempty("password is required").min(5, "password must be at least 5 characters"),
});

export type SignInSchemaType = z.infer<typeof signInSchema>