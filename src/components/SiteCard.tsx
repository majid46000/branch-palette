import { Link } from "react-router-dom";
import { Site, StyleVariant } from "@/data/directory";
import { Globe, ArrowRight, ExternalLink, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Style variant classes
const styleVariantClasses: Record<StyleVariant, string> = {
  default: "bg-card border",
  gradient: "bg-gradient-to-br from-muted to-card border",
  outlined: "bg-transparent border-2",
  elevated: "bg-card border shadow-md",
  minimal: "bg-muted/30 border-transparent"
};

interface SiteCardProps {
  site: Site;
  branchId: string;
  categoryId: string;
  index: number;
  styleVariant?: StyleVariant;
}

const SiteCard = ({ site, branchId, categoryId, index, styleVariant = 'default' }: SiteCardProps) => {
  return (
    <Link
      to={`/branch/${branchId}/category/${categoryId}/site/${site.id}`}
      className="group block"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <article className={cn(
        "rounded-lg p-4 card-hover animate-fade-in h-full",
        styleVariantClasses[styleVariant]
      )}>
        <div className="flex items-start gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
            <Globe className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                {site.name}
              </h3>
              <div className="flex items-center gap-0.5 text-yellow-500 shrink-0">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-xs font-medium">{site.rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-xs text-primary font-medium truncate">{site.tagline}</p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {site.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {site.tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs capitalize px-1.5 py-0">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{site.metadata.platform}</span>
          <span className="flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View Details
            <ArrowRight className="ml-1 h-3 w-3" />
          </span>
        </div>
      </article>
    </Link>
  );
};

export default SiteCard;
