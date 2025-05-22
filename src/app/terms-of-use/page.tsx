
"use client";

import { useState, useEffect } from 'react';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfUsePage() {
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
        <h1 className="text-3xl font-bold text-foreground mb-6">Terms of Use</h1>
        <div className="prose prose-invert max-w-none text-muted-foreground prose-headings:text-foreground">
          <p><strong>Last Updated:</strong> {lastUpdated || 'Loading...'}</p>

          <p>Welcome to Digital Dapper! These Terms of Use govern your use of the Digital Dapper application. By accessing or using the application, you agree to be bound by these terms.</p>

          <h2>1. Acceptance of Terms</h2>
          <p>Digital Dapper is a demonstration application provided for illustrative and educational purposes only. It does not offer real financial services, cryptocurrency trading, or investment advice.</p>

          <h2>2. Use of the Application</h2>
          <ul>
            <li><strong>Eligibility:</strong> There are no eligibility requirements as this is a demo application.</li>
            <li><strong>Mock Nature:</strong> You acknowledge that all features, functionalities, account balances, transactions, promo codes, and events within Digital Dapper are simulated and do not represent real assets or market activities.</li>
            <li><strong>Prohibited Conduct:</strong> You agree not to use the application for any unlawful purpose or in any way that could harm, disable, overburden, or impair the demonstration.</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <p>The Digital Dapper application, including its design, text, graphics, and underlying code (excluding third-party libraries or assets used under license), is the property of its creators and is protected by copyright and other intellectual property laws. This is a placeholder statement.</p>

          <h2>4. Disclaimers</h2>
          <ul>
            <li><strong>No Financial Advice:</strong> Digital Dapper does not provide financial, investment, legal, or tax advice. Any information presented is for demonstration purposes only.</li>
            <li><strong>As-Is Basis:</strong> The application is provided "as is" and "as available" without any warranties of any kind, express or implied. We do not warrant that the application will be error-free or uninterrupted.</li>
            <li><strong>No Real Value:</strong> Any "coins," "tokens," or "balances" shown in Digital Dapper have no real-world value.</li>
          </ul>
          
          <h2>5. Limitation of Liability</h2>
          <p>To the fullest extent permitted by applicable law, the creators of Digital Dapper shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of this demonstration application.</p>

          <h2>6. Modifications to Terms</h2>
          <p>We reserve the right to modify these Terms of Use at any time. Any changes will be effective immediately upon posting the revised terms. Your continued use of the application after such changes constitutes your acceptance of the new terms.</p>

          <h2>7. Governing Law</h2>
          <p>These Terms of Use shall be governed by and construed in accordance with the laws of a relevant jurisdiction (placeholder for actual legal jurisdiction).</p>

          <h2>8. Contact Information</h2>
          <p>If you have any questions about these Terms of Use, please contact us at demo@digitaldapper.com (this is a mock email address).</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

    
