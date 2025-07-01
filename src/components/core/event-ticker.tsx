"use client";

import type { CryptoEvent } from "@/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventTickerProps {
  events: CryptoEvent[];
}

export function EventTicker({ events }: EventTickerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !events || events.length === 0) {
    return null; // Or a loading skeleton
  }

  const tickerContent = events.map(event => `${event.title} (${new Date(event.date).toLocaleDateString()})`).join(" • ");

  return (
    <div className="bg-primary/80 text-primary-foreground py-3 overflow-hidden shadow-md">
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Newspaper className="h-5 w-5 mr-3 text-primary shrink-0" />
          <div className="whitespace-nowrap animate-scroll-text [animation-duration:30s] hover:[animation-play-state:paused]">
            {events.map((event, index) => (
              <span key={event.id} className={cn(
                "mx-4 inline-block",
                event.priority === "high" ? "font-semibold text-primary" : "text-primary-foreground/80"
              )}>
                {event.link ? (
                  <Link href={event.link} className="hover:underline">{event.title}</Link>
                ) : (
                  event.title
                )}
                <span className="text-xs ml-1">({new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})</span>
                {index < events.length -1 && " • "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
