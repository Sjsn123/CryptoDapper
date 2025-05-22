
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth.tsx"; 
import { User, LogOut, MailCheck, MailWarning, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ProfilePage() {
  const { user, logout, sendVerificationEmail, isLoading: authIsLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSendingVerification, setIsSendingVerification] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    // isLoading and redirection is handled by useAuth
    // setIsLoggingOut(false); // Component might unmount
  };

  const handleSendVerificationEmail = async () => {
    setIsSendingVerification(true);
    await sendVerificationEmail();
    setIsSendingVerification(false);
  };

  if (authIsLoading && !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-gold-accent" />
      </div>
    );
  }
  
  if (!user) {
      return (
         <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-destructive">Not Authenticated</h1>
            <p className="text-muted-foreground mt-2">Please log in to view your profile.</p>
        </div>
      )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
        <Button 
          variant="outline" 
          onClick={handleLogout} 
          disabled={isLoggingOut || authIsLoading}
          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          {isLoggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
          Logout
        </Button>
      </div>
      
      <Card className="max-w-xl mx-auto card-border-gold">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-gold-accent">
            <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || "User"} />
            <AvatarFallback>
              {user?.displayName ? (
                user.displayName.charAt(0).toUpperCase()
              ) : (
                <User className="w-12 h-12" />
              )}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl text-gradient-gold">{user?.displayName || "User Name"}</CardTitle>
          <CardDescription className="text-muted-foreground">{user?.email || "No email provided"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">User ID</h3>
            <p className="text-foreground break-all">{user?.uid || "N/A"}</p>
          </div>
          
          {user?.email && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Email Status</h3>
              {user.emailVerified ? (
                <Alert className="bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-400">
                  <MailCheck className="h-5 w-5" />
                  <AlertTitle>Email Verified</AlertTitle>
                  <AlertDescription>
                    Your email address <span className="font-semibold">{user.email}</span> has been verified.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive" className="bg-yellow-500/10 border-yellow-500/50 text-yellow-700 dark:text-yellow-400">
                  <MailWarning className="h-5 w-5" />
                  <AlertTitle>Email Not Verified</AlertTitle>
                  <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span>Your email <span className="font-semibold">{user.email}</span> is not verified.</span>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={handleSendVerificationEmail}
                      disabled={isSendingVerification || authIsLoading}
                      className="mt-2 sm:mt-0 px-0 text-yellow-600 dark:text-yellow-300 hover:underline"
                    >
                      {isSendingVerification ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Resend Verification Email"}
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
          
          <p className="text-xs text-center text-muted-foreground pt-4">
            More profile settings and details can be added here in future updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
