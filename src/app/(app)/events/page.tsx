
"use client";

import { useEffect, useState } from "react";
import { EventCard } from "@/components/core/event-card";
import { getAICryptoEvents, type CryptoEventOutput } from "@/ai/flows/crypto-events-flow"; // Updated import
import type { CryptoEvent } from "@/types"; // Keep this for EventCard prop type consistency
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Newspaper } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"; // Import Card components for skeleton

export default function EventsPage() {
  const [events, setEvents] = useState<CryptoEvent[]>([]); // State type remains CryptoEvent for broader compatibility
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        const fetchedEventsOutput: CryptoEventOutput[] = await getAICryptoEvents();
        
        // Map CryptoEventOutput to CryptoEvent if needed, or ensure types are compatible
        // For now, assuming CryptoEventOutput is compatible enough with CryptoEvent for EventCard
        setEvents(fetchedEventsOutput as CryptoEvent[]); // Casting for now, ensure properties match
        setError(null);
      } catch (e) {
        console.error("Failed to fetch AI crypto events:", e);
        setError("Failed to load AI-generated events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center">
          <Newspaper className="mr-3 h-8 w-8 text-gold-accent" />
          AI Generated Crypto Events
        </h1>
        <p className="text-muted-foreground">
          Stay informed with the latest (fictional, AI-generated) news and updates from the crypto world.
        </p>
      </header>

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => ( // Show 3 skeletons
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter className="border-t pt-4 mt-auto">
                <Skeleton className="h-8 w-1/3" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && error && (
         <div className="flex flex-col items-center justify-center text-center py-12 bg-card rounded-lg shadow-lg">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-xl font-semibold text-destructive mb-2">Error Loading Events</h2>
            <p className="text-muted-foreground">{error}</p>
            <p className="text-xs text-muted-foreground mt-2">Ensure your Genkit server is running and properly configured.</p>
        </div>
      )}

      {!isLoading && !error && events.length === 0 && (
        <div className="text-center py-12 bg-card rounded-lg shadow-md">
            <Newspaper className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-muted-foreground">No Events Generated</h2>
            <p className="text-muted-foreground mt-2">The AI didn't generate any events this time. Try refreshing.</p>
        </div>
      )}

      {!isLoading && !error && events.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
