
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { Header } from '@/components/layout/header';
import { DynamicLogo } from '@/components/core/dynamic-logo';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NAV_LINKS_AUTHENTICATED } from '@/constants';
import { LogOut, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth.tsx'; 

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { user, isLoading: authIsLoading, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  if (authIsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-gold-accent" />
        <span className="ml-2">Loading application...</span>
      </div>
    );
  }

  if (!user) {
    return (
       <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-gold-accent" />
        <span className="ml-2">Redirecting to login...</span>
      </div>
    );
  }
  
  const handleLogout = async () => {
    await logout();
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={!!user} />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col",
            isSidebarOpen ? "w-64" : "w-20"
          )}
        >
          <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
            {isSidebarOpen && (
              <Link href="/dashboard" className="flex items-center gap-2">
                <DynamicLogo size="sm" />
                <span className="font-bold text-sm">Digital Dapper</span>
              </Link>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
              aria-label={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <nav className="py-4 px-2">
              {NAV_LINKS_AUTHENTICATED.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors mb-1",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      !isSidebarOpen && "justify-center"
                    )}
                    title={!isSidebarOpen ? item.label : undefined}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {isSidebarOpen && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>
          <div className="p-4 border-t border-sidebar-border">
            <Button 
              variant="ghost" 
              className={cn(
                "w-full flex items-center gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                !isSidebarOpen && "justify-center"
                )} 
              onClick={handleLogout}
              title={!isSidebarOpen ? "Logout" : undefined}
              disabled={authIsLoading}
            >
              {authIsLoading ? <Loader2 className="h-5 w-5 shrink-0 animate-spin" /> : <LogOut className="h-5 w-5 shrink-0" />}
              {isSidebarOpen && <span>Logout</span>}
            </Button>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-6 bg-background overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

    
