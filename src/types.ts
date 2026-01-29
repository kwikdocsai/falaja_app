
export interface Transcription {
  id: string;
  title: string;
  text: string;
  date: string;
  time: string;
  duration: string;
  category: 'Business' | 'Personal' | 'Favorites';
}

export interface UserProfile {
  name: string;
  phone: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  creditsRemaining: number;
  creditsTotal: number;
  stats: {
    minutes: number;
    shares: number;
    savedHours: number;
  };
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}
