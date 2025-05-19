import { LoginForm } from "@/components/auth/login-form";
import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthFormWrapper
      title="Welcome Back!"
      description="Sign in to access your CryptoDapper dashboard."
      footerContent={
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-medium text-gold-accent hover:underline">
            Register here
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthFormWrapper>
  );
}
