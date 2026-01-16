import { useState } from "react";
import { Search } from "lucide-react";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import BranchCard from "@/components/BranchCard";
import { branches } from "@/data/directory";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Total counts: 40 branches × 5 categories × 10 sites = 2000 sites
  const totalCategories = 40 * 5;
  const totalSites = 40 * 5 * 10;

  // Reset title on homepage
  useEffect(() => {
    document.title = `ToolForge — ${branches.length} Hubs, ${totalSites}+ Free Tools`;
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="border-b bg-muted/30">
        <div className="container py-12 md:py-20">
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
              {branches.length} Tool Hubs — {totalSites}+ Free Tools
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              {totalCategories} categories • {totalSites} sites ready for integration
            </p>
            <p className="text-sm text-primary font-medium mb-8">
              Zero cost to you — 100% FREE forever
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search hubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
                aria-label="Search tool hubs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Branches Grid */}
      <section className="container py-10 md:py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold">All Hubs</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredBranches.length} of {branches.length} hubs
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredBranches.map((branch, index) => (
            <BranchCard 
              key={branch.id} 
              branch={branch} 
              index={index}
              layoutVariant={branch.layoutVariant}
              styleVariant={branch.styleVariant}
            />
          ))}
        </div>

        {filteredBranches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hubs found matching your search.</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Index;
