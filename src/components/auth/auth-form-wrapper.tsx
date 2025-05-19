import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DynamicLogo } from "@/components/core/dynamic-logo";
import Link from "next/link";

interface AuthFormWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
}

export function AuthFormWrapper({ title, description, children, footerContent }: AuthFormWrapperProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-primary p-4">
      <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <Link href="/" className="inline-block mb-6">
            <DynamicLogo size="md" className="mx-auto" />
          </Link>
          <CardTitle className="text-3xl font-bold text-foreground">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {footerContent && (
          <CardFooter className="flex flex-col items-center text-sm text-muted-foreground">
            {footerContent}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
