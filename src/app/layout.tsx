
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/hooks/use-auth.tsx'; // Import AuthProvider

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Digital Dapper',
  description: 'Discover Digital Assets, Safely. A platform for exploring digital asset concepts.',
};

function StarryBackground() {
  return (
    <>
      <div id="stars1" className="stars">
        {[...Array(50)].map((_, i) => <div key={i} className="star" />)}
      </div>
      <div id="stars2" className="stars">
         {[...Array(50)].map((_, i) => <div key={i} className="star" />)}
      </div>
       <div id="stars3" className="stars">
         {[...Array(50)].map((_, i) => <div key={i} className="star" />)}
      </div>
    </>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body 
        className={`${inter.variable} ${robotoMono.variable} font-sans antialiased`} 
        suppressHydrationWarning
      >
        <StarryBackground />
        <AuthProvider> {/* Wrap children with AuthProvider */}
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
