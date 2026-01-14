import { useParams, Navigate } from "react-router-dom";
import { ExternalLink, Plus, Database, Globe, Rss } from "lucide-react";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import { getBranchById, getSpecialtyById } from "@/data/branches";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SpecialtyPage = () => {
  const { branchId, specialtyId } = useParams<{ branchId: string; specialtyId: string }>();
  
  const branch = branchId ? getBranchById(branchId) : undefined;
  const specialty = branchId && specialtyId ? getSpecialtyById(branchId, specialtyId) : undefined;
  
  if (!branch || !specialty) {
    return <Navigate to="/" replace />;
  }

  // Placeholder tools/sites data structure - ready for API integration
  const placeholderTools = Array.from({ length: 12 }, (_, i) => ({
    id: `tool-${i + 1}`,
    name: `Tool ${i + 1}`,
    description: "Ready for integration via JSON/RSS/API",
    url: "#",
    category: i % 3 === 0 ? "Premium" : i % 3 === 1 ? "Free" : "Freemium"
  }));

  return (
    <Layout>
      {/* Specialty Header */}
      <section className="border-b bg-muted/30">
        <div className="container py-10 md:py-14">
          <Breadcrumb 
            items={[
              { label: branch.name, href: `/branch/${branch.id}` },
              { label: specialty.name }
            ]} 
          />
          
          <div className="animate-fade-in max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              {specialty.name}
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              {specialty.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
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
      </section>

      {/* Tools/Sites Grid */}
      <section className="container py-10 md:py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Tools & Sites</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Placeholder entries — integrate via RovoDev
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {placeholderTools.map((tool, index) => (
            <Card 
              key={tool.id} 
              className="card-hover animate-fade-in cursor-pointer group"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                    <Globe className="h-5 w-5" />
                  </div>
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded">
                    {tool.category}
                  </span>
                </div>
                <CardTitle className="text-base mt-3 group-hover:text-primary transition-colors">
                  {tool.name}
                </CardTitle>
                <CardDescription className="text-xs">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Placeholder</span>
                  <ExternalLink className="h-3.5 w-3.5 group-hover:text-foreground transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State for More Tools */}
        <div className="mt-8 border-2 border-dashed rounded-xl p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Ready for 50+ More Entries</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This page is structured to accept JSON, RSS, or API data via RovoDev integration.
            </p>
            <Button variant="outline" size="sm">
              Configure Integration
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SpecialtyPage;
