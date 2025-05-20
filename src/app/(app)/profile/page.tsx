
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth.tsx"; // Adjusted import
import { User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
      <Card className="max-w-md mx-auto card-border-gold">
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
          <CardDescription className="text-muted-foreground">{user?.email || "user@example.com"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">User ID</h3>
            <p className="text-foreground">{user?.uid || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Phone Number</h3>
            <p className="text-foreground">{user?.phoneNumber || "Not provided"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Email Verified</h3>
            <p className="text-foreground">{user?.emailVerified ? "Yes" : "No"}</p>
          </div>
          <p className="text-xs text-center text-muted-foreground pt-4">
            This is a placeholder profile page. More settings and details can be added here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
