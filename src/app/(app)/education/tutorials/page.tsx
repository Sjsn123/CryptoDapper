
"use client";

import { useState, useEffect, useCallback, useMemo } from "react"; 
import { TutorialCard } from "@/components/core/tutorial-card";
import { TutorialRecommendationEngine } from "@/components/core/tutorial-recommendation-engine";
import { TUTORIALS_DATA } from "@/constants";
import type { Tutorial } from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage.ts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const TUTORIAL_PROGRESS_KEY = "digitalDapperTutorialProgress";

export default function TutorialsPage() {
  const [allTutorials, setAllTutorials] = useState<Tutorial[]>(TUTORIALS_DATA);
  const initialCompletedTutorials = useMemo(() => [], []); // Stable initial value
  const [completedTutorials, setCompletedTutorials] = useLocalStorage<string[]>(TUTORIAL_PROGRESS_KEY, initialCompletedTutorials);

  const handleToggleComplete = useCallback((id: string, completed: boolean) => {
    setCompletedTutorials(prevCompletedIds => {
      const newSet = new Set(prevCompletedIds);
      if (completed) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return Array.from(newSet);
    });
  }, [setCompletedTutorials]); 

  const categories = Array.from(new Set(allTutorials.map(t => t.category)));
  const progressPercentage = allTutorials.length > 0 ? (completedTutorials.length / allTutorials.length) * 100 : 0;

  return (
    <div className="space-y-8">

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">Your Progress</h3>
          <span className="text-sm font-medium text-gold-accent">{completedTutorials.length} / {allTutorials.length} completed</span>
        </div>
        <Progress value={progressPercentage} className="w-full h-3 [&>div]:bg-gradient-to-r [&>div]:from-gold-accent [&>div]:to-yellow-400" />
      </div>

      <TutorialRecommendationEngine />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allTutorials.map((tutorial) => (
              <TutorialCard 
              key={tutorial.id} 
              tutorial={tutorial} 
              onToggleComplete={handleToggleComplete} 
              isCompleted={completedTutorials.includes(tutorial.id)} 
              />
            ))}
          </div>
        </TabsContent>

        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allTutorials.filter(t => t.category === category).map((tutorial) => (
                <TutorialCard key={tutorial.id} 
                tutorial={tutorial} 
                onToggleComplete={handleToggleComplete} 
                isCompleted={completedTutorials.includes(tutorial.id)}
                 />
              ))}
            </div>
             {allTutorials.filter(t => t.category === category).length === 0 && (
              <p className="text-center text-muted-foreground py-8 col-span-full">No tutorials in this category yet.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

    