import fs from "fs";
import path from "path";
import data from "../src/data/generated.json" assert { type: "json" };

const DIST = path.resolve("dist");

const ensureDir = (p) => {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
};

const layout = (title, description, content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="/" />
  <style>
    body{font-family:system-ui;margin:40px;background:#fafafa;color:#111}
    h1,h2{color:#0f172a}
    a{display:block;margin:6px 0;color:#2563eb;text-decoration:none}
    a:hover{text-decoration:underline}
  </style>
</head>
<body>
${content}
</body>
</html>`;

ensureDir(DIST);

// homepage
fs.writeFileSync(
  path.join(DIST, "index.html"),
  layout(
    "Branch Palette – Directory",
    "Huge directory of branches, categories and sites",
    `<h1>Branches</h1>
     ${data.branches
       .map((b) => `<a href="/branches/${b.slug}.html">${b.name}</a>`)
       .join("")}`
  )
);

// branches
ensureDir(path.join(DIST, "branches"));
ensureDir(path.join(DIST, "categories"));
ensureDir(path.join(DIST, "sites"));

data.branches.forEach((b) => {
  const cats = data.categories.filter((c) => c.branchId === b.id);

  fs.writeFileSync(
    path.join(DIST, "branches", `${b.slug}.html`),
    layout(
      `${b.name} – Branch`,
      `All categories under ${b.name}`,
      `<h1>${b.name}</h1>
       <h2>Categories</h2>
       ${cats
         .map(
           (c) =>
             `<a href="/categories/${c.slug}.html">${c.name}</a>`
         )
         .join("")}`
    )
  );
});

// categories
data.categories.forEach((c) => {
  const sites = data.sites.filter((s) => s.categoryId === c.id);

  fs.writeFileSync(
    path.join(DIST, "categories", `${c.slug}.html`),
    layout(
      `${c.name} – Category`,
      `Websites in ${c.name}`,
      `<h1>${c.name}</h1>
       <h2>Sites</h2>
       ${sites
         .map(
           (s) =>
             `<a href="/sites/${s.slug}.html">${s.name}</a>`
         )
         .join("")}`
    )
  );
});

// sites
data.sites.forEach((s) => {
  fs.writeFileSync(
    path.join(DIST, "sites", `${s.slug}.html`),
    layout(
      `${s.name} – Website`,
      `${s.name} website information`,
      `<h1>${s.name}</h1>
       <p>This is a static SEO page for ${s.name}</p>
       <a href="/">← Back to home</a>`
    )
  );
});

console.log("✅ Static HTML pages generated");
