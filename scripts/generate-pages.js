import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import data from "../src/data/generated.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE = "/branch-palette";
const DIST = path.join(__dirname, "../dist");

const ensureDir = (p) => {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
};

const pageTemplate = ({ title, description, content, links }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: system-ui; background:#0b0b0f; color:#eaeaf0; padding:40px; }
    a { color:#7dd3fc; text-decoration:none }
    h1 { font-size:2.2rem }
    p { line-height:1.7; max-width:900px }
    ul { margin-top:30px }
    li { margin:8px 0 }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <p>${content}</p>
  <ul>
    ${links.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join("")}
  </ul>
</body>
</html>
`;

ensureDir(DIST);

/* الصفحة الرئيسية */
fs.writeFileSync(
  path.join(DIST, "index.html"),
  pageTemplate({
    title: "Branch Palette – Large Knowledge Directory",
    description: "A massive static directory with real content and internal structure.",
    content:
      "Branch Palette is a large-scale static knowledge structure built with real HTML pages. Each branch contains categories and each category contains multiple content-rich pages designed for search engines.",
    links: data.branches.map(b => ({
      href: `${BASE}/${b.slug}/`,
      label: b.name
    }))
  })
);

/* الفروع */
for (const branch of data.branches) {
  const branchDir = path.join(DIST, branch.slug);
  ensureDir(branchDir);

  fs.writeFileSync(
    path.join(branchDir, "index.html"),
    pageTemplate({
      title: branch.name,
      description: `Explore categories under ${branch.name}`,
      content:
        `${branch.name} contains multiple structured categories. Each category includes detailed pages with real descriptive content designed for discovery and indexing.`,
      links: data.categories
        .filter(c => c.branchId === branch.id)
        .map(c => ({
          href: `${BASE}/${branch.slug}/${c.slug}/`,
          label: c.name
        }))
    })
  );
}

/* الفئات */
for (const cat of data.categories) {
  const branch = data.branches.find(b => b.id === cat.branchId);
  const catDir = path.join(DIST, branch.slug, cat.slug);
  ensureDir(catDir);

  fs.writeFileSync(
    path.join(catDir, "index.html"),
    pageTemplate({
      title: cat.name,
      description: `Detailed content pages for ${cat.name}`,
      content:
        `${cat.name} is a curated category containing multiple content pages. Each page expands on concepts, examples, and structured information with internal links.`,
      links: data.sites
        .filter(s => s.categoryId === cat.id)
        .map(s => ({
          href: `${BASE}/${branch.slug}/${cat.slug}/${s.slug}.html`,
          label: s.name
        }))
    })
  );

  /* الصفحات النهائية */
  for (const site of data.sites.filter(s => s.categoryId === cat.id)) {
    fs.writeFileSync(
      path.join(catDir, `${site.slug}.html`),
      pageTemplate({
        title: site.name,
        description: `In-depth page about ${site.name}`,
        content:
          `${site.name} is presented here with a full textual explanation. This page is part of a large static structure designed to provide genuine content depth, internal linking, and crawlable architecture.`,
        links: [
          { href: `${BASE}/${branch.slug}/${cat.slug}/`, label: "Back to category" },
          { href: `${BASE}/${branch.slug}/`, label: "Back to branch" }
        ]
      })
    );
  }
}

console.log("✅ Static pages generated successfully");
