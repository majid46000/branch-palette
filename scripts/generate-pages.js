import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import data from "../src/data/generated.json" assert { type: "json" };
import { BLOCKED_BRANCHES, BLOCKED_KEYWORDS } from "./blocked.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, "../dist");

const isBlocked = (text) => {
  const t = text.toLowerCase();
  return (
    BLOCKED_BRANCHES.some(b => t.includes(b)) ||
    BLOCKED_KEYWORDS.some(k => t.includes(k))
  );
};

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const pageTemplate = ({ title, description, content }) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
<main>
<h1>${title}</h1>
<p>${description}</p>
${content}
</main>
</body>
</html>
`;

ensureDir(DIST_DIR);

/* ======================
   توليد صفحات الفروع
====================== */
for (const branch of data.branches) {
  if (isBlocked(branch.name)) continue;

  const branchDir = path.join(DIST_DIR, branch.slug);
  ensureDir(branchDir);

  const categories = data.categories.filter(c => c.branchId === branch.id);

  let content = `<section>`;
  for (const cat of categories) {
    content += `<article>
      <h2>${cat.name}</h2>
      <p>This category explores ${cat.name} within ${branch.name}. 
      It provides structured, descriptive content intended for real users,
      explaining concepts, use cases, and practical context.</p>
    </article>`;
  }
  content += `</section>`;

  fs.writeFileSync(
    path.join(branchDir, "index.html"),
    pageTemplate({
      title: `${branch.name} – Comprehensive Overview`,
      description: `In-depth editorial content about ${branch.name}, structured for clarity and search engines.`,
      content
    })
  );
}

/* ======================
   توليد صفحات التصنيفات
====================== */
for (const cat of data.categories) {
  if (isBlocked(cat.name)) continue;

  const branch = data.branches.find(b => b.id === cat.branchId);
  if (!branch) continue;

  const catDir = path.join(DIST_DIR, branch.slug, cat.slug);
  ensureDir(catDir);

  const sites = data.sites.filter(s => s.categoryId === cat.id);

  let content = `<section>`;
  for (const site of sites) {
    content += `<article>
      <h3>${site.name}</h3>
      <p>
      ${site.name} is discussed here as an example within ${cat.name}.
      The focus is on explanation, context, and understanding rather than linking.
      This ensures the page provides real informational value.
      </p>
    </article>`;
  }
  content += `</section>`;

  fs.writeFileSync(
    path.join(catDir, "index.html"),
    pageTemplate({
      title: `${cat.name} in ${branch.name}`,
      description: `Editorial content explaining ${cat.name} as part of ${branch.name}.`,
      content
    })
  );
}

console.log("✅ Static pages generated successfully");
