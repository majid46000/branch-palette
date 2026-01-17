import fs from "fs";
import path from "path";
import data from "../src/data/generated.json" assert { type: "json" };

const DIST = "dist";

const ensure = (p) => fs.mkdirSync(p, { recursive: true });

const page = (title, description, content) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="viewport" content="width=device-width, initial-scale=1" />

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "${title}",
  "description": "${description}"
}
</script>

<style>
body{font-family:system-ui;max-width:1100px;margin:auto;padding:40px;line-height:1.7}
a{color:#2563eb;text-decoration:none}
h1,h2,h3{margin-top:1.5em}
ul{padding-left:20px}
</style>
</head>
<body>
<h1>${title}</h1>
${content}
</body>
</html>`;

ensure(DIST);

/* HOME */
fs.writeFileSync(
  `${DIST}/index.html`,
  page(
    "Global Web Directory",
    "Massive categorized directory of websites, branches, and resources.",
    `<p>This is a large-scale static web directory designed for discovery, classification, and search visibility.</p>
<ul>
${data.branches
  .map((b) => `<li><a href="/branch-palette/branches/${b.slug}/">${b.name}</a></li>`)
  .join("")}
</ul>`
  )
);

/* BRANCHES */
data.branches.forEach((b) => {
  const dir = `${DIST}/branches/${b.slug}`;
  ensure(dir);

  const cats = data.categories.filter((c) => c.branchId === b.id);

  fs.writeFileSync(
    `${dir}/index.html`,
    page(
      `${b.name} Directory`,
      `Explore categories under ${b.name}.`,
      `<p>${b.name} contains curated categories and resources.</p>
<ul>
${cats
  .map(
    (c) =>
      `<li><a href="/branch-palette/branches/${b.slug}/categories/${c.slug}/">${c.name}</a></li>`
  )
  .join("")}
</ul>`
    )
  );

  cats.forEach((c) => {
    const cdir = `${dir}/categories/${c.slug}`;
    ensure(cdir);

    const sites = data.sites.filter((s) => s.categoryId === c.id);

    fs.writeFileSync(
      `${cdir}/index.html`,
      page(
        `${c.name} – ${b.name}`,
        `Websites listed under ${c.name} in ${b.name}.`,
        `<p>${c.name} includes the following websites:</p>
<ul>
${sites
  .map(
    (s) =>
      `<li><a href="/branch-palette/branches/${b.slug}/categories/${c.slug}/sites/${s.slug}.html">${s.name}</a></li>`
  )
  .join("")}
</ul>`
      )
    );

    sites.forEach((s) => {
      const sdir = `${cdir}/sites`;
      ensure(sdir);

      fs.writeFileSync(
        `${sdir}/${s.slug}.html`,
        page(
          `${s.name} – ${c.name}`,
          s.description,
          `<p>${s.description}</p>
<p>Category: <strong>${c.name}</strong></p>
<p>Branch: <strong>${b.name}</strong></p>
<p>This page is part of a large static directory optimized for search engines.</p>`
        )
      );
    });
  });
});

/* robots.txt */
fs.writeFileSync(
  `${DIST}/robots.txt`,
  `User-agent: *
Allow: /

Sitemap: https://majid46000.github.io/branch-palette/sitemap.xml`
);

console.log("✅ generate-pages.js completed");
