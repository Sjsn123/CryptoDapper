import type { Tutorial } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PlayCircle, FileText, CheckSquare, Square } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TutorialCardProps {
  tutorial: Tutorial;
  onToggleComplete: (id: string, completed: boolean) => void;
}

export function TutorialCard({ tutorial, onToggleComplete }: TutorialCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 card-border-silver">
      <CardHeader>
        {tutorial.videoUrl ? (
           <div className="relative aspect-video mb-4 rounded-md overflow-hidden">
             <Image 
                src={`https://placehold.co/400x225.png`} // Placeholder for actual video thumbnail
                alt={`Thumbnail for ${tutorial.title}`} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint="video tutorial"
              />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <PlayCircle className="h-16 w-16 text-white/80 hover:text-white transition-colors" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 bg-muted rounded-md mb-4">
            <FileText className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
        <CardTitle className="text-xl text-foreground">{tutorial.title}</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">{tutorial.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-xs text-muted-foreground">Category: {tutorial.category}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4 mt-auto">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`complete-${tutorial.id}`}
            checked={tutorial.isCompleted}
            onCheckedChange={(checked) => onToggleComplete(tutorial.id, !!checked)}
            className="border-accent data-[state=checked]:bg-gold-accent data-[state=checked]:text-primary"
          />
          <label
            htmlFor={`complete-${tutorial.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
          >
            {tutorial.isCompleted ? "Completed" : "Mark as complete"}
          </label>
        </div>
        {/* Placeholder for a "View Tutorial" button if there's a dedicated page */}
        {/* <Button variant="link" className="text-gold-accent px-0">View Details</Button> */}
      </CardFooter>
    </Card>
  );
}
