import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
import { connectDB } from "./lib/db";
import bcrypt from "bcryptjs";
import User from "./models/User";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          await connectDB();
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await User.findOne({ email }).select("+password");
          if (!user) {
            throw new Error("Invalid credentials.");
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid credentials.");
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isSignInOrSignUp =
        nextUrl.pathname === "/sign-in" || nextUrl.pathname === "/sign-up";

      if (isSignInOrSignUp) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl)); // Redirect authenticated users to home
        }
        return true; // Allow unauthenticated users to access sign-in/up
      }

      // For other routes, require authentication
      if (!isLoggedIn) {
        return Response.redirect(new URL("/sign-in", nextUrl)); // Redirect unauthenticated users to sign-in
      }

      return true; // Allow authenticated users to access other routes
    },
  },
});
