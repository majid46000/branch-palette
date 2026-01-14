import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import SpecialtyCard from "@/components/SpecialtyCard";
import { getBranchById, generateSpecialties } from "@/data/branches";
import { Input } from "@/components/ui/input";
import { 
  Cpu, Heart, DollarSign, GraduationCap, Factory,
  ShoppingBag, Truck, Zap, Leaf, Building2,
  Film, Hotel, Scale, Megaphone, Home,
  Wifi, Plane, Car, Dna, Shield,
  BarChart3, ShoppingCart, Recycle, Shirt, Coffee,
  Gamepad2, Landmark, Users, Umbrella, Package,
  Tv, HandHeart, Pill, Briefcase, BookOpen,
  Microscope, Lock, Share2, Trophy, Sparkles,
  Folder
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu, Heart, DollarSign, GraduationCap, Factory,
  ShoppingBag, Truck, Zap, Leaf, Building2,
  Film, Hotel, Scale, Megaphone, Home,
  Wifi, Plane, Car, Dna, Shield,
  BarChart3, ShoppingCart, Recycle, Shirt, Coffee,
  Gamepad2, Landmark, Users, Umbrella, Package,
  Tv, HandHeart, Pill, Briefcase, BookOpen,
  Microscope, Lock, Share2, Trophy, Sparkles,
  Folder
};

const BranchPage = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  
  const branch = branchId ? getBranchById(branchId) : undefined;
  
  if (!branch) {
    return <Navigate to="/" replace />;
  }
  
  const specialties = generateSpecialties(branch.id, branch.name);
  const filteredSpecialties = specialties.filter(specialty =>
    specialty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    specialty.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const IconComponent = iconMap[branch.icon] || Folder;

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
                {specialties.length} specialties available
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md mt-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section className="container py-10 md:py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Specialties</h2>
          <span className="text-sm text-muted-foreground">
            {filteredSpecialties.length} of {specialties.length}
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSpecialties.map((specialty, index) => (
            <SpecialtyCard key={specialty.id} specialty={specialty} index={index} />
          ))}
        </div>

        {filteredSpecialties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No specialties found matching your search.</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default BranchPage;
