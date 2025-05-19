import { RegisterForm } from "@/components/auth/register-form";
import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <AuthFormWrapper
      title="Create Your Account"
      description="Join CryptoDapper Demo to explore the world of crypto."
      footerContent={
        <p>
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-gold-accent hover:underline">
            Log in
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthFormWrapper>
  );
}
