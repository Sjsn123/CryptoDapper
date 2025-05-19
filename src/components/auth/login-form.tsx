
"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Mail, KeyRound, ShieldAlert, Loader2 } from "lucide-react";
import { useMockAuth } from "@/hooks/use-mock-auth";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }), // Min 1 for demo, proposal says 12 for actual
  otp: z.string().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// SVG Icon for Google
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    <path d="M1 1h22v22H1z" fill="none"/>
  </svg>
);

// SVG Icon for Apple
const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M19.472 13.052c-.904 2.534-2.202 4.187-3.892 4.187-1.616 0-2.09-.987-3.431-.987s-1.851.987-3.469.987c-1.716 0-3.088-1.692-4.03-4.187C3.252 10.21 4.48 5.926 6.594 5.926c1.58 0 2.559 1.062 3.431 1.062s1.777-1.062 3.543-1.062c1.654 0 3.088 4.187 1.905 7.126zm-4.606-5.128c.39-.47.627-1.133.589-1.834-.664.074-1.48.47-1.905.949-.316.395-.664.987-.551 1.72.702.112 1.48-.278 1.867-.835z"/>
  </svg>
);

export function LoginForm() {
  const { toast } = useToast();
  const { login } = useMockAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      otp: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!showOtp) {
      // Simulate OTP requirement for a specific demo user
      if (data.email === "user@example.com" && data.password === "password123") {
        setShowOtp(true);
        toast({
          title: "2FA Required",
          description: "Please enter the OTP from your authenticator app.",
        });
      } else if (data.password === "password123") { // Generic successful login for demo
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        login();
      } else {
         toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid email or password.",
        });
      }
    } else {
      // Simulate OTP verification
      if (data.otp === "123456") {
        toast({
          title: "Login Successful",
          description: "Welcome back! 2FA verified.",
        });
        login();
      } else {
        toast({
          variant: "destructive",
          title: "2FA Failed",
          description: "Invalid OTP. Please try again.",
        });
      }
    }
    setIsLoading(false);
  }

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Social Login (Demo)",
      description: `${provider} login is not implemented in this demo.`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {!showOtp && (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input placeholder="you@example.com" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {showOtp && (
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">One-Time Password (OTP)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <ShieldAlert className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Enter 6-digit OTP" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
                <p className="text-xs text-muted-foreground pt-1">Demo OTP: 123456</p>
              </FormItem>
            )}
          />
        )}
        
        <Button type="submit" className="w-full btn-gold" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
          {showOtp ? "Verify OTP" : "Login"}
        </Button>
        
        {!showOtp && (
          <>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or sign in with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button variant="outline" className="w-full" onClick={() => handleSocialLogin("Google")} disabled={isLoading}>
                <GoogleIcon /> <span className="ml-2">Google</span>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => handleSocialLogin("Apple")} disabled={isLoading}>
                <AppleIcon /> <span className="ml-2">Apple</span>
              </Button>
            </div>
            <div className="text-sm text-center mt-4">
              <Link href="/auth/recover" className="font-medium text-gold-accent hover:underline">
                Forgot password?
              </Link>
            </div>
          </>
        )}
      </form>
    </Form>
  );
}
