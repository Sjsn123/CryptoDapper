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
          <div className="text-sm text-center">
            <Link href="/auth/recover" className="font-medium text-gold-accent hover:underline">
              Forgot password?
            </Link>
          </div>
        )}
      </form>
    </Form>
  );
}
