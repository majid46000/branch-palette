import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryCard from "@/components/CategoryCard";
import { useDirectory } from "@/context/DirectoryContext";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import { Folder, Brain, Code, Smartphone, Cloud, Shield } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Folder, Brain, Code, Smartphone, Cloud, Shield
};

const BranchPage = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const { getBranchById, getCategoriesForBranch } = useDirectory();

  const branch = branchId ? getBranchById(branchId) : undefined;

  useEffect(() => {
    if (branch) document.title = `${branch.name} | ToolForge`;
  }, [branch]);

  if (!branch) return <Navigate to="/" replace />;

  const categories = getCategoriesForBranch(branch.id);
  const filteredCategories = categories.filter((category: any) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const IconComponent = iconMap[branch.icon] || Folder;
  const totalSites = categories.reduce((sum: number, cat: any) => sum + (cat.siteCount || (cat.sites?.length || 0)), 0);

  return (
    <Layout>
      <Helmet>
        <title>{branch.name}</title>
        <meta name="description" content={branch.description} />
      </Helmet>

      <section className="border-b bg-muted/30">
        <div className="container py-10 md:py-14">
          <Breadcrumb items={[{ label: branch.name }]} />

          <div className="flex flex-col md:flex-row md:items-center gap-6 animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <IconComponent className="h-8 w-8" />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold">{branch.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{branch.description}</p>
              <div className="mt-2 text-sm text-muted-foreground">{categories.length} categories — {totalSites} sites</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10 md:py-12">
        <div className="relative max-w-md mt-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
            aria-label="Search categories"
          />
        </div>
      </section>

      <section className="container py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category: any, index: number) => (
            <CategoryCard key={category.id} category={category} branchId={branch.id} index={index} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default BranchPage;