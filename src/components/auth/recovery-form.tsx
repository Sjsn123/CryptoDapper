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

const recoverySchema = z.object({
  seedPhrase: z.string().refine(
    (val) => {
      const words = val.trim().split(/\s+/);
      return words.length === 12 || words.length === 24;
    },
    { message: "Seed phrase must be 12 or 24 words." }
  ),
});

const emailResetSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type RecoveryFormValues = z.infer<typeof recoverySchema>;
type EmailResetFormValues = z.infer<typeof emailResetSchema>;

const MOCK_VALID_SEED_PHRASE = "apple banana cherry date elderberry fig grape honeydew kiwi lime mango"; // 12 words

export function RecoveryForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showEmailReset, setShowEmailReset] = useState(false);

  const recoveryForm = useForm<RecoveryFormValues>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      seedPhrase: "",
    },
  });

  const emailResetForm = useForm<EmailResetFormValues>({
    resolver: zodResolver(emailResetSchema),
    defaultValues: {
      email: "",
    }
  });

  async function onSeedPhraseSubmit(data: RecoveryFormValues) {
    setIsLoading(true);
    setFeedback(null);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    const inputPhrase = data.seedPhrase.trim().toLowerCase();
    if (inputPhrase === MOCK_VALID_SEED_PHRASE) {
      setFeedback({ type: 'success', message: "Seed phrase verified! You can now reset your password (simulated)." });
      toast({
        title: "Seed Phrase Valid",
        description: "Password reset link would be sent (simulated).",
      });
    } else {
      setFeedback({ type: 'error', message: "Invalid seed phrase. Please check your words and try again." });
    }
    setIsLoading(false);
  }

  async function onEmailResetSubmit(data: EmailResetFormValues) {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Password Reset Email Sent (Simulated)",
      description: `If an account exists for ${data.email}, a password reset link has been sent.`,
    });
    setIsLoading(false);
    setShowEmailReset(false); // Optionally hide form or show success message
  }

  return (
    <div className="space-y-6">
      {!showEmailReset ? (
        <Form {...recoveryForm}>
          <form onSubmit={recoveryForm.handleSubmit(onSeedPhraseSubmit)} className="space-y-6">
            <FormField
              control={recoveryForm.control}
              name="seedPhrase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground flex items-center">
                    <KeySquare className="mr-2 h-5 w-5 text-muted-foreground" />
                    Enter your 12 or 24-word Seed Phrase
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your seed phrase words separated by spaces..."
                      className="resize-none font-mono"
                      rows={4}
                      {...field}
                    />
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
            
            <Button type="submit" className="w-full btn-silver" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RotateCcw className="mr-2 h-4 w-4" />}
              Verify Seed Phrase
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Button variant="link" onClick={() => setShowEmailReset(true)} className="text-gold-accent hover:underline">
              Can&apos;t use seed phrase? Reset via Email
            </Button>
          </div>
        </Form>
      ) : (
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
            <Button type="submit" className="w-full btn-silver" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
              Send Reset Link
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Button variant="link" onClick={() => setShowEmailReset(false)} className="text-gold-accent hover:underline">
              Use Seed Phrase Instead
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}
