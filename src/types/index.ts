export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
}

export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
  variant?: "default" | "outline" | "ghost" | "emergency";
  children?: NavItem[];
}

export interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
}
