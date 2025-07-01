
import type { Tutorial } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PlayCircle, FileText } from "lucide-react";
import Image from "next/image";
import React from 'react';
import { useToast } from "@/hooks/use-toast";

interface TutorialCardProps {
  tutorial: Tutorial;
  onToggleComplete: (id: string, completed: boolean) => void;
  isCompleted: boolean;
}

export const TutorialCard = React.memo(function TutorialCard({ tutorial, onToggleComplete, isCompleted }: TutorialCardProps) {
  const { toast } = useToast();

  const handleCheckedChange = (checkedState: boolean | 'indeterminate') => {
    if (typeof checkedState === 'boolean') {
      onToggleComplete(tutorial.id, checkedState);
    }
  };

  const handleContentAreaClick = () => {
    if (tutorial.videoUrl) {
      window.open(tutorial.videoUrl, '_blank', 'noopener,noreferrer');
      // Automatically mark as complete when user engages with the content
      if (!isCompleted) {
        onToggleComplete(tutorial.id, true);
        toast({
          title: "Progress Updated!",
          description: `"${tutorial.title}" marked as complete.`,
        });
      }
    } else {
      // Handle case where there's no video by providing info
      toast({
        title: "Content Information",
        description: "This tutorial is a text-based guide. Mark as complete using the checkbox when you're done.",
      });
    }
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        {/* The main interactive area is now a button to engage with content */}
        <button
          onClick={handleContentAreaClick}
          className="relative aspect-video mb-4 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary group cursor-pointer"
          aria-label={`View tutorial: ${tutorial.title}`}
        >
          {tutorial.imageUrl ? (
            <Image 
              src={tutorial.imageUrl} 
              alt={`Thumbnail for ${tutorial.title}`} 
              layout="fill" 
              objectFit="cover"
              data-ai-hint={tutorial.imageUrl ? undefined : "video tutorial placeholder"}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
             <div className="flex items-center justify-center h-full bg-muted">
                <FileText className="h-16 w-16 text-muted-foreground" />
             </div>
          )}

          {tutorial.videoUrl ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
              <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors group-hover:scale-110 transform" />
            </div>
          ) : tutorial.content ? (
             <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
              <FileText className="h-12 w-12 text-white/80" />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <p className="text-xs text-background bg-foreground/70 px-2 py-1 rounded">Content coming soon</p>
            </div>
          )}
        </button>
        
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
            className="border-accent data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
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
