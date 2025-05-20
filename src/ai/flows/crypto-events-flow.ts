
'use server';
/**
 * @fileOverview A Genkit flow to generate mock cryptocurrency events.
 *
 * - getAICryptoEvents - A function that generates a list of mock crypto events.
 * - CryptoEventOutput - The Zod schema for a single generated crypto event.
 * - GeneratedCryptoEventsOutput - The Zod schema for the list of generated events.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

// Zod schema for a single event as expected from the AI (without ID)
const AICryptoEventSchema = z.object({
  title: z.string().describe('A catchy and plausible, but fictional, crypto news headline.'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe('The date of the event in YYYY-MM-DD format. Should be recent (e.g., within the last 1-2 weeks).'),
  description: z.string().optional().describe('A short, 1-2 sentence fictional description of the event.'),
  priority: z.enum(['high', 'regular']).optional().describe("The priority of the event, either 'high' or 'regular'. Default to 'regular' if unsure."),
});

// Zod schema for the output of the prompt, which is an array of AI-generated events
const GeneratedCryptoEventsOutputSchema = z.object({
  generatedEvents: z.array(AICryptoEventSchema).describe('A list of 3-5 generated fictional crypto events.'),
});
export type GeneratedCryptoEventsOutput = z.infer<typeof GeneratedCryptoEventsOutputSchema>;

// Zod schema for the final event structure including the ID we add
const CryptoEventOutputSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  description: z.string().optional(),
  priority: z.enum(['high', 'regular']).optional(),
  link: z.string().optional(), // Keep link optional, AI won't generate it
});
export type CryptoEventOutput = z.infer<typeof CryptoEventOutputSchema>;


// Define the prompt for Genkit
const cryptoEventsPrompt = ai.definePrompt({
  name: 'generateCryptoEventsPrompt',
  // No specific input schema needed for this version, but could be added later (e.g., { count: z.number() })
  output: { schema: GeneratedCryptoEventsOutputSchema },
  prompt: `You are an AI assistant that generates plausible but fictional cryptocurrency news headlines and summaries for a demo platform.
Generate a list of 4 recent crypto events.
For each event, provide:
- A 'title': A catchy and plausible, but fictional, crypto news headline.
- A 'date': The date of the event in YYYY-MM-DD format. Make the dates appear recent, like within the last 7-10 days from today.
- An optional 'description': A short, 1-2 sentence fictional description of the event.
- An optional 'priority': Can be 'high' or 'regular'. Default to 'regular' if unsure or not highly impactful.

Focus on events that sound like typical crypto news (e.g., network upgrades, new partnerships, market analysis insights, new (fictional) project launches, security alerts on (fictional) protocols).
Do NOT use real, specific, trademarked company names or existing coin symbols/names (e.g., avoid "Bitcoin," "Ethereum," "Solana," "Coinbase," "Binance"). Instead, use generic or made-up names like "Quantum Ledger Initiative," "NovaCoin," "DeFiPulse Protocol," "the mainnet of the Zenith chain," etc.
Ensure the output is a list of events according to the schema.
`,
});

// Define the flow
const generateCryptoEventsFlow = ai.defineFlow(
  {
    name: 'generateCryptoEventsFlow',
    // No input schema for this version
    outputSchema: z.array(CryptoEventOutputSchema), // The final output will be an array of our fully structured CryptoEvent
  },
  async () => {
    const { output } = await cryptoEventsPrompt({}); // Call the prompt
    if (!output || !output.generatedEvents) {
      console.error("AI did not return the expected event structure.");
      return [];
    }

    // Add unique IDs to each event
    const eventsWithIds: CryptoEventOutput[] = output.generatedEvents.map(event => ({
      ...event,
      id: uuidv4(), // Generate a unique ID
      // link remains undefined as AI is not asked to generate it
    }));

    // Sort events by date, newest first, before returning
    eventsWithIds.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return eventsWithIds;
  }
);

// Exported wrapper function to be called by the application
export async function getAICryptoEvents(): Promise<CryptoEventOutput[]> {
  return generateCryptoEventsFlow();
}

// The MOCK_CRYPTO_EVENTS export was removed.
// The homepage (/src/app/page.tsx) imports MOCK_CRYPTO_EVENTS directly from '@/constants'.
