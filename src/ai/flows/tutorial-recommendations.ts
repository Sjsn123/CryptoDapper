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
import { TUTORIALS_DATA } from '@/constants'; // Import the tutorials data

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
    .describe('A list of 2-3 tutorial titles that are most relevant to the user\'s interest, selected ONLY from the provided list.'),
});
export type TutorialRecommendationsOutput = z.infer<
  typeof TutorialRecommendationsOutputSchema
>;

export async function getTutorialRecommendations(
  input: TutorialRecommendationsInput
): Promise<TutorialRecommendationsOutput> {
  return tutorialRecommendationsFlow(input);
}

// Map tutorials to a string for the prompt to understand the available options
const availableTutorialsString = TUTORIALS_DATA.map(
  t => `- "${t.title}": ${t.description}`
).join('\n');

const prompt = ai.definePrompt({
  name: 'tutorialRecommendationsPrompt',
  input: {schema: TutorialRecommendationsInputSchema},
  output: {schema: TutorialRecommendationsOutputSchema},
  prompt: `You are an AI assistant specializing in providing personalized tutorial recommendations for users of the CryptoDapper Demo platform.

  Based on the user's described interest, you MUST recommend 2-3 tutorials from the following list of available tutorials.
  Only recommend titles that are present in this list. Do not make up new titles or recommend anything not on this list.

  Here is the list of available tutorials:
  ${availableTutorialsString}

  User Interest: {{{featureUsage}}}`,
});

const tutorialRecommendationsFlow = ai.defineFlow(
  {
    name: 'tutorialRecommendationsFlow',
    inputSchema: TutorialRecommendationsInputSchema,
    outputSchema: TutorialRecommendationsOutputSchema,
  },
  async input => {
    // The prompt now has the tutorial list baked in, so we just call it.
    const {output} = await prompt(input);
    
    if (!output?.tutorialRecommendations) {
       console.error("AI did not return any recommendations.");
       return { tutorialRecommendations: [] };
    }

    return output;
  }
);
