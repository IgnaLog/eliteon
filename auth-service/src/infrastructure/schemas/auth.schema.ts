import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required"),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have a minimum of 8 characters")
      .max(124, "Password too long"),
  }),
});
