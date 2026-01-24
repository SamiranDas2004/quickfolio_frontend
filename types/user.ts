export interface User {
  id: string;
  username: string; // URL slug
  email: string;
  password: string; // hashed
  name: string; // for TextHoverEffect
  title: string; // e.g., "Full Stack Developer"
  bio: string; // description text
  avatar_url: string;
  background_preference: "ripple" | "beams";
  template_type: "conversational" | "fullpage" | "professional" | "modern";
  social_links: SocialLinks;
  projects: Project[];
  skills: string[];
  experience: Experience[];
  contact: ContactInfo;
  custom_sections?: CustomSection[];
  created_at: Date;
  updated_at: Date;
}

export interface SocialLinks {
  [key: string]: string | undefined;
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  medium?: string;
  dev?: string;
  hashnode?: string;
  stackoverflow?: string;
  dribbble?: string;
  behance?: string;
  figma?: string;
  discord?: string;
  telegram?: string;
  whatsapp?: string;
  portfolio?: string;
  blog?: string;
  website?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
  image_url?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  resume_url?: string;
}

export type SectionType = 'education' | 'awards' | 'publications' | 'certifications' | 'volunteer' | 'speaking' | 'custom';

export interface CustomSection {
  id: string;
  type: SectionType;
  title: string;
  order: number;
  visible: boolean;
  items: SectionItem[];
}

export interface SectionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  image_url?: string;
  link?: string;
}