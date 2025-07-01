import type { CryptoEvent } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: CryptoEvent;
}

export function EventCard({ event }: EventCardProps) {
  const borderColorClass = event.priority === 'high' ? 'border-primary' : 'border-border';
  
  return (
    <Card className={cn("flex flex-col h-full hover:shadow-xl transition-shadow duration-300", borderColorClass)}>
      <CardHeader>
        <CardTitle className="text-xl text-foreground">{event.title}</CardTitle>
        <div className="flex items-center text-xs text-muted-foreground pt-1">
          <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
          <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </CardHeader>
      {event.description && (
        <CardContent className="flex-grow">
          <CardDescription className="line-clamp-3 text-muted-foreground">{event.description}</CardDescription>
        </CardContent>
      )}
      <CardFooter className="border-t pt-4 mt-auto">
        <Button variant="link" asChild className="text-primary px-0 hover:underline">
          <a
            href={event.link || `https://www.google.com/search?q=${encodeURIComponent(event.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            {event.link ? "Read More" : "Learn More"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
