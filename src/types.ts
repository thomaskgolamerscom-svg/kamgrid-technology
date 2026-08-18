export interface CompanyInfo {
  name: string;
  tagline: string;
  supportingTagline: string;
  positioningStatement: string;
  supportingStatement: string;
  parentCompany: string;
  phone1: string;
  phone2: string;
  whatsapp: string;
  email: string;
  address: string;
  establishedYear: number;
  cacRegistered: boolean;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  description?: string;
  highlight?: boolean;
}

export interface ServiceCapability {
  id: string;
  name: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image: string;
  capabilities: string[];
  isCore?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  clientType: 'Residential' | 'Commercial' | 'Industrial' | 'Government' | 'Institutional';
  serviceCategory: string;
  systemDetails: string;
  result: string;
  year: string;
  featured: boolean;
  images: string[];
  beforeAfterImages?: { before: string; after: string }[];
  description: string;
}

export interface StrengthItem {
  number: string;
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  photo?: string;
  qualification: string;
  bio: string;
  specialty: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  description: string;
  verified: boolean;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRoleOrCompany: string;
  location: string;
  quote: string;
  rating: number;
  approved: boolean;
}

export interface HeroConfig {
  headline: string;
  supportingText: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  heroImage: string;
}

export interface CMSData {
  company: CompanyInfo;
  hero: HeroConfig;
  stats: StatItem[];
  aboutStory: string;
  aboutSolveText: string;
  capacityHeadline: string;
  capacityText: string;
  capacityHighlight: string;
  strengths: StrengthItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  team: TeamMember[];
  certifications: CertificationItem[];
  testimonials: TestimonialItem[];
}

export interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  location: string;
  serviceRequired: string;
  projectDescription: string;
}
