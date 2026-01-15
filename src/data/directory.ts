// Directory data structure: Branches → Categories → Sites
// Ready for JSON/RSS/API integration via RovoDev

export type LayoutVariant = 'grid' | 'list' | 'compact' | 'featured';
export type StyleVariant = 'default' | 'gradient' | 'outlined' | 'elevated' | 'minimal';

export interface Site {
  id: string;
  name: string;
  description: string;
  url: string;
  categoryId: string;
  branchId: string;
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

// Generate 10 sites for each category
export const generateSites = (categoryId: string, categoryName: string, branchId: string): Site[] => {
  const siteNames = [
    "Alpha", "Beta", "Gamma", "Delta", "Epsilon",
    "Zeta", "Eta", "Theta", "Iota", "Kappa"
  ];
  
  return Array.from({ length: 10 }, (_, index) => ({
    id: `${categoryId}-site-${index + 1}`,
    name: `${siteNames[index]} - ${categoryName.split(' ')[0]}`,
    description: `Placeholder for ${categoryName}. Ready for JSON/RSS/API data via RovoDev.`,
    url: "#",
    categoryId,
    branchId
  }));
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
