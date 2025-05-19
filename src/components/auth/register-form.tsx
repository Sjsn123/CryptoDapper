
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Mail, KeyRound, ShieldCheck, Smartphone, Loader2 } from "lucide-react";
import { useMockAuth } from "@/hooks/use-mock-auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }) // Proposal: 12, using 8 for demo ease
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
  confirmPassword: z.string(),
  enable2FA: z.boolean().default(false).optional(),
  phone: z.string().optional(), // Optional for demo
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

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


export function RegisterForm() {
  const { toast } = useToast();
  const { register } = useMockAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [otp, setOtp] = useState("");

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      enable2FA: false,
      phone: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    if (data.enable2FA) {
      setShow2FASetup(true);
      // In a real app, you'd generate a QR code secret here
    } else {
      toast({
        title: "Registration Successful",
        description: "Welcome to CryptoDapper Demo!",
      });
      register(); // Mock register and redirect
    }
    setIsLoading(false);
  }

  async function handle2FASetup() {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate OTP verification
    
    if (otp === "123456") { // Mock OTP
      setShow2FASetup(false);
      toast({
        title: "2FA Setup Successful!",
        description: "Your account is now protected with 2FA.",
      });
      toast({
        title: "Registration Successful",
        description: "Welcome to CryptoDapper Demo!",
      });
      register(); // Mock register and redirect
    } else {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect. Please try again.",
      });
    }
    setIsLoading(false);
  }

  const handleSocialRegister = (provider: string) => {
    toast({
      title: "Social Sign-up (Demo)",
      description: `${provider} sign-up is not implemented in this demo.`,
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Confirm Password</FormLabel>
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
          <FormField
            control={form.control}
            name="enable2FA"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-primary/20">
                 <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-accent data-[state=checked]:bg-gold-accent data-[state=checked]:text-primary"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-foreground">
                    Enable Two-Factor Authentication (2FA)
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          {form.getValues("enable2FA") && (
             <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Phone Number (for SMS 2FA - optional demo)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input type="tel" placeholder="+1 555-123-4567" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <Button type="submit" className="w-full btn-gold" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
            Register
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or sign up with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="outline" className="w-full" onClick={() => handleSocialRegister("Google")} disabled={isLoading}>
              <GoogleIcon /> <span className="ml-2">Google</span>
            </Button>
            <Button variant="outline" className="w-full" onClick={() => handleSocialRegister("Apple")} disabled={isLoading}>
              <AppleIcon /> <span className="ml-2">Apple</span>
            </Button>
          </div>

        </form>
      </Form>

      <Dialog open={show2FASetup} onOpenChange={setShow2FASetup}>
        <DialogContent className="sm:max-w-[425px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground text-2xl">Setup Two-Factor Authentication</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Scan the QR code with your authenticator app (e.g., Google Authenticator).
              For demo purposes, use any QR code and enter OTP '123456'.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-center">
              {/* Placeholder QR Code */}
              <img src="https://placehold.co/200x200/2E3B55/C0C0C0?text=Mock+QR+Code" alt="Mock QR Code" data-ai-hint="qr code" className="rounded-md border border-border"/>
            </div>
            <div className="space-y-2">
              <FormLabel htmlFor="otp" className="text-foreground">Enter OTP</FormLabel>
              <Input 
                id="otp" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                className="text-center text-xl tracking-widest"
                maxLength={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShow2FASetup(false)} className="text-accent border-accent hover:bg-accent hover:text-accent-foreground">Cancel</Button>
            <Button onClick={handle2FASetup} className="btn-silver" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
              Verify & Complete Setup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
