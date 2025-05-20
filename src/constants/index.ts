
import type { Feature, CryptoEvent, PromoCode, FAQ, Tutorial, BlogPost, PortfolioAsset } from "@/types";
import { ShieldCheck, Gift, Newspaper, KeyRound, FileText, Video, Search, Rss, Settings, LayoutDashboard, BookOpen } from "lucide-react";

export const APP_NAME = "CryptoDapper Demo";
export const APP_TAGLINE = "Discover Crypto, Safely";

export const FEATURES_DATA: Feature[] = [
  {
    id: "secure-login",
    title: "Secure Authentication",
    description: "Experience a simulated secure login with mock credentials and 2FA.",
    icon: ShieldCheck,
    borderColorClass: "card-border-silver",
  },
  {
    id: "promo-codes",
    title: "Promo Code Redemption",
    description: "Input promo codes to see your mock account balance adjust instantly.",
    icon: Gift,
    borderColorClass: "card-border-silver",
  },
  {
    id: "crypto-events",
    title: "Crypto Events Display",
    description: "Stay updated with news-style crypto events from a mock feed.",
    icon: Newspaper,
    borderColorClass: "card-border-silver",
  },
  {
    id: "seed-phrase",
    title: "Seed Phrase Recovery",
    description: "Simulate account recovery using a mock seed phrase with interactive feedback.",
    icon: KeyRound,
    borderColorClass: "card-border-silver",
  },
];

export const MOCK_CRYPTO_EVENTS: CryptoEvent[] = [
  { id: "1", title: "Bitcoin Halving Event Announced for 2026", date: "2024-07-20", priority: "high", description: "The next Bitcoin halving is anticipated to occur in early 2026, further reducing block rewards." },
  { id: "2", title: "Ethereum Completes 'Dencun' Upgrade", date: "2024-07-18", description: "The Dencun upgrade successfully reduces Layer 2 transaction fees on Ethereum." },
  { id: "3", title: "Solana Network Upgrade v1.18 Deployed", date: "2024-07-15", priority: "regular", description: "Solana rolls out network upgrade v1.18, focusing on performance and stability improvements." },
  { id: "4", title: "New DeFi Protocol Launches on Avalanche", date: "2024-07-12", description: "A promising new DeFi protocol offering innovative yield farming strategies has launched on the Avalanche C-Chain." },
  { id: "5", title: "Cardano Summit 2024 Dates Revealed", date: "2024-07-10", priority: "regular", description: "The annual Cardano Summit dates and location have been announced, promising exciting updates for the ecosystem." },
];

export const PROMO_CODES_DATA: PromoCode[] = [
  { code: "DAPPER10", value: 1.1, message: "Success! 10% bonus applied to your DD Coins." },
  { code: "CRYPTOFUN", value: 1.05, message: "Awesome! 5% bonus added." },
  { code: "WELCOME24", value: 1.15, message: "Welcome aboard! Enjoy a 15% bonus." },
];

export const FAQS_DATA: FAQ[] = [
  { id: "1", question: "What is a seed phrase?", answer: "A seed phrase is a series of words that gives you access to your crypto wallet. It's like a master key. Keep it secret, keep it safe!" },
  { id: "2", question: "How do promo codes work on CryptoDapper?", answer: "Promo codes on CryptoDapper Demo are for simulation. Enter a valid code, and your mock DD Coin balance will update, mimicking real promotional bonuses." },
  { id: "3", question: "What is Two-Factor Authentication (2FA)?", answer: "2FA adds an extra layer of security to your account. Besides your password, you'll need a second code, usually from an authenticator app, to log in." },
  { id: "4", question: "Are the crypto events real-time?", answer: "The events displayed are mock data for demonstration purposes, designed to simulate real-time updates in the crypto space." },
  { id: "5", question: "Is CryptoDapper a real exchange?", answer: "No, CryptoDapper is a demo platform. All assets, transactions, and features are simulated for educational and illustrative purposes only." },
];

export const TUTORIALS_DATA: Tutorial[] = [
  { id: "1", title: "Setting up 2FA", description: "Learn how to enhance your account security by enabling Two-Factor Authentication.", category: "Security" },
  { 
    id: "2", 
    title: "Understanding Seed Phrases", 
    description: "Watch this video to discover what seed phrases are, why they are important, and how to manage them securely.", 
    videoUrl: "https://video.pictory.ai/v2/preview/49976340139528182917241747749055095",
    imageUrl: "https://sdmntprwestus2.oaiusercontent.com/files/00000000-8c38-61f8-b123-227517f3e36d/raw?se=2025-05-19T15%3A55%3A43Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=24a7dec3-38fc-4904-b888-8abe0855c442&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-19T13%3A06%3A29Z&ske=2025-05-20T13%3A06%3A29Z&sks=b&skv=2024-08-04&sig=surTUW0PdsISkCBxipvKHB8YqvDaeIDI6HO1xpSD3Q4%3D",
    category: "Basics" 
  },
  { id: "3", title: "How to Use Promo Codes", description: "A quick guide on finding and applying promo codes on the CryptoDapper platform.", category: "Platform Features" },
  { id: "4", title: "Introduction to Blockchain", description: "Get a basic understanding of blockchain technology and its core concepts.", category: "Concepts" },
  { id: "5", title: "What are DD Coins?", description: "Learn about the mock currency used on the CryptoDapper Demo platform.", category: "Platform Features"},
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  { id: "1", title: "What is Blockchain Technology?", summary: "An introductory guide to the revolutionary technology powering cryptocurrencies.", imageUrl: "https://placehold.co/300x200.png", dataAiHint: "blockchain technology", date: "2024-07-01", category: "Basics", tags: ["blockchain", "crypto", "technology"] },
  { id: "2", title: "Why 2FA Matters for Your Crypto Security", summary: "Understand the importance of Two-Factor Authentication in protecting your digital assets.", imageUrl: "https://placehold.co/300x200.png", dataAiHint: "cyber security", date: "2024-06-25", category: "Security", tags: ["2fa", "security", "best practices"] },
  { id: "3", title: "Exploring Different Types of Crypto Wallets", summary: "A look into various crypto wallet types: hot, cold, hardware, and software.", imageUrl: "https://placehold.co/300x200.png", dataAiHint: "crypto wallet", date: "2024-06-18", category: "Wallets", tags: ["wallets", "hot wallet", "cold wallet"] },
  { id: "4", title: "The Concept of Decentralization Explained", summary: "Dive into what decentralization means in the context of cryptocurrencies and beyond.", imageUrl: "https://placehold.co/300x200.png", dataAiHint: "decentralization network", date: "2024-06-10", category: "Concepts", tags: ["decentralization", "web3", "dao"] },
];

export const NAV_LINKS_AUTHENTICATED = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/education/tutorials", label: "Tutorials", icon: Video },
  { href: "/education/faqs", label: "FAQs", icon: Search },
  { href: "/education/blog", label: "Blog", icon: Rss },
  { href: "/events", label: "Crypto Events", icon: Newspaper },
  // { href: "/settings", label: "Settings", icon: Settings }, // Placeholder
];

export const MOCK_PORTFOLIO_ASSETS_DATA: PortfolioAsset[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    amount: 0.5,
    currentPriceUsd: 60000,
    valueUsd: 30000,
    iconUrl: "https://placehold.co/32x32.png",
    dataAiHint: "bitcoin logo",
    change24h: 2.5,
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    amount: 10,
    currentPriceUsd: 3500,
    valueUsd: 35000,
    iconUrl: "https://placehold.co/32x32.png",
    dataAiHint: "ethereum logo",
    change24h: -1.2,
  },
  {
    id: "doge",
    name: "Dogecoin",
    symbol: "DOGE",
    amount: 100000,
    currentPriceUsd: 0.15,
    valueUsd: 15000,
    iconUrl: "https://placehold.co/32x32.png",
    dataAiHint: "dogecoin logo",
    change24h: 5.7,
  },
];
