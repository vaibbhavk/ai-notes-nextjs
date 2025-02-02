import { connectDB } from "@/lib/db";
import { parseZodErrors } from "@/utils/parseZodErrors";
import { ZodError } from "zod";

export async function createNote(
  prevState: string | undefined,
  formData: FormData
) {
  return "success";
  // try {
  //   await connectDB();
  //   const { name, email, password } = await signUpSchema.parseAsync({
  //     name: formData.get("name"),
  //     email: formData.get("email"),
  //     password: formData.get("password"),
  //   });

  //   // Check if the user already exists
  //   const existingUser = await User.findOne({ email });
  //   if (existingUser) {
  //     throw new Error("User already exists.");
  //   }

  //   // Hash the password
  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   // Create a new user
  //   const newUser = new User({
  //     email,
  //     password: hashedPassword,
  //     name,
  //   });

  //   await newUser.save();

  //   console.log("User created successfully:", newUser);
  //   return "success";
  // } catch (error) {
  //   if (error instanceof ZodError) {
  //     const errorMessages = parseZodErrors(error);
  //     return errorMessages[0];
  //   }
  //   console.error("Error during sign-up:", error);
  //   return "Something went wrong";
  // }
}
