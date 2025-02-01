"use server";

import { signIn, signOut } from "@/auth";
import { connectDB } from "@/lib/db";
import { signUpSchema } from "@/lib/zod";
import User from "@/models/User";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";
import { parseZodErrors } from "@/utils/parseZodErrors";

export async function handleSignIn(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function handleSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await connectDB();
    const { name, email, password } = await signUpSchema.parseAsync({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();

    console.log("User created successfully:", newUser);
    return "success";
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = parseZodErrors(error);
      return errorMessages[0];
    }
    console.error("Error during sign-up:", error);
    return "Something went wrong";
  }
}

export async function handleSignOut() {
  "use server";
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
}
