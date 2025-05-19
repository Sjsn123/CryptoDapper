import type { CryptoEvent } from "@/types";
import { MOCK_CRYPTO_EVENTS } from "@/constants";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getEvents(): Promise<CryptoEvent[]> {
  await delay(500); // Simulate network latency
  return MOCK_CRYPTO_EVENTS;
}

export async function getEventById(id: string): Promise<CryptoEvent | undefined> {
  await delay(300);
  return MOCK_CRYPTO_EVENTS.find(event => event.id === id);
}
