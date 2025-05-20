
"use client";

import React, { useState, useEffect } from "react";
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
import { LogIn, Mail, KeyRound, Loader2, Phone, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/use-auth.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


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

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});
type LoginFormValues = z.infer<typeof loginSchema>;

const phoneSchema = z.object({
  phoneNumber: z.string().min(10, {message: "Phone number must be at least 10 digits."})
    .regex(/^\+[1-9]\d{1,14}$/, { message: "Invalid phone number format. Include country code e.g. +12223334444"}),
  otp: z.string().optional(), // OTP is optional in the initial schema, handled by multi-step logic
});
type PhoneFormValues = z.infer<typeof phoneSchema>;


export function LoginForm() {
  const { logInWithEmail, signInWithGoogle, requestOtpForPhoneNumber, verifyOtpAndSignIn, isLoading: authLoading } = useAuth();
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [isSubmittingSocial, setIsSubmittingSocial] = useState(false);
  const [isSubmittingPhone, setIsSubmittingPhone] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  const RECAPTCHA_CONTAINER_ID = "login-recaptcha-container";


  const emailForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema), // OTP validation is not part of this Zod schema
    defaultValues: {
      phoneNumber: "",
      otp: "",
    },
  });


  async function onEmailSubmit(data: LoginFormValues) {
    setIsSubmittingEmail(true);
    await logInWithEmail(data.email, data.password);
    setIsSubmittingEmail(false);
  }

  async function onPhoneFormSubmit(data: PhoneFormValues) {
    setIsSubmittingPhone(true);
    if (!otpSent) {
      const confirmationResult = await requestOtpForPhoneNumber(data.phoneNumber, RECAPTCHA_CONTAINER_ID);
      if (confirmationResult) {
        setOtpSent(true);
      }
    } else {
      if (data.otp) {
        await verifyOtpAndSignIn(data.otp);
        // On success, useAuth hook will redirect. If error, toast is shown.
        // Reset otpSent if verification fails and user needs to retry phone number or OTP.
        // For now, this is handled by toast and user can manually retry.
      }
    }
    setIsSubmittingPhone(false);
  }


  const handleGoogleLogin = async () => {
    setIsSubmittingSocial(true);
    await signInWithGoogle();
    setIsSubmittingSocial(false);
  };

  const currentIsLoading = authLoading || isSubmittingEmail || isSubmittingSocial || isSubmittingPhone;

  useEffect(() => {
    // Reset OTP state if tab changes
    setOtpSent(false);
    phoneForm.resetField("otp");
  }, [activeTab, phoneForm]);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
        </TabsList>
        <TabsContent value="email">
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6 mt-4">
              <FormField
                control={emailForm.control}
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
                control={emailForm.control}
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
              <Button type="submit" className="w-full btn-gold" disabled={currentIsLoading}>
                {isSubmittingEmail ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
                Login with Email
              </Button>
              <div className="text-sm text-center mt-4">
                <Link href="/auth/recover" className="font-medium text-gold-accent hover:underline">
                  Forgot password?
                </Link>
              </div>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="phone">
          <Form {...phoneForm}>
            <form onSubmit={phoneForm.handleSubmit(onPhoneFormSubmit)} className="space-y-6 mt-4">
              <FormField
                control={phoneForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="+12223334444" {...field} className="pl-10" disabled={otpSent && !currentIsLoading} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* This div is used by Firebase RecaptchaVerifier. Must be in the DOM. */}
              {!otpSent && <div id={RECAPTCHA_CONTAINER_ID}></div>}
              
              {otpSent && (
                <FormField
                  control={phoneForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">OTP Code</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input type="text" placeholder="Enter OTP" {...field} className="pl-10" maxLength={6} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" className="w-full btn-gold" disabled={currentIsLoading || (otpSent && !phoneForm.watch("otp")?.trim())}>
                {isSubmittingPhone ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (otpSent ? <LogIn className="mr-2 h-4 w-4"/> : <Phone className="mr-2 h-4 w-4"/>)}
                {otpSent ? "Verify OTP & Login" : "Send OTP"}
              </Button>
               {otpSent && (
                <Button variant="link" onClick={() => { setOtpSent(false); phoneForm.resetField("otp"); }} disabled={currentIsLoading} className="text-xs text-muted-foreground">
                  Change phone number or resend OTP?
                </Button>
              )}
            </form>
          </Form>
        </TabsContent>
      </Tabs>
      
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={currentIsLoading}>
          {isSubmittingSocial ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
          <span className="ml-2">Google</span>
        </Button>
      </div>
    </div>
  );
}

    