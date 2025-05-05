import { z } from "zod"

export const signupSchema = z.object({
  name: z.string().nonempty("name is required"),
  username: z.string().nonempty("username is required"),
  email: z.string().nonempty("email is required").email("Invalid email address"),
  password: z.string().nonempty("password is required").min(5, "password must be at least 5 characters"),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;