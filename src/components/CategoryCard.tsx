import { Link } from "react-router-dom";
import { Category, LayoutVariant, StyleVariant } from "@/data/directory";
import { 
  Folder, Layers, Box, Grid3X3, LayoutGrid, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Folder, Layers, Box, Grid3X3, LayoutGrid
};

// Style variant classes
const styleVariantClasses: Record<StyleVariant, string> = {
  default: "bg-card border",
  gradient: "bg-gradient-to-br from-accent/30 to-secondary border",
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

interface CategoryCardProps {
  category: Category;
  branchId: string;
  index: number;
  layoutVariant?: LayoutVariant;
  styleVariant?: StyleVariant;
}

const CategoryCard = ({ category, branchId, index, layoutVariant, styleVariant }: CategoryCardProps) => {
  const IconComponent = iconMap[category.icon] || Folder;
  const style = styleVariant || category.styleVariant;
  const layout = layoutVariant || category.layoutVariant;

  // Compact layout
  if (layout === 'compact') {
    return (
      <Link
        to={`/branch/${branchId}/category/${category.id}`}
        className="group block"
        style={{ animationDelay: `${index * 30}ms` }}
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
              {category.name}
            </h3>
            <p className="text-xs text-muted-foreground">{category.siteCount} sites</p>
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
        to={`/branch/${branchId}/category/${category.id}`}
        className="group block"
        style={{ animationDelay: `${index * 30}ms` }}
      >
        <article className={cn(
          "rounded-xl p-5 card-hover animate-fade-in flex items-start gap-5",
          styleVariantClasses[style]
        )}>
          <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl transition-colors shrink-0", iconBgClasses[style])}>
            <IconComponent className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {category.siteCount} sites
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">{category.description}</p>
          </div>
        </article>
      </Link>
    );
  }

  // Featured layout
  if (layout === 'featured') {
    return (
      <Link
        to={`/branch/${branchId}/category/${category.id}`}
        className="group block"
        style={{ animationDelay: `${index * 30}ms` }}
      >
        <article className={cn(
          "rounded-xl p-6 card-hover animate-fade-in relative overflow-hidden",
          styleVariantClasses[style]
        )}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl transition-colors mb-4", iconBgClasses[style])}>
            <IconComponent className="h-6 w-6" />
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full mb-3 inline-block">
            {category.siteCount} sites
          </span>
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{category.description}</p>
          <div className="flex items-center text-sm font-medium text-primary">
            <span>View Sites</span>
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </article>
      </Link>
    );
  }

  // Default grid layout
  return (
    <Link
      to={`/branch/${branchId}/category/${category.id}`}
      className="group block"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <article className={cn(
        "h-full rounded-xl p-5 card-hover animate-fade-in",
        styleVariantClasses[style]
      )}>
        <div className="flex items-start justify-between mb-3">
          <div className={cn("flex h-11 w-11 items-center justify-center rounded-lg transition-colors", iconBgClasses[style])}>
            <IconComponent className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {category.siteCount} sites
          </span>
        </div>
        
        <h3 className="font-semibold mb-1.5 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {category.description}
        </p>
        
        <div className="mt-3 flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          <span>View Sites</span>
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </article>
    </Link>
  );
};

export default CategoryCard;
