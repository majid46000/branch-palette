import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "../src/data/generated.json");
const OUTPUT_FILE = path.join(__dirname, "../public/sitemap.xml");

if (!fs.existsSync(DATA_FILE)) {
  console.error("❌ generated.json not found");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

const BASE_URL = "https://example.com";

const urls = [];

data.branches.forEach((b) => {
  urls.push(`${BASE_URL}/${b.slug}`);
});

data.categories.forEach((c) => {
  urls.push(`${BASE_URL}/${c.branchId}/${c.slug}`);
});

data.sites.forEach((s) => {
  urls.push(`${BASE_URL}/${s.categoryId}/${s.slug}`);
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `
  <url>
    <loc>${u}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("")}
</urlset>`;

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, xml.trim(), "utf-8");

console.log("✅ generate-sitemap.js completed successfully");
