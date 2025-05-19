export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType; // Lucide icon component
  borderColorClass: string;
}

export interface CryptoEvent {
  id: string;
  title: string;
  date: string;
  description?: string;
  priority?: 'high' | 'regular';
  link?: string; // Optional link to a blog post or external source
}

export interface PromoCode {
  code: string;
  value: number; // e.g., 1.1 for 10% increase
  message: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  videoUrl?: string; // Placeholder or actual YouTube embed URL
  content?: string; // Text content if no video
  category: string;
  isCompleted?: boolean; // For localStorage tracking
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  date: string;
  category: string;
  tags: string[];
  content?: string; // Full content for individual post page
  author?: string;
}

export interface TutorialRecommendation {
  title: string;
  reason?: string;
}
