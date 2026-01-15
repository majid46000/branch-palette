import { useParams, Navigate, Link } from "react-router-dom";
import {
  ExternalLink, Database, Rss, Globe, ArrowLeft,
  Star, Clock, Tag, FileCode, Award, CheckCircle2,
  Briefcase, Zap, Users, Calendar
} from "lucide-react";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import { useDirectory } from "@/context/DirectoryContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";

const skillLevelColors = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const SitePage = () => {
  const { branchId, categoryId, siteId } = useParams<{ branchId: string; categoryId: string; siteId: string }>();
  const { getBranchById, getCategoryById, getSiteById } = useDirectory();

  const branch = branchId ? getBranchById(branchId) : undefined;
  const category = branchId && categoryId ? getCategoryById(branchId, categoryId) : undefined;
  const site = branchId && categoryId && siteId ? getSiteById(branchId, categoryId, siteId) : undefined;

  useEffect(() => {
    if (site && branch) {
      document.title = `${site.name} — ${branch.name} | ToolForge`;
    }
  }, [site, branch]);

  if (!branch || !category || !site) {
    return <Navigate to="/" replace />;
  }

  const currentStyle = "default";
  const cardStyleClasses: Record<string, string> = {
    default: "",
    gradient: "",
    outlined: "border",
    elevated: "shadow-lg",
    minimal: "bg-transparent",
  };

  return (
    <Layout>
      <Helmet>
        <title>{site.name} — {branch.name}</title>
        <meta name="description" content={site.description} />
        <meta property="og:title" content={`${site.name} — ${branch.name}`} />
        <meta property="og:description" content={site.description} />
        <meta property="og:url" content={site.url} />
      </Helmet>

      <section className="border-b bg-muted/30">
        <div className="container py-10 md:py-14">
          <Breadcrumb items={[{ label: branch.name, to: `/branch/${branch.id}` }, { label: category.name, to: `/branch/${branch.id}/category/${category.id}` }, { label: site.name }]} />

          <div className="flex flex-col md:flex-row md:items-center gap-6 animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <FileCode className="h-8 w-8" />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold">{site.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{site.tagline || site.description}</p>

              <div className="mt-3 flex items-center gap-3">
                <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">Visit website</a>
                <a href={site.url + "/rss"} target="_blank" rel="noopener noreferrer" className="text-muted-foreground underline">RSS</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className={cn("card-hover", cardStyleClasses[currentStyle])}>
              <CardHeader>
                <CardTitle>{site.name}</CardTitle>
                <CardDescription>{site.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{site.fullDescription}</p>
                <div className="mt-4">
                  <strong>Tags:</strong> {site.tags?.join(", ")}
                </div>
                <div className="mt-6">
                  <a href={site.url} target="_blank" rel="noopener noreferrer">
                    <Button>Visit site</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside>
            <div className="space-y-4">
              <div className="p-4 border rounded">
                <p className="text-sm text-muted-foreground">Author: {site.metadata?.author || "—"}</p>
                <p className="text-sm text-muted-foreground">License: {site.metadata?.license || "—"}</p>
                <p className="text-sm text-muted-foreground">Last updated: {site.metadata?.lastUpdated || "—"}</p>
              </div>

              <div className="p-4 border rounded">
                <a className="text-primary underline" href={site.url} target="_blank" rel="noreferrer">Official site</a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default SitePage;