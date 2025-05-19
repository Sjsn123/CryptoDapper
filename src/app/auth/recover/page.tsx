import { RecoveryForm } from "@/components/auth/recovery-form";
import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper";
import Link from "next/link";

export default function RecoveryPage() {
  return (
    <AuthFormWrapper
      title="Account Recovery"
      description="Enter your seed phrase or use email to recover your account."
       footerContent={
        <p>
          Remembered your password?{" "}
          <Link href="/auth/login" className="font-medium text-gold-accent hover:underline">
            Log in
          </Link>
        </p>
      }
    >
      <RecoveryForm />
    </AuthFormWrapper>
  );
}
