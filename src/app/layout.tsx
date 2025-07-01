
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/hooks/use-auth.tsx'; // Import AuthProvider
import type { CSSProperties } from 'react';

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
  const createStars = (count: number, baseSpeed: number, sizeMultiplier: number) => {
    return [...Array(count)].map((_, i) => {
      const size = Math.random() * sizeMultiplier + 1;
      const style: CSSProperties = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * (baseSpeed * 2) + baseSpeed}s`, // Randomize speed
        animationDelay: `-${Math.random() * baseSpeed}s`, // Start animations at different times
        width: `${size}px`,
        height: `${size}px`,
      };
      return <div key={i} className="star" style={style} />;
    });
  };

  return (
    <>
      <div id="stars1" className="stars">
        {createStars(50, 30, 1.5)}
      </div>
      <div id="stars2" className="stars">
         {createStars(50, 50, 2)}
      </div>
       <div id="stars3" className="stars">
         {createStars(50, 80, 2.5)}
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
