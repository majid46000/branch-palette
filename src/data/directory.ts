// Directory data structure: Branches → Categories → Sites
// Ready for JSON/RSS/API integration via RovoDev

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

// 40 Branch names
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

// Generate unique layout/style combinations
const getVariants = (index: number): { layoutVariant: LayoutVariant; styleVariant: StyleVariant } => {
  return {
    layoutVariant: layoutVariants[index % layoutVariants.length],
    styleVariant: styleVariants[index % styleVariants.length]
  };
};

// Generate 40 branches
export const branches: Branch[] = branchNames.map((name, index) => ({
  id: `branch-${index + 1}`,
  name,
  description: branchDescriptions[index],
  icon: branchIcons[index],
  categoryCount: 5,
  ...getVariants(index)
}));

// Category name templates
const categoryPrefixes = ["Core", "Advanced", "Pro", "Essential", "Premium"];
const categorySuffixes = ["Tools", "Solutions", "Platforms", "Services", "Systems"];
const categoryIcons = ["Folder", "Layers", "Box", "Grid3X3", "LayoutGrid"];

// Generate 5 categories for each branch
export const generateCategories = (branchId: string, branchName: string): Category[] => {
  const branchIndex = parseInt(branchId.split('-')[1]) - 1;
  
  return Array.from({ length: 5 }, (_, index) => {
    const globalIndex = branchIndex * 5 + index;
    return {
      id: `${branchId}-category-${index + 1}`,
      name: `${categoryPrefixes[index]} ${branchName} ${categorySuffixes[index]}`,
      description: `${categoryPrefixes[index]} ${categorySuffixes[index].toLowerCase()} for ${branchName.toLowerCase()}. Ready for API integration.`,
      icon: categoryIcons[index],
      branchId,
      siteCount: 10,
      ...getVariants(globalIndex)
    };
  });
};

// Site name prefixes for variety
const siteNamePrefixes = [
  "Alpha", "Beta", "Gamma", "Delta", "Epsilon",
  "Zeta", "Eta", "Theta", "Iota", "Kappa"
];

// Rich descriptions for human-like content
const generateFullDescription = (siteName: string, categoryName: string, branchName: string): string => {
  return `${siteName} represents a comprehensive solution within the ${categoryName} ecosystem, specifically designed for professionals and teams working in the ${branchName} industry. This powerful platform combines intuitive user interfaces with robust backend capabilities, enabling users to streamline their workflows and achieve exceptional results. Whether you're just getting started or looking to scale your operations, this tool provides the flexibility and power you need to succeed in today's competitive landscape.`;
};

// Generate skills for each site
const generateSkills = (categoryName: string, index: number): SiteSkill[] => {
  const skillSets = [
    [
      { name: "Data Analysis", level: "intermediate" as const },
      { name: "API Integration", level: "beginner" as const },
      { name: "Workflow Design", level: "advanced" as const },
      { name: "Report Generation", level: "intermediate" as const }
    ],
    [
      { name: "System Configuration", level: "advanced" as const },
      { name: "User Management", level: "intermediate" as const },
      { name: "Process Automation", level: "intermediate" as const },
      { name: "Custom Scripting", level: "beginner" as const }
    ],
    [
      { name: "Dashboard Creation", level: "beginner" as const },
      { name: "Data Visualization", level: "intermediate" as const },
      { name: "Template Design", level: "advanced" as const },
      { name: "Integration Setup", level: "intermediate" as const }
    ]
  ];
  return skillSets[index % skillSets.length];
};

// Generate benefits for each site
const generateBenefits = (index: number): SiteBenefit[] => {
  const benefitSets = [
    [
      { title: "Free Tier Available", description: "Start with our generous free plan, no credit card required" },
      { title: "24/7 Support", description: "Round-the-clock customer support via chat, email, and phone" },
      { title: "Cloud-Based", description: "Access your work from anywhere with automatic cloud sync" },
      { title: "Regular Updates", description: "Continuous improvements and new features every month" }
    ],
    [
      { title: "Enterprise Ready", description: "SOC 2 compliant with enterprise-grade security features" },
      { title: "API Access", description: "Full REST API access for custom integrations" },
      { title: "Team Collaboration", description: "Built-in tools for seamless team collaboration" },
      { title: "Custom Branding", description: "White-label options for your business" }
    ],
    [
      { title: "Mobile App", description: "Native iOS and Android apps for on-the-go access" },
      { title: "Offline Mode", description: "Work offline and sync when connected" },
      { title: "Analytics Dashboard", description: "Comprehensive analytics and reporting" },
      { title: "Priority Support", description: "Dedicated account manager for premium users" }
    ]
  ];
  return benefitSets[index % benefitSets.length];
};

// Generate features for each site
const generateFeatures = (categoryName: string, index: number): string[] => {
  const featureSets = [
    ["Drag-and-drop interface", "Real-time collaboration", "Advanced filtering", "Custom templates", "Export to multiple formats"],
    ["Automated workflows", "Role-based permissions", "Audit logging", "Two-factor authentication", "SSO integration"],
    ["Version history", "Comment threads", "Task assignments", "Deadline tracking", "Progress visualization"],
    ["Custom dashboards", "Email notifications", "Slack integration", "Zapier connectivity", "Webhook support"],
    ["Bulk operations", "Search and replace", "Tag management", "Archive and restore", "Duplicate detection"]
  ];
  return featureSets[index % featureSets.length];
};

// Generate metadata for each site
const generateMetadata = (index: number): SiteMetadata => {
  const platforms = ["Web", "Web, iOS, Android", "Web, Desktop", "Web, Mobile", "Cross-platform"];
  const languages = ["English", "Multi-language", "English, Spanish, French", "Global (40+ languages)", "English, German, Japanese"];
  const licenses = ["Freemium", "Open Source", "Proprietary", "MIT License", "Commercial"];
  
  return {
    lastUpdated: `2026-01-${String(10 + (index % 5)).padStart(2, '0')}`,
    version: `${2 + (index % 3)}.${index % 10}.${index % 5}`,
    license: licenses[index % licenses.length],
    platform: platforms[index % platforms.length],
    language: languages[index % languages.length]
  };
};

// Generate tags for each site
const generateTags = (categoryName: string, branchName: string, index: number): string[] => {
  const baseTags = [branchName.split(' ')[0], categoryName.split(' ')[0]];
  const additionalTags = [
    ["productivity", "automation", "efficiency"],
    ["collaboration", "teamwork", "communication"],
    ["analytics", "reporting", "insights"],
    ["integration", "api", "workflow"],
    ["management", "organization", "planning"]
  ];
  return [...baseTags, ...additionalTags[index % additionalTags.length]];
};

// Generate pricing for each site
const generatePricing = (index: number): string => {
  const pricingOptions = [
    "Free tier available. Pro: $12/month. Enterprise: Custom pricing",
    "Free forever for individuals. Teams: $8/user/month",
    "14-day free trial. Starter: $19/month. Business: $49/month",
    "Open source (free). Cloud hosted: $29/month",
    "Pay-as-you-go starting at $0.01/request. Volume discounts available"
  ];
  return pricingOptions[index % pricingOptions.length];
};

// Generate 10 sites for each category with rich content
export const generateSites = (categoryId: string, categoryName: string, branchId: string): Site[] => {
  const branch = getBranchById(branchId);
  const branchName = branch?.name || "Technology";
  
  return Array.from({ length: 10 }, (_, index) => {
    const siteName = `${siteNamePrefixes[index]} ${categoryName.split(' ')[0]}`;
    
    return {
      id: `${categoryId}-site-${index + 1}`,
      name: siteName,
      tagline: `Powerful ${categoryName.split(' ')[0].toLowerCase()} solution for modern teams`,
      description: `A comprehensive ${categoryName.toLowerCase()} tool designed for professionals in the ${branchName.toLowerCase()} industry. Features intuitive workflows, powerful automation, and seamless integrations.`,
      fullDescription: generateFullDescription(siteName, categoryName, branchName),
      url: "#",
      applyUrl: "#",
      categoryId,
      branchId,
      skills: generateSkills(categoryName, index),
      benefits: generateBenefits(index),
      features: generateFeatures(categoryName, index),
      pricing: generatePricing(index),
      metadata: generateMetadata(index),
      tags: generateTags(categoryName, branchName, index),
      rating: 4.0 + (index % 10) / 10,
      reviews: 100 + (index * 47) % 900
    };
  });
};

// Getters
export const getBranchById = (id: string): Branch | undefined => {
  return branches.find(branch => branch.id === id);
};

export const getCategoryById = (branchId: string, categoryId: string): Category | undefined => {
  const branch = getBranchById(branchId);
  if (!branch) return undefined;
  const categories = generateCategories(branchId, branch.name);
  return categories.find(cat => cat.id === categoryId);
};

export const getSiteById = (branchId: string, categoryId: string, siteId: string): Site | undefined => {
  const category = getCategoryById(branchId, categoryId);
  if (!category) return undefined;
  const sites = generateSites(categoryId, category.name, branchId);
  return sites.find(site => site.id === siteId);
};

// Get all categories for a branch
export const getCategoriesForBranch = (branchId: string): Category[] => {
  const branch = getBranchById(branchId);
  if (!branch) return [];
  return generateCategories(branchId, branch.name);
};

// Get all sites for a category
export const getSitesForCategory = (branchId: string, categoryId: string): Site[] => {
  const category = getCategoryById(branchId, categoryId);
  if (!category) return [];
  return generateSites(categoryId, category.name, branchId);
};
