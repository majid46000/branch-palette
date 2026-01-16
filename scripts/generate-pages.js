import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "../src/data/generated.json");
const OUTPUT_DIR = path.join(__dirname, "../public/pages");

const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function pageTemplate({ title, description, h1, links }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
<h1>${h1}</h1>
<p>${description}</p>

<h2>Related Pages</h2>
<ul>
${links.map(l => `<li><a href="${l.href}">${l.text}</a></li>`).join("\n")}
</ul>

</body>
</html>`;
}

for (const branch of data.branches) {
  const branchDir = path.join(OUTPUT_DIR, branch.slug);
  fs.mkdirSync(branchDir, { recursive: true });

  const branchCats = data.categories.filter(c => c.branchId === branch.id);

  for (const cat of branchCats) {
    const catDir = path.join(branchDir, cat.slug);
    fs.mkdirSync(catDir, { recursive: true });

    const catSites = data.sites.filter(s => s.categoryId === cat.id);

    for (const site of catSites) {
      const filePath = path.join(catDir, `${site.slug}.html`);

      const html = pageTemplate({
        title: `${site.name} – ${cat.name} | ${branch.name}`,
        description: `Discover ${site.name} in ${cat.name} under ${branch.name}. A high quality curated reference.`,
        h1: site.name,
        links: catSites.slice(0, 5).map(s => ({
          href: `./${s.slug}.html`,
          text: s.name
        }))
      });

      fs.writeFileSync(filePath, html, "utf-8");
    }
  }
}

console.log("✅ generate-pages.js completed successfully");
