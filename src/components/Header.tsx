import { Link } from "react-router-dom";
import { Layers } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 header-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <Layers className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Directory</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            All Branches
          </Link>
          <span className="text-sm text-muted-foreground">
            40 Branches • 2000+ Specialties
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
