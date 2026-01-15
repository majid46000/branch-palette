import { Link } from "react-router-dom";
import { Site, StyleVariant } from "@/data/directory";
import { Globe, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

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
        "rounded-lg p-4 card-hover animate-fade-in",
        styleVariantClasses[styleVariant]
      )}>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
            <Globe className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                {site.name}
              </h3>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 ml-2" />
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
              {site.description}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Placeholder</span>
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
