
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
  { 
    id: "1", 
    title: "Setting up 2FA", 
    description: "Learn how to enhance your account security by enabling Two-Factor Authentication. Watch this video for a step-by-step guide.", 
    category: "Security",
    videoUrl: "https://youtu.be/CCB89tKDlPE?si=YRklk7h-uEnwkJY-",
    imageUrl: "https://www.debutinfotech.com/_next/image?url=https%3A%2F%2Fblogs.debutinfotech.com%2Fwp-content%2Fuploads%2F2024%2F11%2FTwo-Factor-Authentication.jpg&w=1920&q=85"
  },
  {
    id: "2",
    title: "Understanding Seed Phrases",
    description: "Watch this video to discover what seed phrases are, why they are important, and how to manage them securely.",
    videoUrl: "https://video.pictory.ai/v2/preview/49976340139528182917241747749055095",
    imageUrl: "https://sdmntprwestus2.oaiusercontent.com/files/00000000-8c38-61f8-b123-227517f3e36d/raw?se=2025-05-19T15%3A55%3A43Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=24a7dec3-38fc-4904-b888-8abe0855c442&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-19T13%3A06%3A29Z&ske=2025-05-20T13%3A06%3A29Z&sks=b&skv=2024-08-04&sig=surTUW0PdsISkCBxipvKHB8YqvDaeIDI6HO1xpSD3Q4%3D", // Previous specific image
    category: "Basics"
  },
  { id: "3", title: "How to Use Promo Codes", description: "A quick guide on finding and applying promo codes on the CryptoDapper platform.", category: "Platform Features" },
  { id: "4", title: "Introduction to Blockchain", description: "Get a basic understanding of blockchain technology and its core concepts.", category: "Concepts" },
  { id: "5", title: "What are DD Coins?", description: "Learn about the mock currency used on the CryptoDapper Demo platform.", category: "Platform Features"},
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: "1",
    title: "What is Blockchain Technology?",
    summary: "An introductory guide to the revolutionary technology powering cryptocurrencies.",
    imageUrl: "https://www.investopedia.com/thmb/pzT2wbISy-wNtMypVlBjr39dydg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Blockchain_final-086b5b7b9ef74ecf9f20fe627dba1e34.png",
    date: "2024-07-01",
    category: "Basics",
    tags: ["blockchain", "crypto", "technology"],
    externalLink: "https://www.geeksforgeeks.org/blockchain-technology-introduction/",
    content: "An introductory guide to the revolutionary technology powering cryptocurrencies. Blockchain is a distributed ledger technology (DLT) that allows for secure, transparent, and tamper-proof recording of transactions. It consists of a growing chain of blocks, where each block contains a batch of transactions and is cryptographically linked to the previous one using a hash. This ensures data integrity and security, as altering any block would invalidate all subsequent blocks. The decentralized nature of most blockchains means no single entity, like a bank or government, controls the currency or transaction ledger. This can lead to increased transparency, censorship resistance, and reduced reliance on intermediaries, forming a core tenet of Web3 and Decentralized Autonomous Organizations (DAOs). Its applications extend far beyond finance, into areas like supply chain management, voting systems, and digital identity."
  },
  {
    id: "2",
    title: "Why 2FA Matters for Your Crypto Security",
    summary: "Understand the importance of Two-Factor Authentication in protecting your digital assets.",
    imageUrl: "https://www.trisearch.com.au/wp-content/uploads/2024/12/Blog-Why-2FA-matters-in-2025.png", // Using the specific image
    date: "2024-06-25",
    category: "Security",
    tags: ["2fa", "security", "best practices"],
    externalLink: "https://sinch.com/blog/security-now-why-two-factor-authentication-must-have/",
    content: `In the world of cryptocurrency, where you are often your own bank, security is paramount. One of the most effective layers of protection you can add to your accounts is Two-Factor Authentication, commonly known as 2FA. Simply put, 2FA adds a second step to your login process. Beyond just your username and password (something you know), it requires a second piece of information – typically something you have (like a code from an authenticator app on your phone) or something you are (like a fingerprint scan). Why is this crucial? If a hacker manages to steal or guess your password, they still won't be able to access your account without also having access to your second factor. This significantly reduces the risk of unauthorized access and potential theft of your valuable crypto assets. Common methods for 2FA include authenticator apps (like Google Authenticator or Authy), SMS codes (though generally considered less secure due to SIM-swapping risks), or hardware security keys (like YubiKey). For crypto accounts, authenticator apps or hardware keys are generally recommended over SMS. Enabling 2FA is a simple step that dramatically enhances your security posture. Don't overlook it – your digital assets will thank you!`
  },
  { 
    id: "3", 
    title: "Exploring Different Types of Crypto Wallets", 
    summary: "A look into various crypto wallet types: hot, cold, hardware, and software, and their pros and cons.", 
    imageUrl: "https://101blockchains.com/wp-content/uploads/2021/10/Types-of-Crypto-Wallets-2.png", 
    date: "2024-06-18", 
    category: "Wallets", 
    tags: ["wallets", "hot wallet", "cold wallet", "hardware", "software"], 
    externalLink: "https://www.blockchain-council.org/cryptocurrency/types-of-wallets/",
    content: `Choosing the right cryptocurrency wallet is crucial for managing and securing your digital assets. There isn't a one-size-fits-all solution, as different wallets offer varying levels of security, convenience, and control. Let's explore the main types:\n\n**1. Hot Wallets:**\nThese are wallets connected to the internet. They include:\n*   **Web Wallets:** Accessed through a web browser. Often found on exchanges. Convenient for frequent trading but can be vulnerable if the exchange is hacked.\n*   **Mobile Wallets:** Apps on your smartphone. Convenient for on-the-go transactions. Security depends on your phone's security and the app itself.\n*   **Desktop Wallets:** Software installed on your computer. Offers a balance of security and convenience but can be vulnerable if your computer is compromised by malware.\n**Pros:** Easy to use, convenient for quick access and frequent transactions.\n**Cons:** Generally less secure than cold wallets due to their internet connectivity.\n\n**2. Cold Wallets (Cold Storage):**\nThese wallets store your private keys offline, making them highly resistant to online hacking attempts.\n*   **Hardware Wallets:** Physical devices (like a USB drive) that store your private keys offline. Transactions are signed on the device itself, so keys never leave it. Examples include Ledger and Trezor.\n    **Pros:** Highest level of security for storing significant amounts of crypto.\n    **Cons:** Less convenient for frequent transactions, cost money to purchase.\n*   **Paper Wallets:** A piece of paper on which your public and private keys are printed (often as QR codes).\n    **Pros:** Completely offline, can be very secure if generated and stored correctly.\n    **Cons:** Susceptible to physical damage (fire, water), loss, or theft. Can be cumbersome to use for transactions.\n\n**Key Considerations When Choosing:**\n*   **Security:** How much crypto are you storing? For large amounts, a hardware wallet is highly recommended.\n*   **Convenience:** How often do you plan to transact? Hot wallets are better for daily use.\n*   **Control:** Do you want full control over your private keys (non-custodial), or are you okay with a third party (like an exchange) managing them (custodial)?\n*   **Technical Skill:** Some wallets are more user-friendly than others.\n\nUnderstanding these differences will help you make an informed decision to protect your crypto investments.` 
  },
  { 
    id: "4", 
    title: "The Concept of Decentralization Explained", 
    summary: "Dive into what decentralization means in the context of cryptocurrencies and beyond.", 
    imageUrl: "https://www.investopedia.com/thmb/F_lMbEKfu7Bj_3QpqhvoFjOOnJw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/decentralized-finance-defi-5113835-3bd35e94d7414f9abd030bea7910b467.png", 
    date: "2024-06-10", 
    category: "Concepts", 
    tags: ["decentralization", "web3", "dao"], 
    externalLink: "https://www.techtarget.com/searchcio/definition/blockchain-decentralization",
    content: "Decentralization is a core principle in the world of blockchain and cryptocurrencies. It refers to the transfer of control and decision-making from a centralized entity (like a single company, government, or individual) to a distributed network. Instead of relying on a central point of authority, decentralized systems operate through a network of participants who often collaborate to maintain and validate the system's state. In the context of cryptocurrencies, this typically means there's no central bank controlling the currency or a single server processing all transactions. Instead, transactions are verified and recorded by multiple computers (nodes) in the network. This distribution offers several key benefits: increased transparency (as the ledger is often public), enhanced security (as there's no single point of failure to attack), censorship resistance (as it's harder for one entity to block or reverse transactions), and reduced reliance on intermediaries. This concept is foundational to Web3, Decentralized Autonomous Organizations (DAOs), and various other applications aiming to create more open and user-controlled systems."
  },
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

// Schema for AI-generated Crypto Events
export interface AICryptoEvent {
  title: string;
  date: string; // Expecting YYYY-MM-DD from AI
  description?: string;
  priority?: 'high' | 'regular';
}
