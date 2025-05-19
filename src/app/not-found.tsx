import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16">
        <AlertTriangle className="w-24 h-24 text-gold-accent mb-8" />
        <h1 className="text-5xl font-bold text-foreground mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild className="btn-gold text-lg px-8 py-3">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
