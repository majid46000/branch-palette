import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Search, Database, Rss, Globe } from "lucide-react";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import SiteCard from "@/components/SiteCard";
import { getBranchById, getCategoryById, getSitesForCategory, StyleVariant } from "@/data/directory";
import { Input } from "@/components/ui/input";
import { 
  Folder, Layers, Box, Grid3X3, LayoutGrid
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Folder, Layers, Box, Grid3X3, LayoutGrid
};

const CategoryPage = () => {
  const { branchId, categoryId } = useParams<{ branchId: string; categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  
  const branch = branchId ? getBranchById(branchId) : undefined;
  const category = branchId && categoryId ? getCategoryById(branchId, categoryId) : undefined;
  
  // Update document title
  useEffect(() => {
    if (branch && category) {
      document.title = `${category.name} | ${branch.name} | ToolForge`;
    }
  }, [branch, category]);
  
  if (!branch || !category) {
    return <Navigate to="/" replace />;
  }
  
  const sites = getSitesForCategory(branchId, categoryId);
  const filteredSites = sites.filter(site =>
    site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const IconComponent = iconMap[category.icon] || Folder;
  
  // Rotate style variants for sites based on category index
  const styleVariants: StyleVariant[] = ['default', 'gradient', 'outlined', 'elevated', 'minimal'];
  const categoryIndex = parseInt(categoryId.split('-').pop() || '1') - 1;

  return (
    <Layout>
      {/* Category Header */}
      <section className="border-b bg-muted/30">
        <div className="container py-10 md:py-14">
          <Breadcrumb 
            items={[
              { label: branch.name, href: `/branch/${branch.id}` },
              { label: category.name }
            ]} 
          />
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 animate-fade-in">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <IconComponent className="h-7 w-7" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                {category.name}
              </h1>
              <p className="text-muted-foreground">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 text-sm bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full">
                  <Database className="h-4 w-4" />
                  Ready for API
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full">
                  <Rss className="h-4 w-4" />
                  RSS Compatible
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full">
                  <Globe className="h-4 w-4" />
                  JSON Ready
                </span>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md mt-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search sites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
              aria-label="Search sites"
            />
          </div>
        </div>
      </section>

      {/* Sites Grid */}
      <section className="container py-10 md:py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Sites & Tools</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Placeholder entries — integrate via RovoDev
            </p>
          </div>
          <span className="text-sm text-muted-foreground">
            {filteredSites.length} of {sites.length}
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSites.map((site, index) => (
            <SiteCard 
              key={site.id} 
              site={site} 
              branchId={branchId}
              categoryId={categoryId}
              index={index}
              styleVariant={styleVariants[(categoryIndex + index) % styleVariants.length]}
            />
          ))}
        </div>

        {filteredSites.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No sites found matching your search.</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default CategoryPage;
