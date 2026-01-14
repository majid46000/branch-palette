import { Link } from "react-router-dom";
import { Specialty } from "@/data/branches";
import { 
  Box, Layers, Cog, Wrench, Puzzle,
  Target, Compass, Map, Flag, Star,
  ExternalLink
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Box, Layers, Cog, Wrench, Puzzle,
  Target, Compass, Map, Flag, Star
};

interface SpecialtyCardProps {
  specialty: Specialty;
  index: number;
}

const SpecialtyCard = ({ specialty, index }: SpecialtyCardProps) => {
  const IconComponent = iconMap[specialty.icon] || Box;

  return (
    <Link
      to={`/branch/${specialty.branchId}/specialty/${specialty.id}`}
      className="group block"
      style={{ animationDelay: `${index * 20}ms` }}
    >
      <article className="h-full rounded-xl border bg-card p-5 card-hover animate-fade-in">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
            <IconComponent className="h-5 w-5" />
          </div>
          
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold mb-1 truncate group-hover:text-primary transition-colors">
              {specialty.name}
            </h3>
            
            <p className="text-xs text-muted-foreground line-clamp-2">
              {specialty.description}
            </p>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            50+ tools ready
          </span>
          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </article>
    </Link>
  );
};

export default SpecialtyCard;
