import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Search, Database, Rss, Globe } from "lucide-react";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import SiteCard from "@/components/SiteCard";
import { useDirectory } from "@/context/DirectoryContext";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import { Folder, Layers, Box, Grid3X3, LayoutGrid } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Folder, Layers, Box, Grid3X3, LayoutGrid
};

const CategoryPage = () => {
  const { branchId, categoryId } = useParams<{ branchId: string; categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const { getBranchById, getCategoryById, getSitesForCategory } = useDirectory();

  const branch = branchId ? getBranchById(branchId) : undefined;
  const category = branchId && categoryId ? getCategoryById(branchId, categoryId) : undefined;

  useEffect(() => {
    if (branch && category) {
      document.title = `${category.name} | ${branch.name} | ToolForge`;
    }
  }, [branch, category]);

  if (!branch || !category) {
    return <Navigate to="/" replace />;
  }

  const sites = getSitesForCategory(branchId!, categoryId!);
  const filteredSites = sites.filter((site: any) =>
    site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const IconComponent = iconMap[category.icon] || Folder;

  return (
    <Layout>
      <Helmet>
        <title>{category.name} — {branch.name}</title>
        <meta name="description" content={category.description} />
      </Helmet>

      <section className="border-b bg-muted/30">
        <div className="container py-10 md:py-14">
          <Breadcrumb items={[{ label: branch.name, to: `/branch/${branch.id}` }, { label: category.name }]} />

          <div className="flex flex-col md:flex-row md:items-center gap-6 animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <IconComponent className="h-8 w-8" />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold">{category.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{category.description}</p>

              <div className="mt-3 flex items-center gap-3">
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
        </div>
      </section>

      <section className="container py-10 md:py-12">
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
      </section>

      <section className="container py-10 md:py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Sites & Tools</h2>
            <p className="text-sm text-muted-foreground mt-1">Placeholder entries — integrate via RovoDev</p>
          </div>
          <span className="text-sm text-muted-foreground">{filteredSites.length} of {sites.length}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSites.map((site: any, index: number) => (
            <SiteCard 
              key={site.id} 
              site={site} 
              branchId={branchId} 
              categoryId={categoryId} 
              index={index} 
              // styleVariant prop optional; existing SiteCard will handle
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