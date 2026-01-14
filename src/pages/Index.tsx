import { useState } from "react";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import BranchCard from "@/components/BranchCard";
import { branches } from "@/data/branches";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="border-b bg-muted/30">
        <div className="container py-12 md:py-20">
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
              Explore the Complete Directory
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              40 branches • 2000+ specialties • All in one place
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search branches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Branches Grid */}
      <section className="container py-10 md:py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold">All Branches</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredBranches.length} of {branches.length} branches
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredBranches.map((branch, index) => (
            <BranchCard key={branch.id} branch={branch} index={index} />
          ))}
        </div>

        {filteredBranches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No branches found matching your search.</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Index;
