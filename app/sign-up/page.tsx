import { SignUpForm } from "@/components/sign-up-form";

export default function SignUp() {
  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10 space-y-8">
      <h3 className="font-bold text-3xl text-center">AI Notes</h3>
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
