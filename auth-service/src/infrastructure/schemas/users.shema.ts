import { z } from "zod";

export const deleteUserSchema = z.object({
  body: z.object({
    id: z.string().min(1, "User ID required"),
  }),
});

export const getUserSchema = z.object({
  params: z.object({
    id: z.string().min(1, "User ID required"),
  }),
});
