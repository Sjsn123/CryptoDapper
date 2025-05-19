
"use client";

import { useState, useEffect } from 'react';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-3xl px-4 py-12">
        <Button asChild variant="outline" className="mb-8 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-foreground mb-6">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-muted-foreground prose-headings:text-foreground">
          <p><strong>Last Updated:</strong> {lastUpdated || 'Loading...'}</p>
          
          <p>Welcome to CryptoDapper Demo! This is a demonstration application, and this Privacy Policy is a placeholder to illustrate how such a page would look.</p>

          <h2>1. Information We Collect (Mock)</h2>
          <p>Since CryptoDapper Demo is a mock application, we do not collect or store real personal information. Any data you enter (e.g., email for mock registration, promo codes) is processed locally in your browser or for demonstration purposes only and is not persisted on a server in a way that identifies you personally.</p>
          
          <h2>2. How We Use Your Information (Mock)</h2>
          <p>Information entered is used solely for the purpose of demonstrating the application&apos;s features, such as:</p>
          <ul>
            <li>Simulating user registration and login.</li>
            <li>Applying mock promo codes to a mock account balance.</li>
            <li>Tracking tutorial progress (stored in your browser&apos;s local storage).</li>
          </ul>

          <h2>3. Data Storage and Security (Mock)</h2>
          <p>Any data used for the demo (like tutorial completion status) is stored in your browser&apos;s local storage. We do not transmit this data to any server for long-term storage. As this is a demo, standard security practices for production applications (like encryption of data at rest and in transit for real user data) are simulated or described but not fully implemented with real user data.</p>

          <h2>4. Third-Party Services</h2>
          <p>CryptoDapper Demo does not integrate with real third-party services that would collect your personal data. Any mention of third-party services (like OAuth providers) is for simulation purposes only.</p>

          <h2>5. Cookies and Tracking Technologies</h2>
          <p>We may use local storage for functional purposes (e.g., remembering your tutorial progress or mock authentication state). We do not use cookies for tracking or advertising purposes.</p>
          
          <h2>6. Your Rights</h2>
          <p>As no real personal data is collected, rights related to data access, correction, or deletion are not applicable in the traditional sense. You can clear your browser&apos;s local storage to remove any mock data stored by CryptoDapper Demo.</p>

          <h2>7. Changes to This Privacy Policy</h2>
          <p>This placeholder Privacy Policy may be updated. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

          <h2>8. Contact Us</h2>
          <p>If you have any questions about this placeholder Privacy Policy, please contact us at demo@cryptodapper.com (this is a mock email address).</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
