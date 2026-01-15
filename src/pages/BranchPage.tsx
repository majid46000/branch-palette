import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryCard from "@/components/CategoryCard";
import { getBranchById, getCategoriesForBranch } from "@/data/directory";
import { Input } from "@/components/ui/input";
import { 
  Brain, Code, Smartphone, Cloud, Shield,
  BarChart3, GitBranch, Blocks, Cpu, Gamepad2,
  ShoppingCart, Megaphone, Palette, Zap, MessageCircle,
  DollarSign, Heart, GraduationCap, Users, Scale,
  Building2, Plane, UtensilsCrossed, Share2, Film,
  Music, Video, Camera, PenTool, Search as SearchIcon,
  Kanban, UserCheck, Headphones, Bot, Wand2,
  Plug, TestTube, FileText, GitFork, Server,
  Folder
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain, Code, Smartphone, Cloud, Shield,
  BarChart3, GitBranch, Blocks, Cpu, Gamepad2,
  ShoppingCart, Megaphone, Palette, Zap, MessageCircle,
  DollarSign, Heart, GraduationCap, Users, Scale,
  Building2, Plane, UtensilsCrossed, Share2, Film,
  Music, Video, Camera, PenTool, Search: SearchIcon,
  Kanban, UserCheck, Headphones, Bot, Wand2,
  Plug, TestTube, FileText, GitFork, Server,
  Folder
};

const BranchPage = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  
  const branch = branchId ? getBranchById(branchId) : undefined;
  
  if (!branch) {
    return <Navigate to="/" replace />;
  }
  
  const categories = getCategoriesForBranch(branch.id);
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const IconComponent = iconMap[branch.icon] || Folder;
  const totalSites = categories.reduce((sum, cat) => sum + cat.siteCount, 0);

  return (
    <Layout>
      {/* Branch Header */}
      <section className="border-b bg-muted/30">
        <div className="container py-10 md:py-14">
          <Breadcrumb items={[{ label: branch.name }]} />
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <IconComponent className="h-8 w-8" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                {branch.name}
              </h1>
              <p className="text-muted-foreground">
                {branch.description}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {categories.length} categories • {totalSites} sites
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md mt-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container py-10 md:py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Categories</h2>
          <span className="text-sm text-muted-foreground">
            {filteredCategories.length} of {categories.length}
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCategories.map((category, index) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              branchId={branch.id}
              index={index}
              layoutVariant={category.layoutVariant}
              styleVariant={category.styleVariant}
            />
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No categories found matching your search.</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default BranchPage;
