// src/data/directory.ts
// Complete Branch → Category → Site structure with SEO, tags, metadata, and internal linking
// Ready for generate-data.js, generate-sitemap.js, generate-meta.js

export type LayoutVariant = 'grid' | 'list' | 'compact' | 'featured';
export type StyleVariant = 'default' | 'gradient' | 'outlined' | 'elevated' | 'minimal';

export interface SiteSkill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface SiteBenefit {
  title: string;
  description: string;
}

export interface SiteMetadata {
  lastUpdated: string;
  version: string;
  license: string;
  platform: string;
  language: string;
}

export interface Site {
  id: string;
  name: string;
  tagline: string;
  description: string;
  fullDescription: string;
  url: string;
  applyUrl: string;
  categoryId: string;
  branchId: string;
  skills: SiteSkill[];
  benefits: SiteBenefit[];
  features: string[];
  pricing: string;
  metadata: SiteMetadata;
  tags: string[];
  rating: number;
  reviews: number;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  branchId: string;
  siteCount: number;
  layoutVariant: LayoutVariant;
  styleVariant: StyleVariant;
}

export interface Branch {
  id: string;
  name: string;
  description: string;
  icon: string;
  categoryCount: number;
  layoutVariant: LayoutVariant;
  styleVariant: StyleVariant;
}

// -------------------- Branch Data --------------------
const branchNames = [
  "AI & Machine Learning", "Web Development", "Mobile Apps", "Cloud Computing", "Cybersecurity",
  "Data Science", "DevOps", "Blockchain", "IoT & Hardware", "Game Development",
  "E-Commerce", "Marketing Tools", "Design & Creative", "Productivity", "Communication",
  "Finance & Fintech", "Healthcare Tech", "EdTech", "HR & Recruitment", "Legal Tech",
  "Real Estate Tech", "Travel Tech", "Food & Delivery", "Social Media", "Entertainment",
  "Music & Audio", "Video & Streaming", "Photography", "Writing & Content", "SEO & Analytics",
  "Project Management", "CRM & Sales", "Customer Support", "Automation", "No-Code Tools",
  "APIs & Integration", "Testing & QA", "Documentation", "Version Control", "Hosting & Servers"
];

const branchDescriptions = [
  "Artificial intelligence and machine learning tools",
  "Frontend, backend, and full-stack development",
  "iOS, Android, and cross-platform apps",
  "AWS, Azure, GCP and cloud services",
  "Security tools and protection systems",
  "Analytics, visualization, and big data",
  "CI/CD, deployment, and infrastructure",
  "Crypto, Web3, and decentralized apps",
  "Smart devices and hardware integration",
  "Game engines, assets, and development",
  "Online stores and marketplace tools",
  "Advertising, SEO, and growth tools",
  "UI/UX, graphics, and creative software",
  "Task management and efficiency tools",
  "Chat, video, and collaboration tools",
  "Banking, payments, and financial tools",
  "Medical, health, and wellness tech",
  "Learning platforms and educational tools",
  "Hiring, onboarding, and HR management",
  "Contracts, compliance, and legal tools",
  "Property management and real estate",
  "Booking, planning, and travel services",
  "Restaurants, delivery, and food tech",
  "Social networks and community tools",
  "Streaming, media, and entertainment",
  "Audio production and music tools",
  "Video editing and streaming platforms",
  "Photo editing and image management",
  "Content creation and writing tools",
  "Search optimization and web analytics",
  "Team coordination and project tracking",
  "Customer management and sales tools",
  "Help desk and support solutions",
  "Workflow automation and integration",
  "Build without code platforms",
  "API management and connections",
  "Testing frameworks and QA tools",
  "Knowledge base and documentation",
  "Git, repos, and code management",
  "Web hosting and server management"
];

const branchIcons = [
  "Brain", "Code", "Smartphone", "Cloud", "Shield",
  "BarChart3", "GitBranch", "Blocks", "Cpu", "Gamepad2",
  "ShoppingCart", "Megaphone", "Palette", "Zap", "MessageCircle",
  "DollarSign", "Heart", "GraduationCap", "Users", "Scale",
  "Building2", "Plane", "UtensilsCrossed", "Share2", "Film",
  "Music", "Video", "Camera", "PenTool", "Search",
  "Kanban", "UserCheck", "Headphones", "Bot", "Wand2",
  "Plug", "TestTube", "FileText", "GitFork", "Server"
];

const layoutVariants: LayoutVariant[] = ['grid', 'list', 'compact', 'featured'];
const styleVariants: StyleVariant[] = ['default', 'gradient', 'outlined', 'elevated', 'minimal'];

// Generate unique layout/style
const getVariants = (index: number) => ({
  layoutVariant: layoutVariants[index % layoutVariants.length],
  styleVariant: styleVariants[index % styleVariants.length]
});

// -------------------- Branches --------------------
export const branches: Branch[] = branchNames.map((name, i) => ({
  id: `branch-${i+1}`,
  name,
  description: branchDescriptions[i],
  icon: branchIcons[i],
  categoryCount: 5,
  ...getVariants(i)
}));

// -------------------- Categories --------------------
const categoryPrefixes = ["Core", "Advanced", "Pro", "Essential", "Premium"];
const categorySuffixes = ["Tools", "Solutions", "Platforms", "Services", "Systems"];
const categoryIcons = ["Folder", "Layers", "Box", "Grid3X3", "LayoutGrid"];

export const generateCategories = (branchId: string, branchName: string): Category[] => {
  const branchIndex = parseInt(branchId.split('-')[1]) - 1;
  return Array.from({ length: 5 }, (_, idx) => {
    const globalIndex = branchIndex * 5 + idx;
    return {
      id: `${branchId}-category-${idx+1}`,
      name: `${categoryPrefixes[idx]} ${branchName} ${categorySuffixes[idx]}`,
      description: `${categoryPrefixes[idx]} ${categorySuffixes[idx].toLowerCase()} for ${branchName.toLowerCase()}. Optimized for SEO.`,
      icon: categoryIcons[idx],
      branchId,
      siteCount: 10,
      ...getVariants(globalIndex)
    };
  });
};

// -------------------- Sites --------------------
const sitePrefixes = ["Alpha","Beta","Gamma","Delta","Epsilon","Zeta","Eta","Theta","Iota","Kappa"];

const generateFullDescription = (siteName: string, categoryName: string, branchName: string) =>
  `${siteName} is a full-featured platform in the ${categoryName} category of ${branchName}, designed for professionals and teams. It provides intuitive workflows, robust automation, and seamless integrations, delivering measurable results.`;

const generateSkills = (idx: number): SiteSkill[] => [
  { name: "Data Analysis", level: "intermediate" as const },
  { name: "API Integration", level: "beginner" as const },
  { name: "Workflow Design", level: "advanced" as const },
  { name: "Report Generation", level: "intermediate" as const }
];

const generateBenefits = (): SiteBenefit[] => [
  { title: "Free Tier Available", description: "Start with a generous free plan" },
  { title: "24/7 Support", description: "Round-the-clock customer support" },
  { title: "Cloud-Based", description: "Access your work anywhere" },
  { title: "Regular Updates", description: "Continuous improvements monthly" }
];

const generateFeatures = (): string[] => [
  "Drag-and-drop interface",
  "Real-time collaboration",
  "Advanced filtering",
  "Custom templates",
  "Export to multiple formats"
];

const generateMetadata = (idx: number): SiteMetadata => ({
  lastUpdated: `2026-01-${10 + (idx % 5)}`,
  version: `2.${idx % 10}.${idx % 5}`,
  license: ["Freemium","Open Source","Proprietary","MIT License","Commercial"][idx % 5],
  platform: ["Web","Web,iOS,Android","Web,Desktop","Web,Mobile","Cross-platform"][idx % 5],
  language: ["English","Multi-language","English,Spanish,French","Global (40+ languages)","English,German,Japanese"][idx % 5]
});

const generateTags = (categoryName: string, branchName: string): string[] =>
  [categoryName.split(' ')[0], branchName.split(' ')[0], "productivity","automation","efficiency","teamwork","analytics"];

export const generateSites = (categoryId: string, categoryName: string, branchId: string): Site[] => {
  const branch = branches.find(b => b.id === branchId);
  const branchName = branch?.name || "Technology";
  return Array.from({ length: 10 }, (_, idx) => {
    const siteName = `${sitePrefixes[idx]} ${categoryName.split(' ')[0]}`;
    return {
      id: `${categoryId}-site-${idx+1}`,
      name: siteName,
      tagline: `Powerful ${categoryName.split(' ')[0]} solution`,
      description: `A comprehensive ${categoryName.toLowerCase()} tool in ${branchName}`,
      fullDescription: generateFullDescription(siteName, categoryName, branchName),
      url: `/${branchId}/${categoryId}/${siteName.toLowerCase().replace(/\s+/g,'-')}`,
      applyUrl: `/${branchId}/${categoryId}/${siteName.toLowerCase().replace(/\s+/g,'-')}/apply`,
      categoryId,
      branchId,
      skills: generateSkills(idx),
      benefits: generateBenefits(),
      features: generateFeatures(),
      pricing: "Free tier available. Pro: $12/month",
      metadata: generateMetadata(idx),
      tags: generateTags(categoryName, branchName),
      rating: 4 + (idx % 10)/10,
      reviews: 100 + idx*37,
      seoTitle: `${siteName} - ${categoryName} in ${branchName}`,
      seoDescription: `Learn about ${siteName}, a top ${categoryName.toLowerCase()} solution for ${branchName.toLowerCase()} professionals.`,
      canonicalUrl: `https://yourdomain.com/${branchId}/${categoryId}/${siteName.toLowerCase().replace(/\s+/g,'-')}`
    };
  });
};

// -------------------- Getters --------------------
export const getBranchById = (id: string) => branches.find(b => b.id === id);

export const getCategoryById = (branchId: string, categoryId: string) => {
  const branch = getBranchById(branchId);
  if (!branch) return undefined;
  const categories = generateCategories(branchId, branch.name);
  return categories.find(c => c.id === categoryId);
};

export const getSiteById = (branchId: string, categoryId: string, siteId: string) => {
  const category = getCategoryById(branchId, categoryId);
  if (!category) return undefined;
  const sites = generateSites(categoryId, category.name, branchId);
  return sites.find(s => s.id === siteId);
};

export const getCategoriesForBranch = (branchId: string) => {
  const branch = getBranchById(branchId);
  if (!branch) return [];
  return generateCategories(branchId, branch.name);
};

export const getSitesForCategory = (branchId: string, categoryId: string) => {
  const category = getCategoryById(branchId, categoryId);
  if (!category) return [];
  return generateSites(categoryId, category.name, branchId);
};
