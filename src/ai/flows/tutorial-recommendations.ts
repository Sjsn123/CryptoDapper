'use server';

/**
 * @fileOverview A tutorial recommendation AI agent.
 *
 * - getTutorialRecommendations - A function that handles the tutorial recommendation process.
 * - TutorialRecommendationsInput - The input type for the getTutorialRecommendations function.
 * - TutorialRecommendationsOutput - The return type for the getTutorialRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TutorialRecommendationsInputSchema = z.object({
  featureUsage: z
    .string()
    .describe('A description of the user feature usage on the platform.'),
});
export type TutorialRecommendationsInput = z.infer<
  typeof TutorialRecommendationsInputSchema
>;

const TutorialRecommendationsOutputSchema = z.object({
  tutorialRecommendations: z
    .array(z.string())
    .describe('A list of tutorial recommendations for the user.'),
});
export type TutorialRecommendationsOutput = z.infer<
  typeof TutorialRecommendationsOutputSchema
>;

export async function getTutorialRecommendations(
  input: TutorialRecommendationsInput
): Promise<TutorialRecommendationsOutput> {
  return tutorialRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tutorialRecommendationsPrompt',
  input: {schema: TutorialRecommendationsInputSchema},
  output: {schema: TutorialRecommendationsOutputSchema},
  prompt: `You are an AI assistant specializing in providing personalized tutorial recommendations for users of the CryptoDapper Demo platform.

  Based on the user's feature usage, recommend tutorials that would be most helpful to them.
  Return a list of tutorial titles as tutorial recommendations.

  User Feature Usage: {{{featureUsage}}}`,
});

const tutorialRecommendationsFlow = ai.defineFlow(
  {
    name: 'tutorialRecommendationsFlow',
    inputSchema: TutorialRecommendationsInputSchema,
    outputSchema: TutorialRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
