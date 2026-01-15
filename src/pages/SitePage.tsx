import { useParams, Navigate } from "react-router-dom";
import { 
  ExternalLink, Database, Rss, Globe, ArrowLeft, 
  Star, Clock, Tag, FileCode, Award, CheckCircle2,
  Briefcase, Zap, Users, Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import { getBranchById, getCategoryById, getSiteById, StyleVariant } from "@/data/directory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Skill level colors
const skillLevelColors = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
};

// Style variant classes for cards
const cardStyleClasses: Record<StyleVariant, string> = {
  default: "bg-card border",
  gradient: "bg-gradient-to-br from-accent/20 to-card border",
  outlined: "bg-transparent border-2",
  elevated: "bg-card border shadow-lg",
  minimal: "bg-muted/30 border-transparent"
};

const SitePage = () => {
  const { branchId, categoryId, siteId } = useParams<{ 
    branchId: string; 
    categoryId: string; 
    siteId: string;
  }>();
  
  const branch = branchId ? getBranchById(branchId) : undefined;
  const category = branchId && categoryId ? getCategoryById(branchId, categoryId) : undefined;
  const site = branchId && categoryId && siteId ? getSiteById(branchId, categoryId, siteId) : undefined;
  
  // Update document title for SEO
  useEffect(() => {
    if (site && branch && category) {
      document.title = `${site.name} | ${category.name} | ${branch.name}`;
    }
  }, [site, branch, category]);
  
  if (!branch || !category || !site) {
    return <Navigate to="/" replace />;
  }

  // Determine style variant based on site index
  const siteIndex = parseInt(siteId.split('-').pop() || '1') - 1;
  const styleVariants: StyleVariant[] = ['default', 'gradient', 'outlined', 'elevated', 'minimal'];
  const currentStyle = styleVariants[siteIndex % styleVariants.length];

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
          
          <div className="animate-fade-in">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shrink-0">
                <Globe className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {site.name}
                  </h1>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="font-semibold">{site.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground text-sm">({site.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-lg text-primary font-medium mb-2">{site.tagline}</p>
                <p className="text-muted-foreground mb-4">
                  Part of <Link to={`/branch/${branch.id}/category/${category.id}`} className="text-foreground hover:underline">{category.name}</Link>
                </p>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {site.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="capitalize">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Integration badges */}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Full Description */}
            <Card className={cn("card-hover", cardStyleClasses[currentStyle])}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Overview
                </CardTitle>
                <CardDescription>Detailed information about this tool</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  {site.fullDescription}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className={cn("card-hover", cardStyleClasses[styleVariants[(siteIndex + 1) % styleVariants.length]])}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Key Features
                </CardTitle>
                <CardDescription>What makes this tool stand out</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {site.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Skills & Tools Required */}
            <Card className={cn("card-hover", cardStyleClasses[styleVariants[(siteIndex + 2) % styleVariants.length]])}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-primary" />
                  Skills & Tools
                </CardTitle>
                <CardDescription>Required knowledge and proficiency levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {site.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{skill.name}</span>
                      <Badge className={cn("capitalize", skillLevelColors[skill.level])}>
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits & Perks */}
            <Card className={cn("card-hover", cardStyleClasses[styleVariants[(siteIndex + 3) % styleVariants.length]])}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Benefits & Perks
                </CardTitle>
                <CardDescription>What you get with this tool</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {site.benefits.map((benefit, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/50 border">
                      <h4 className="font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply / Visit CTA */}
            <Card className="card-hover border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <Button className="w-full mb-3" size="lg" disabled>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Site
                </Button>
                <Button variant="outline" className="w-full" size="lg" disabled>
                  Apply Now
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Links will be active after API integration
                </p>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{site.pricing}</p>
              </CardContent>
            </Card>

            {/* Metadata */}
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium">{site.metadata.lastUpdated}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Version</span>
                  <span className="font-medium">{site.metadata.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">License</span>
                  <span className="font-medium">{site.metadata.license}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform</span>
                  <span className="font-medium">{site.metadata.platform}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Languages</span>
                  <span className="font-medium">{site.metadata.language}</span>
                </div>
              </CardContent>
            </Card>

            {/* API Integration Notice */}
            <Card className="card-hover border-dashed">
              <CardContent className="pt-6 text-center">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
                <h4 className="font-semibold mb-1 text-sm">Ready for Integration</h4>
                <p className="text-xs text-muted-foreground">
                  This page accepts JSON, RSS, or API data via RovoDev
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t">
          <Button variant="outline" asChild>
            <Link to={`/branch/${branchId}/category/${categoryId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {category.name}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={`/branch/${branchId}`}>
              View All {branch.name} Categories
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SitePage;
