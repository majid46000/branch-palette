import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import data from "../src/data/generated.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// نولّد الموقع هنا (داخل المستودع)
const SITE_DIR = path.join(__dirname, "../site");

// تنظيف وإعادة إنشاء
fs.rmSync(SITE_DIR, { recursive: true, force: true });
fs.mkdirSync(SITE_DIR, { recursive: true });

const writePage = (filePath, html) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html, "utf-8");
};

const layout = ({ title, description, content }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>${title}</title>
<meta name="description" content="${description}"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<link rel="canonical" href="https://example.com/"/>
<style>
body{font-family:Arial,Helvetica,sans-serif;max-width:1100px;margin:40px auto;padding:0 20px;line-height:1.6}
a{color:#2563eb;text-decoration:none}
a:hover{text-decoration:underline}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}
.card{border:1px solid #e5e7eb;border-radius:12px;padding:16px}
h1,h2,h3{line-height:1.2}
</style>
</head>
<body>
${content}
</body>
</html>`;

// الصفحة الرئيسية
writePage(
  path.join(SITE_DIR, "index.html"),
  layout({
    title: "Global Directory – Massive High Authority Index",
    description:
      "A massive static directory with thousands of categorized sites. SEO optimized, fast, crawlable.",
    content: `
<h1>Global Directory</h1>
<p>Browse high-quality categorized resources across multiple branches.</p>
<div class="grid">
${data.branches
  .map(
    (b) => `
  <div class="card">
    <h2><a href="/branches/${b.slug}/index.html">${b.name}</a></h2>
    <p>Explore categories inside ${b.name}</p>
  </div>`
  )
  .join("")}
</div>
`,
  })
);

// صفحات الفروع
for (const branch of data.branches) {
  const branchCategories = data.categories.filter(
    (c) => c.branchId === branch.id
  );

  writePage(
    path.join(SITE_DIR, "branches", branch.slug, "index.html"),
    layout({
      title: `${branch.name} – Categories`,
      description: `All categories under ${branch.name}.`,
      content: `
<h1>${branch.name}</h1>
<div class="grid">
${branchCategories
  .map(
    (c) => `
  <div class="card">
    <h3><a href="/categories/${c.slug}/index.html">${c.name}</a></h3>
  </div>`
  )
  .join("")}
</div>
<a href="/">← Back to home</a>
`,
    })
  );
}

// صفحات التصنيفات
for (const category of data.categories) {
  const categorySites = data.sites.filter(
    (s) => s.categoryId === category.id
  );

  writePage(
    path.join(SITE_DIR, "categories", category.slug, "index.html"),
    layout({
      title: `${category.name} – Websites`,
      description: `List of curated websites under ${category.name}.`,
      content: `
<h1>${category.name}</h1>
<div class="grid">
${categorySites
  .map(
    (s) => `
  <div class="card">
    <h3><a href="/sites/${s.slug}.html">${s.name}</a></h3>
    <p>High-quality resource listed in this directory.</p>
  </div>`
  )
  .join("")}
</div>
<a href="/">← Back to home</a>
`,
    })
  );
}

// صفحات المواقع (SEO ذهب)
for (const site of data.sites) {
  writePage(
    path.join(SITE_DIR, "sites", `${site.slug}.html`),
    layout({
      title: `${site.name} – Detailed Overview`,
      description: `In-depth overview and classification of ${site.name}.`,
      content: `
<h1>${site.name}</h1>
<p>
${site.name} is a curated resource listed in our global directory.
This page provides contextual information, classification, and relevance.
</p>

<p>
Being indexed in a static directory ensures fast loading, high crawlability,
and strong SEO signals.
</p>

<a href="/">← Back to home</a>
`,
    })
  );
}

console.log("✅ Static pages generated into /site");
