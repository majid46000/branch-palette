import { Link } from "react-router-dom";
import { Branch } from "@/data/branches";
import { 
  Cpu, Heart, DollarSign, GraduationCap, Factory,
  ShoppingBag, Truck, Zap, Leaf, Building2,
  Film, Hotel, Scale, Megaphone, Home,
  Wifi, Plane, Car, Dna, Shield,
  BarChart3, ShoppingCart, Recycle, Shirt, Coffee,
  Gamepad2, Landmark, Users, Umbrella, Package,
  Tv, HandHeart, Pill, Briefcase, BookOpen,
  Microscope, Lock, Share2, Trophy, Sparkles,
  Folder, ArrowRight
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

interface BranchCardProps {
  branch: Branch;
  index: number;
}

const BranchCard = ({ branch, index }: BranchCardProps) => {
  const IconComponent = iconMap[branch.icon] || Folder;

  return (
    <Link
      to={`/branch/${branch.id}`}
      className="group block"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <article className="h-full rounded-xl border bg-card p-6 card-hover animate-fade-in">
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <IconComponent className="h-6 w-6" />
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            {branch.specialtyCount} specialties
          </span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {branch.name}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {branch.description}
        </p>
        
        <div className="mt-4 flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          <span>Explore</span>
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </article>
    </Link>
  );
};

export default BranchCard;
