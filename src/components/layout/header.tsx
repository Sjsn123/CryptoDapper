
import Link from "next/link";
import { DynamicLogo } from "@/components/core/dynamic-logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, UserCircle, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Digital Dapper Home">
          <DynamicLogo size="sm" />
          <span className="hidden font-bold sm:inline-block text-foreground">Digital Dapper</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          {displayedNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                "nav-link-hover-gradient-border" // Added class for hover effect
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button variant="ghost" size="icon" asChild aria-label="User Account">
              <Link href="/profile">
                <UserCircle className="h-6 w-6 text-accent" />
              </Link>
            </Button>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
                <Link href="/auth/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button className="btn-gold" asChild>
                <Link href="/auth/register">
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
                    className="text-lg font-medium text-foreground transition-colors hover:text-gold-accent"
                  >
                    {item.label}
                  </Link>
                ))}
                 {!isAuthenticated && (
                  <>
                    <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
                      <Link href="/auth/login">
                        <LogIn className="mr-2 h-4 w-4" /> Login
                      </Link>
                    </Button>
                    <Button className="btn-gold w-full" asChild>
                      <Link href="/auth/register">
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
