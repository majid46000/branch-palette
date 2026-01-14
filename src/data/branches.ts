// Branch and Specialty data structure - placeholder data ready for JSON/RSS/API integration

export interface Specialty {
  id: string;
  name: string;
  description: string;
  icon: string;
  branchId: string;
}

export interface Branch {
  id: string;
  name: string;
  description: string;
  icon: string;
  specialtyCount: number;
}

// Generate 40 branches with meaningful placeholder names
const branchNames = [
  "Technology", "Healthcare", "Finance", "Education", "Manufacturing",
  "Retail", "Transportation", "Energy", "Agriculture", "Construction",
  "Entertainment", "Hospitality", "Legal", "Marketing", "Real Estate",
  "Telecommunications", "Aerospace", "Automotive", "Biotechnology", "Cybersecurity",
  "Data Analytics", "E-Commerce", "Environmental", "Fashion", "Food & Beverage",
  "Gaming", "Government", "Human Resources", "Insurance", "Logistics",
  "Media", "Nonprofit", "Pharmaceuticals", "Professional Services", "Publishing",
  "Research", "Security", "Social Media", "Sports", "Wellness"
];

const branchDescriptions = [
  "Digital solutions and software development",
  "Medical services and health technology",
  "Banking, investments and financial services",
  "Learning platforms and educational resources",
  "Industrial production and automation",
  "Consumer goods and shopping solutions",
  "Mobility and logistics solutions",
  "Power generation and sustainability",
  "Farming technology and food production",
  "Building and infrastructure development",
  "Media, gaming and content creation",
  "Travel, hotels and restaurant services",
  "Law firms and legal technology",
  "Advertising and brand management",
  "Property management and development",
  "Network infrastructure and communications",
  "Aviation and space technology",
  "Vehicle manufacturing and mobility",
  "Life sciences and genetic research",
  "Digital security and protection",
  "Business intelligence and insights",
  "Online retail and marketplaces",
  "Sustainability and green technology",
  "Apparel and textile industry",
  "Culinary and beverage services",
  "Video games and interactive media",
  "Public sector and civic technology",
  "Talent management and recruitment",
  "Risk management and coverage",
  "Supply chain and distribution",
  "Broadcasting and journalism",
  "Charitable organizations and NGOs",
  "Drug development and medical devices",
  "Consulting and business services",
  "Books, magazines and digital content",
  "Scientific studies and innovation",
  "Physical and digital protection",
  "Online platforms and communities",
  "Athletics and fitness technology",
  "Health and lifestyle improvement"
];

const iconOptions = [
  "Cpu", "Heart", "DollarSign", "GraduationCap", "Factory",
  "ShoppingBag", "Truck", "Zap", "Leaf", "Building2",
  "Film", "Hotel", "Scale", "Megaphone", "Home",
  "Wifi", "Plane", "Car", "Dna", "Shield",
  "BarChart3", "ShoppingCart", "Recycle", "Shirt", "Coffee",
  "Gamepad2", "Landmark", "Users", "Umbrella", "Package",
  "Tv", "HandHeart", "Pill", "Briefcase", "BookOpen",
  "Microscope", "Lock", "Share2", "Trophy", "Sparkles"
];

export const branches: Branch[] = branchNames.map((name, index) => ({
  id: `branch-${index + 1}`,
  name,
  description: branchDescriptions[index],
  icon: iconOptions[index],
  specialtyCount: 50 + Math.floor(Math.random() * 10) // 50-59 specialties
}));

// Generate specialties for a given branch
export const generateSpecialties = (branchId: string, branchName: string): Specialty[] => {
  const specialtyPrefixes = [
    "Advanced", "Basic", "Core", "Digital", "Enterprise",
    "Full-Stack", "Global", "Hybrid", "Integrated", "Joint",
    "Key", "Lean", "Modern", "Next-Gen", "Optimized",
    "Premium", "Quality", "Rapid", "Smart", "Total",
    "Unified", "Virtual", "Web-Based", "Extended", "Yield-Focused",
    "Zero-Waste", "Agile", "Blockchain", "Cloud", "Data-Driven",
    "Edge", "Flexible", "Green", "High-Performance", "Intelligent",
    "Just-in-Time", "Knowledge-Based", "Low-Code", "Mobile", "Network",
    "On-Demand", "Platform", "Quantum", "Real-Time", "Scalable",
    "Turnkey", "User-Centric", "Voice-Enabled", "Wireless", "Cross-Platform"
  ];

  const specialtySuffixes = [
    "Solutions", "Services", "Systems", "Tools", "Platforms",
    "Applications", "Frameworks", "Modules", "Interfaces", "Analytics",
    "Automation", "Management", "Integration", "Optimization", "Development",
    "Consulting", "Support", "Training", "Implementation", "Architecture",
    "Design", "Engineering", "Operations", "Strategy", "Innovation",
    "Research", "Testing", "Deployment", "Monitoring", "Security",
    "Compliance", "Governance", "Standards", "Best Practices", "Methodologies",
    "Processes", "Workflows", "Dashboards", "Reports", "Insights",
    "Metrics", "KPIs", "Benchmarks", "Audits", "Reviews",
    "Assessments", "Evaluations", "Certifications", "Accreditations", "Partnerships"
  ];

  const specialtyIcons = [
    "Box", "Layers", "Cog", "Wrench", "Puzzle",
    "Target", "Compass", "Map", "Flag", "Star"
  ];

  return Array.from({ length: 50 }, (_, index) => ({
    id: `${branchId}-specialty-${index + 1}`,
    name: `${specialtyPrefixes[index]} ${branchName} ${specialtySuffixes[index]}`,
    description: `Comprehensive ${specialtyPrefixes[index].toLowerCase()} ${specialtySuffixes[index].toLowerCase()} for the ${branchName.toLowerCase()} industry. Ready for integration with external tools and platforms.`,
    icon: specialtyIcons[index % specialtyIcons.length],
    branchId
  }));
};

// Get branch by ID
export const getBranchById = (id: string): Branch | undefined => {
  return branches.find(branch => branch.id === id);
};

// Get specialty by ID
export const getSpecialtyById = (branchId: string, specialtyId: string): Specialty | undefined => {
  const branch = getBranchById(branchId);
  if (!branch) return undefined;
  const specialties = generateSpecialties(branchId, branch.name);
  return specialties.find(specialty => specialty.id === specialtyId);
};
