"use client";

import { useState, useEffect } from "react";
import { TutorialCard } from "@/components/core/tutorial-card";
import { TutorialRecommendationEngine } from "@/components/core/tutorial-recommendation-engine";
import { TUTORIALS_DATA } from "@/constants";
import type { Tutorial } from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const TUTORIAL_PROGRESS_KEY = "cryptoDapperTutorialProgress";

export default function TutorialsPage() {
  const [allTutorials, setAllTutorials] = useState<Tutorial[]>(TUTORIALS_DATA);
  const [completedTutorials, setCompletedTutorials] = useLocalStorage<string[]>(TUTORIAL_PROGRESS_KEY, []);

  useEffect(() => {
    setAllTutorials(prevTutorials =>
      prevTutorials.map(t => ({ ...t, isCompleted: completedTutorials.includes(t.id) }))
    );
  }, [completedTutorials]);

  const handleToggleComplete = (id: string, completed: boolean) => {
    setCompletedTutorials(prev =>
      completed ? [...new Set([...prev, id])] : prev.filter(tutId => tutId !== id)
    );
  };

  const categories = Array.from(new Set(allTutorials.map(t => t.category)));
  const progressPercentage = (completedTutorials.length / allTutorials.length) * 100;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Tutorials</h1>
        <p className="text-muted-foreground">
          Learn about crypto concepts and platform features through our guided tutorials.
        </p>
      </header>

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
              <TutorialCard key={tutorial.id} tutorial={tutorial} onToggleComplete={handleToggleComplete} />
            ))}
          </div>
        </TabsContent>

        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allTutorials.filter(t => t.category === category).map((tutorial) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} onToggleComplete={handleToggleComplete} />
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
