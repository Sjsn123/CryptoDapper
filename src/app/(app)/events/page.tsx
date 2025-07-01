
"use client";

import { useEffect, useState } from "react";
import { EventCard } from "@/components/core/event-card";
import { getAICryptoEvents } from "@/ai/flows/crypto-events-flow";
import type { CryptoEvent } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Newspaper } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function EventsPage() {
  const [events, setEvents] = useState<CryptoEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const aiEvents = await getAICryptoEvents();
        setEvents(aiEvents);
      } catch (error) {
        console.error("Failed to fetch AI-generated crypto events:", error);
        // Silently fail, which will result in the "No Events" message.
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
          <Newspaper className="mr-3 h-8 w-8 text-primary" />
          Crypto Events Showcase
        </h1>
        <p className="text-muted-foreground">
          Stay informed with the latest AI-generated news and updates from the crypto world.
        </p>
      </header>

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
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

      {!isLoading && events.length === 0 && (
        <div className="text-center py-12 bg-card rounded-lg shadow-md">
            <Newspaper className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-muted-foreground">No Events Available</h2>
            <p className="text-muted-foreground mt-2">Could not fetch events. Please check back later.</p>
        </div>
      )}

      {!isLoading && events.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
