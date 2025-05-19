
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DynamicLogo } from "@/components/core/dynamic-logo";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/core/feature-card";
import { EventTicker } from "@/components/core/event-ticker";
import { FEATURES_DATA, MOCK_CRYPTO_EVENTS, APP_NAME, APP_TAGLINE } from "@/constants";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={false} /> {/* Mock: user is not authenticated on homepage */}
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary to-background text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://placehold.co/1920x1080/222D3B/1A2533/png?text=Crypto+Nodes&font=roboto')] bg-cover bg-center" data-ai-hint="abstract blockchain"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <DynamicLogo size="lg" className="mx-auto mb-8 animate-pulse-glow" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              Welcome to <span className="text-gradient-gold">{APP_NAME}</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
              {APP_TAGLINE}
            </p>
            <div className="mt-10">
              <Button size="lg" className="btn-gold px-8 py-3 text-lg" asChild>
                <Link href="/auth/register">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Overview Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Explore Crypto Concepts</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Hands-on simulations of key cryptocurrency features.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {FEATURES_DATA.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* How it works / Value Proposition Section */}
        <section className="py-16 md:py-24 bg-primary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Learn by Doing, Risk-Free
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  CryptoDapper Demo provides a safe sandbox environment to understand complex crypto interactions without using real assets. Perfect for beginners and those curious about blockchain technology.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-gold-accent mr-3 mt-1 shrink-0" />
                    <span>Interactive simulations of wallet features and transactions.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-gold-accent mr-3 mt-1 shrink-0" />
                    <span>Understand security concepts like 2FA and seed phrases.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-gold-accent mr-3 mt-1 shrink-0" />
                    <span>Get a feel for crypto events and market dynamics through mock data.</span>
                  </li>
                </ul>
                 <Button variant="link" className="text-gold-accent mt-6 px-0 text-lg" asChild>
                    <Link href="/education/tutorials">
                        Browse Tutorials <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                <Image 
                  src="https://sdmntprwestus2.oaiusercontent.com/files/00000000-8c38-61f8-b123-227517f3e36d/raw?se=2025-05-19T15%3A55%3A43Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=24a7dec3-38fc-4904-b888-8abe0855c442&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-19T13%3A06%3A29Z&ske=2025-05-20T13%3A06%3A29Z&sks=b&skv=2024-08-04&sig=surTUW0PdsISkCBxipvKHB8YqvDaeIDI6HO1xpSD3Q4%3D" 
                  alt="Cryptocurrency coins" 
                  layout="fill"
                  objectFit="cover"
                  className="transform transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Real-Time Crypto Events Ticker */}
        <EventTicker events={MOCK_CRYPTO_EVENTS} />
      </main>
      
      <Footer />
    </div>
  );
}
