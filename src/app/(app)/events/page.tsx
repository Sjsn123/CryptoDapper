"use client";

import { useEffect, useState } from "react";
import { EventCard } from "@/components/core/event-card";
import { getEvents } from "@/lib/mock-api";
import type { CryptoEvent } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<CryptoEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        const fetchedEvents = await getEvents();
        // Sort events by date, newest first
        fetchedEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setEvents(fetchedEvents);
        setError(null);
      } catch (e) {
        console.error("Failed to fetch events:", e);
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Crypto Events</h1>
        <p className="text-muted-foreground">
          Stay informed with the latest (mock) news and updates from the crypto world.
        </p>
      </header>

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent className="flex-grow">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
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
         <div className="flex flex-col items-center justify-center text-center py-12 bg-card rounded-lg">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-xl font-semibold text-destructive mb-2">Error Loading Events</h2>
            <p className="text-muted-foreground">{error}</p>
        </div>
      )}

      {!isLoading && !error && events.length === 0 && (
        <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-muted-foreground">No Events Found</h2>
            <p className="text-muted-foreground mt-2">There are currently no events to display.</p>
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
