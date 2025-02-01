import { SignInForm } from "@/components/sign-in-form";

export default function SignIn() {
  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10 space-y-8">
      <h3 className="font-bold text-3xl text-center">Notes App with Speech</h3>
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  );
}
