import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const signUpSchema = object({
  name: string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: string().min(1, "Email is required").email("Invalid email address"),
  password: string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be less than 32 characters"),
});

export const createNoteSchema = object({
  desc: string().min(1, "Description is required"),
});

export const updateNoteSchema = object({
  title: string().min(1, "Title is required"),
  desc: string().min(1, "Description is required"),
});
