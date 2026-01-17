import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "../src/data/generated.json");
const PUBLIC_DIR = path.join(__dirname, "../public");

if (!fs.existsSync(DATA_FILE)) {
  console.error("❌ generated.json not found");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const writeFile = (filePath, content) => {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
};

const baseHTML = ({ title, description, body, url }) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="viewport" content="width=device-width, initial-scale=1" />

<link rel="canonical" content="${url}" />

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "${title}",
  "description": "${description}",
  "url": "${url}"
}
</script>

<style>
body { font-family: Arial, sans-serif; line-height: 1.7; padding: 40px; max-width: 1100px; margin: auto; }
h1, h2, h3 { color: #111; }
p { color: #333; }
</style>
</head>
<body>
${body}
</body>
</html>
`;

const siteUrl = "https://majid46000.github.io/branch-palette";

/* =======================
   BRANCH PAGES
======================= */
data.branches.forEach((branch) => {
  const html = baseHTML({
    title: `${branch.name} Directory`,
    description: `Complete directory and resources for ${branch.name}.`,
    url: `${siteUrl}/branches/${branch.slug}/`,
    body: `
<h1>${branch.name}</h1>
<p>${branch.name} is a comprehensive directory containing multiple categories and resources designed for large-scale discovery and indexing.</p>
<h2>About ${branch.name}</h2>
<p>This branch provides structured content optimized for search engines with high semantic relevance.</p>
`
  });

  writeFile(
    path.join(PUBLIC_DIR, "branches", branch.slug, "index.html"),
    html
  );
});

/* =======================
   CATEGORY PAGES
======================= */
data.categories.forEach((cat) => {
  const branch = data.branches.find(b => b.id === cat.branchId);

  const html = baseHTML({
    title: `${cat.name} in ${branch.name}`,
    description: `Explore ${cat.name} under ${branch.name} with detailed structured content.`,
    url: `${siteUrl}/categories/${branch.slug}/${cat.slug}/`,
    body: `
<h1>${cat.name}</h1>
<h2>Branch: ${branch.name}</h2>
<p>${cat.name} is a specialized category offering structured and scalable information optimized for indexing.</p>
`
  });

  writeFile(
    path.join(PUBLIC_DIR, "categories", branch.slug, cat.slug, "index.html"),
    html
  );
});

/* =======================
   SITE PAGES
======================= */
data.sites.forEach((site) => {
  const category = data.categories.find(c => c.id === site.categoryId);
  const branch = data.branches.find(b => b.id === category.branchId);

  const html = baseHTML({
    title: `${site.name} – ${category.name}`,
    description: `${site.name} is listed under ${category.name} in ${branch.name}.`,
    url: `${siteUrl}/sites/${branch.slug}/${category.slug}/${site.slug}/`,
    body: `
<h1>${site.name}</h1>
<h2>${category.name} / ${branch.name}</h2>
<p>This page represents a standalone indexed entity designed for maximum SEO exposure.</p>
<p>Each page is generated as static HTML to ensure optimal crawlability and performance.</p>
`
  });

  writeFile(
    path.join(
      PUBLIC_DIR,
      "sites",
      branch.slug,
      category.slug,
      site.slug,
      "index.html"
    ),
    html
  );
});

console.log("✅ Static HTML pages generated successfully");
