
"use client";

import Link from "next/link";
import { useState } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks"; // A common hook for this
import { DynamicLogo } from "@/components/core/dynamic-logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, UserCircle, LogIn, UserPlus } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  authRequired?: boolean;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard", authRequired: true },
  { href: "/education/tutorials", label: "Tutorials", authRequired: true },
  { href: "/events", label: "Events", authRequired: true },
];

interface HeaderProps {
  isAuthenticated?: boolean; 
}

export function Header({ isAuthenticated = false }: HeaderProps) {
  const displayedNavItems = navItems.filter(item => !item.authRequired || isAuthenticated);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleNavClick = () => {
    setShowConfetti(true);
    // Automatically stop confetti after a short time
    setTimeout(() => setShowConfetti(false), 4000); 
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
       {showConfetti && (
        <ReactConfetti
          width={width ?? undefined}
          height={height ?? undefined}
          numberOfPieces={200}
          recycle={false}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={handleNavClick} className="flex items-center gap-2" aria-label="Digital Dapper Home">
          <DynamicLogo size="sm" />
          <span className="hidden font-bold sm:inline-block text-foreground">Digital Dapper</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          {displayedNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground glimmer-hover"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button variant="ghost" size="icon" asChild aria-label="User Account">
              <Link href="/profile" onClick={handleNavClick}>
                <UserCircle className="h-6 w-6 text-accent" />
              </Link>
            </Button>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/auth/login" onClick={handleNavClick}>
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register" onClick={handleNavClick}>
                  <UserPlus className="mr-2 h-4 w-4" /> Register
                </Link>
              </Button>
            </div>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open Menu">
                <Menu className="h-6 w-6 text-accent" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
              <nav className="flex flex-col gap-4 mt-8">
                {displayedNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                 {!isAuthenticated && (
                  <>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/auth/login" onClick={handleNavClick}>
                        <LogIn className="mr-2 h-4 w-4" /> Login
                      </Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href="/auth/register" onClick={handleNavClick}>
                        <UserPlus className="mr-2 h-4 w-4" /> Register
                      </Link>
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
