import { Link } from "react-router-dom";
import { Branch, LayoutVariant, StyleVariant } from "@/data/directory";
import { 
  Brain, Code, Smartphone, Cloud, Shield,
  BarChart3, GitBranch, Blocks, Cpu, Gamepad2,
  ShoppingCart, Megaphone, Palette, Zap, MessageCircle,
  DollarSign, Heart, GraduationCap, Users, Scale,
  Building2, Plane, UtensilsCrossed, Share2, Film,
  Music, Video, Camera, PenTool, Search,
  Kanban, UserCheck, Headphones, Bot, Wand2,
  Plug, TestTube, FileText, GitFork, Server,
  Folder, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain, Code, Smartphone, Cloud, Shield,
  BarChart3, GitBranch, Blocks, Cpu, Gamepad2,
  ShoppingCart, Megaphone, Palette, Zap, MessageCircle,
  DollarSign, Heart, GraduationCap, Users, Scale,
  Building2, Plane, UtensilsCrossed, Share2, Film,
  Music, Video, Camera, PenTool, Search,
  Kanban, UserCheck, Headphones, Bot, Wand2,
  Plug, TestTube, FileText, GitFork, Server,
  Folder
};

// Style variant classes
const styleVariantClasses: Record<StyleVariant, string> = {
  default: "bg-card border",
  gradient: "bg-gradient-to-br from-primary/5 to-secondary border",
  outlined: "bg-transparent border-2",
  elevated: "bg-card border shadow-lg",
  minimal: "bg-muted/50 border-transparent"
};

// Icon background colors by style
const iconBgClasses: Record<StyleVariant, string> = {
  default: "bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground",
  gradient: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
  outlined: "bg-primary text-primary-foreground",
  elevated: "bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground",
  minimal: "bg-background text-foreground group-hover:bg-primary group-hover:text-primary-foreground"
};

interface BranchCardProps {
  branch: Branch;
  index: number;
  layoutVariant?: LayoutVariant;
  styleVariant?: StyleVariant;
}

const BranchCard = ({ branch, index, layoutVariant, styleVariant }: BranchCardProps) => {
  const IconComponent = iconMap[branch.icon] || Folder;
  const style = styleVariant || branch.styleVariant;
  const layout = layoutVariant || branch.layoutVariant;

  // Compact layout
  if (layout === 'compact') {
    return (
      <Link
        to={`/branch/${branch.id}`}
        className="group block"
        style={{ animationDelay: `${index * 20}ms` }}
      >
        <article className={cn(
          "rounded-lg p-4 card-hover animate-fade-in flex items-center gap-4",
          styleVariantClasses[style]
        )}>
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg transition-colors", iconBgClasses[style])}>
            <IconComponent className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
              {branch.name}
            </h3>
            <p className="text-xs text-muted-foreground">{branch.categoryCount} categories</p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-all group-hover:translate-x-1" />
        </article>
      </Link>
    );
  }

  // List layout
  if (layout === 'list') {
    return (
      <Link
        to={`/branch/${branch.id}`}
        className="group block"
        style={{ animationDelay: `${index * 20}ms` }}
      >
        <article className={cn(
          "rounded-xl p-5 card-hover animate-fade-in flex items-start gap-5",
          styleVariantClasses[style]
        )}>
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl transition-colors shrink-0", iconBgClasses[style])}>
            <IconComponent className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {branch.name}
              </h3>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                {branch.categoryCount} categories
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{branch.description}</p>
          </div>
        </article>
      </Link>
    );
  }

  // Featured layout
  if (layout === 'featured') {
    return (
      <Link
        to={`/branch/${branch.id}`}
        className="group block"
        style={{ animationDelay: `${index * 20}ms` }}
      >
        <article className={cn(
          "rounded-2xl p-8 card-hover animate-fade-in relative overflow-hidden",
          styleVariantClasses[style]
        )}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl transition-colors mb-5", iconBgClasses[style])}>
            <IconComponent className="h-7 w-7" />
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full mb-4 inline-block">
            {branch.categoryCount} categories • 50 sites
          </span>
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
            {branch.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{branch.description}</p>
          <div className="flex items-center text-sm font-medium text-primary">
            <span>Explore Hub</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </article>
      </Link>
    );
  }

  // Default grid layout
  return (
    <Link
      to={`/branch/${branch.id}`}
      className="group block"
      style={{ animationDelay: `${index * 20}ms` }}
    >
      <article className={cn(
        "h-full rounded-xl p-6 card-hover animate-fade-in",
        styleVariantClasses[style]
      )}>
        <div className="flex items-start justify-between mb-4">
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg transition-colors", iconBgClasses[style])}>
            <IconComponent className="h-6 w-6" />
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            {branch.categoryCount} categories
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
