
"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { DynamicLogo } from "@/components/core/dynamic-logo";

const footerLinks = [
  { href: "/education/faqs", label: "FAQs" },
  { href: "/education/tutorials", label: "Tutorials" },
  { href: "/education/blog", label: "Blog" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
];

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-auto border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2" aria-label="CryptoDapper Demo Home">
              <DynamicLogo size="sm" />
              <span className="font-bold text-foreground">CryptoDapper</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Discover Crypto, Safely. A demo platform for exploring crypto concepts.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-3">
            <div>
              <p className="font-medium text-foreground">Company</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground">Resources</p>
              <ul className="mt-4 space-y-2 text-sm">
                {footerLinks.slice(0,3).map(link => (
                   <li key={link.href}><Link href={link.href} className="text-muted-foreground hover:text-foreground">{link.label}</Link></li>
                ))}
              </ul>
            </div>
             <div>
              <p className="font-medium text-foreground">Legal</p>
              <ul className="mt-4 space-y-2 text-sm">
                {footerLinks.slice(3).map(link => (
                   <li key={link.href}><Link href={link.href} className="text-muted-foreground hover:text-foreground">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {currentYear || 'Loading...'} CryptoDapper Demo. All rights reserved. For demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
