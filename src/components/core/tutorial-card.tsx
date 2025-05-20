
import type { Tutorial } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PlayCircle, FileText } from "lucide-react";
import Image from "next/image";
import React from 'react';

interface TutorialCardProps {
  tutorial: Tutorial;
  onToggleComplete: (id: string, completed: boolean) => void;
  isCompleted: boolean;
}

export const TutorialCard = React.memo(function TutorialCard({ tutorial, onToggleComplete, isCompleted }: TutorialCardProps) {
  const handleCheckedChange = (checkedState: boolean | 'indeterminate') => {
    if (typeof checkedState === 'boolean') {
      onToggleComplete(tutorial.id, checkedState);
    }
  };

  const handleVideoAreaClick = () => {
    if (tutorial.videoUrl) {
      window.open(tutorial.videoUrl, '_blank', 'noopener,noreferrer');
      if (!isCompleted) {
        onToggleComplete(tutorial.id, true);
      }
    }
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 card-border-silver">
      <CardHeader>
        {tutorial.videoUrl ? (
           <button
            onClick={handleVideoAreaClick}
            className="relative aspect-video mb-4 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-gold-accent group cursor-pointer"
            aria-label={`Watch tutorial: ${tutorial.title}`}
           >
             <Image 
                src={tutorial.imageUrl || `https://placehold.co/640x360.png`} 
                alt={`Thumbnail for ${tutorial.title}`} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={tutorial.imageUrl ? undefined : "video tutorial placeholder"}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
              <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors group-hover:scale-110 transform" />
            </div>
          </button>
        ) : tutorial.content ? ( 
          <div className="flex items-center justify-center h-48 bg-muted rounded-md mb-4">
            <FileText className="h-16 w-16 text-muted-foreground" />
          </div>
        ) : ( 
           <div className="flex items-center justify-center h-48 bg-muted rounded-md mb-4">
            <Image 
              src={tutorial.imageUrl || `https://placehold.co/640x360.png`}
              alt={tutorial.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={tutorial.imageUrl ? undefined : "tutorial content placeholder"}
              className="opacity-80"
            />
             {!tutorial.imageUrl && <p className="absolute text-xs text-muted-foreground bg-background/70 px-2 py-1 rounded">Content coming soon</p>}
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
            checked={isCompleted}
            onCheckedChange={handleCheckedChange}
            className="border-accent data-[state=checked]:bg-gold-accent data-[state=checked]:text-primary"
          />
          <label
            htmlFor={`complete-${tutorial.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
          >
            {isCompleted ? "Completed" : "Mark as complete"}
          </label>
        </div>
      </CardFooter>
    </Card>
  );
});
TutorialCard.displayName = 'TutorialCard';
