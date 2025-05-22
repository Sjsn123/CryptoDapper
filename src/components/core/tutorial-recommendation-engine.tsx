
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast.ts";
import { getTutorialRecommendations, type TutorialRecommendationsInput } from "@/ai/flows/tutorial-recommendations";
import type { TutorialRecommendation } from "@/types";
import { Wand2, Loader2, Lightbulb } from "lucide-react";

export function TutorialRecommendationEngine() {
  const [featureUsage, setFeatureUsage] = useState("");
  const [recommendations, setRecommendations] = useState<TutorialRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!featureUsage.trim()) {
      toast({
        variant: "destructive",
        title: "Input Required",
        description: "Please describe your feature usage or interests.",
      });
      return;
    }

    setIsLoading(true);
    setRecommendations([]);
    try {
      const input: TutorialRecommendationsInput = { featureUsage };
      const result = await getTutorialRecommendations(input);
      if (result && result.tutorialRecommendations) {
        setRecommendations(result.tutorialRecommendations.map(title => ({ title })));
        toast({
          title: "Recommendations Generated!",
          description: "Here are some tutorials you might find helpful.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not generate recommendations at this time.",
        });
      }
    } catch (error) {
      console.error("Error getting tutorial recommendations:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while generating recommendations.",
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="mt-8 shadow-lg card-border-gold">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Wand2 className="mr-2 h-6 w-6 text-gold-accent" />
          Personalized Tutorial Recommendations
        </CardTitle>
        <CardDescription>
          Tell us what you&apos;re doing or interested in (e.g., &quot;how wallets work&quot; or &quot;DeFi security&quot;), and our AI will suggest relevant tutorials from the Digital Dapper platform.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Describe your current platform usage or learning goals..."
          value={featureUsage}
          onChange={(e) => setFeatureUsage(e.target.value)}
          rows={3}
          className="bg-input"
        />
        <Button onClick={handleSubmit} disabled={isLoading} className="btn-gold w-full sm:w-auto">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Get Recommendations
        </Button>
      </CardContent>
      {recommendations.length > 0 && (
        <CardFooter className="flex flex-col items-start space-y-3 border-t pt-4">
          <h3 className="text-lg font-semibold text-foreground">Suggested Tutorials:</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <Lightbulb className="h-4 w-4 mr-2 mt-1 text-gold-accent shrink-0" />
                {rec.title}
              </li>
            ))}
          </ul>
        </CardFooter>
      )}
    </Card>
  );
}

    
