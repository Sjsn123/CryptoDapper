
"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { KeySquare, Mail, CheckCircle, XCircle, Loader2, RotateCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth"; // Import useAuth

// const MOCK_VALID_SEED_PHRASE = "apple banana cherry date elderberry fig grape honeydew kiwi lime mango"; // 12 words - Seed phrase recovery is complex and not standard with Firebase email/social auth

const emailResetSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type EmailResetFormValues = z.infer<typeof emailResetSchema>;

export function RecoveryForm() {
  const { toast } = useToast();
  const { sendPasswordReset, isLoading: authLoading } = useAuth(); // Use sendPasswordReset from useAuth
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  // Seed phrase recovery is not a standard Firebase Auth feature for email/password/social.
  // Typically, users would use "Forgot Password" (email link) or provider's recovery methods.
  // For simplicity, we'll primarily focus on email-based password reset.
  // const [showEmailReset, setShowEmailReset] = useState(true); // Default to email reset

  const emailResetForm = useForm<EmailResetFormValues>({
    resolver: zodResolver(emailResetSchema),
    defaultValues: {
      email: "",
    }
  });

  async function onEmailResetSubmit(data: EmailResetFormValues) {
    setIsSubmitting(true);
    setFeedback(null);
    await sendPasswordReset(data.email);
    // Feedback (toast) is handled within sendPasswordReset
    setIsSubmitting(false);
    // Optionally clear form or show success message in place
    emailResetForm.reset();
  }
  
  const currentIsLoading = authLoading || isSubmitting;

  return (
    <div className="space-y-6">
      <Form {...emailResetForm}>
        <form onSubmit={emailResetForm.handleSubmit(onEmailResetSubmit)} className="space-y-6">
            <p className="text-sm text-muted-foreground">Enter your email address to receive a password reset link.</p>
          <FormField
            control={emailResetForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Email Address</FormLabel>
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
          {feedback && (
            <Alert variant={feedback.type === 'success' ? 'default' : 'destructive'} className={feedback.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-700 dark:text-green-400' : ''}>
              {feedback.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <AlertTitle>{feedback.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
              <AlertDescription>{feedback.message}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full btn-silver" disabled={currentIsLoading}>
            {currentIsLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
            Send Reset Link
          </Button>
        </form>
        {/* 
        Seed phrase recovery is a concept more tied to non-custodial wallets.
        Firebase Auth typically relies on email/password or social provider recovery.
        The UI for seed phrase can be kept for demo but won't be functional with standard Firebase.
        <div className="mt-4 text-center text-sm">
          <Button variant="link" onClick={() => setShowEmailReset(false)} className="text-gold-accent hover:underline">
            Recover with Seed Phrase (Demo)
          </Button>
        </div> 
        */}
      </Form>
    </div>
  );
}
