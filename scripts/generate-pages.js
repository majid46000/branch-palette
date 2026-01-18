import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import data from "../src/data/generated.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST = path.join(__dirname, "../dist");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function pageTemplate({ title, description, content, links }) {
  return `<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" />
<style>
body{font-family:system-ui;background:#0b0b0f;color:#eaeaf0;margin:0;padding:40px}
a{color:#7dd3fc;text-decoration:none}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
.card{background:#111827;padding:16px;border-radius:12px}
</style>
</head>
<body>
<h1>${title}</h1>
<p>${description}</p>
<div class="grid">
${content}
</div>
<hr/>
<div>
${links}
</div>
</body>
</html>`;
}

ensureDir(DIST);

/* الصفحة الرئيسية */
fs.writeFileSync(
  path.join(DIST, "index.html"),
  pageTemplate({
    title: "دليل المواقع الضخم",
    description: "أكبر دليل مواقع منظم، محتوى حقيقي وصفحات ثابتة.",
    content: data.branches.map(b => `<div class="card"><a href="./branch/${b.slug}/">${b.name}</a></div>`).join(""),
    links: ""
  })
);

/* صفحات الفروع */
for (const branch of data.branches) {
  const dir = path.join(DIST, "branch", branch.slug);
  ensureDir(dir);

  const cats = data.categories.filter(c => c.branchId === branch.id);

  fs.writeFileSync(
    path.join(dir, "index.html"),
    pageTemplate({
      title: branch.name,
      description: `محتوى كامل حول ${branch.name}`,
      content: cats.map(c => `<div class="card"><a href="../../category/${c.slug}/">${c.name}</a></div>`).join(""),
      links: `<a href="/">الرئيسية</a>`
    })
  );
}

/* صفحات التصنيفات */
for (const cat of data.categories) {
  const dir = path.join(DIST, "category", cat.slug);
  ensureDir(dir);

  const sites = data.sites.filter(s => s.categoryId === cat.id);

  fs.writeFileSync(
    path.join(dir, "index.html"),
    pageTemplate({
      title: cat.name,
      description: `أفضل المواقع في ${cat.name}`,
      content: sites.map(s => `<div class="card">${s.name}</div>`).join(""),
      links: `<a href="/">الرئيسية</a>`
    })
  );
}

console.log("✅ Static pages generated");
