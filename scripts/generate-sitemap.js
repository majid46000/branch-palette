#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { GENERATED_DIRECTORY } from "../src/data/generated.js";

const outDir = path.join(process.cwd(), "public");
fs.mkdirSync(outDir, { recursive: true });

const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
const sitemapFooter = "</urlset>";

let urls = [`<url><loc>https://your-domain.com/</loc></url>`];

GENERATED_DIRECTORY.branches.forEach(branch => {
  const branchUrl = `https://your-domain.com/${branch.id}`;
  urls.push(`<url><loc>${branchUrl}</loc></url>`);
  const categories = GENERATED_DIRECTORY.categories.filter(c => c.branchId === branch.id);
  categories.forEach(cat => {
    const catUrl = `${branchUrl}/${cat.id}`;
    urls.push(`<url><loc>${catUrl}</loc></url>`);
    const sites = GENERATED_DIRECTORY.sites.filter(s => s.branchId === branch.id && s.categoryId === cat.id);
    sites.forEach(site => urls.push(`<url><loc>${site.url}</loc></url>`));
  });
});

fs.writeFileSync(path.join(outDir, "sitemap.xml"), `${sitemapHeader}\n${urls.join("\n")}\n${sitemapFooter}`);
fs.writeFileSync(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: https://your-domain.com/sitemap.xml`);

console.log("✅ Sitemap and robots.txt generated.");
