import { useParams, Navigate } from "react-router-dom";
import { ExternalLink, Database, Rss, Globe, Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import { getBranchById, getCategoryById, getSiteById } from "@/data/directory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SitePage = () => {
  const { branchId, categoryId, siteId } = useParams<{ 
    branchId: string; 
    categoryId: string; 
    siteId: string;
  }>();
  
  const branch = branchId ? getBranchById(branchId) : undefined;
  const category = branchId && categoryId ? getCategoryById(branchId, categoryId) : undefined;
  const site = branchId && categoryId && siteId ? getSiteById(branchId, categoryId, siteId) : undefined;
  
  if (!branch || !category || !site) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      {/* Site Header */}
      <section className="border-b bg-muted/30">
        <div className="container py-10 md:py-14">
          <Breadcrumb 
            items={[
              { label: branch.name, href: `/branch/${branch.id}` },
              { label: category.name, href: `/branch/${branch.id}/category/${category.id}` },
              { label: site.name }
            ]} 
          />
          
          <div className="animate-fade-in max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Globe className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {site.name}
                </h1>
                <p className="text-muted-foreground text-sm">
                  Part of {category.name}
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground text-lg mb-6">
              {site.description}
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

      {/* Site Content */}
      <section className="container py-10 md:py-12">
        <div className="max-w-4xl">
          {/* Placeholder Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-lg">Overview</CardTitle>
                <CardDescription>Site details placeholder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This section will display detailed information about the site including features, pricing, and integrations. Ready for API data.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-lg">Features</CardTitle>
                <CardDescription>Key capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Feature placeholder 1</li>
                  <li>• Feature placeholder 2</li>
                  <li>• Feature placeholder 3</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-lg">Pricing</CardTitle>
                <CardDescription>Cost information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pricing information will be populated via RovoDev integration. Free tier available.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-lg">Integrations</CardTitle>
                <CardDescription>Connected services</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Integration details and API connections ready for configuration.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Empty State for More Content */}
          <div className="border-2 border-dashed rounded-xl p-8 text-center mb-8">
            <div className="max-w-md mx-auto">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Ready for Content</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This page is structured to accept JSON, RSS, or API data via RovoDev integration.
              </p>
              <Button variant="outline" size="sm">
                Configure Integration
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link to={`/branch/${branchId}/category/${categoryId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {category.name}
              </Link>
            </Button>
            <Button variant="outline" disabled>
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Site (Placeholder)
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SitePage;
