
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DynamicLogo } from "@/components/core/dynamic-logo";
import { Users, Target, Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <DynamicLogo size="lg" className="mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary">About Digital Dapper</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your personal sandbox for exploring the world of digital assets safely and interactively.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16 text-center">
          <Card className="bg-card/70 backdrop-blur-sm animate-fade-in">
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              To demystify cryptocurrency and blockchain concepts through hands-on, risk-free simulations. We believe learning should be intuitive, engaging, and accessible to everyone.
            </CardContent>
          </Card>

          <Card className="bg-card/70 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              We envision a world where anyone can confidently navigate the digital economy. Digital Dapper is the first step: a playground to build foundational knowledge without fear of making costly mistakes.
            </CardContent>
          </Card>

          <Card className="bg-card/70 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Who We Are</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Digital Dapper is a demonstration project built to showcase modern web technologies and user-centric design. It's a testament to the power of interactive learning in complex fields.
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
