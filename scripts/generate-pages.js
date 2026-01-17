import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// مصادر البيانات
const DATA_FILE = path.join(__dirname, "../src/data/generated.json");

// مجلد الإخراج النهائي (سيُنشر)
const DIST_DIR = path.join(__dirname, "../dist");

// تحميل البيانات
const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

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
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; background:#fafafa; }
    h1,h2,h3 { color:#111 }
    ul { padding-left:20px }
    a { color:#2563eb; text-decoration:none }
    a:hover { text-decoration:underline }
    .box { background:white; padding:20px; border-radius:8px; margin-bottom:20px }
  </style>
</head>
<body>
${content}
</body>
</html>
`;

// ========================
// الصفحة الرئيسية
// ========================
ensureDir(DIST_DIR);

const homeContent = `
<h1>Global Branch Directory</h1>
<p>Browse thousands of categorized websites across multiple branches.</p>

<div class="box">
<h2>Branches</h2>
<ul>
${data.branches
  .map(
    (b) => `<li><a href="/branches/${b.slug}/">${b.name}</a></li>`
  )
  .join("")}
</ul>
</div>
`;

fs.writeFileSync(
  path.join(DIST_DIR, "index.html"),
  pageTemplate({
    title: "Global Branch Directory",
    description: "A massive SEO-friendly directory of categorized websites",
    content: homeContent,
  })
);

// ========================
// صفحات الفروع
// ========================
for (const branch of data.branches) {
  const branchDir = path.join(DIST_DIR, "branches", branch.slug);
  ensureDir(branchDir);

  const categories = data.categories.filter(
    (c) => c.branchId === branch.id
  );

  const content = `
  <h1>${branch.name}</h1>
  <p>Categories under ${branch.name}</p>

  <div class="box">
  <ul>
  ${categories
    .map(
      (c) =>
        `<li><a href="/categories/${c.slug}/">${c.name}</a></li>`
    )
    .join("")}
  </ul>
  </div>

  <a href="/">← Back to home</a>
  `;

  fs.writeFileSync(
    path.join(branchDir, "index.html"),
    pageTemplate({
      title: `${branch.name} – Branch Directory`,
      description: `Explore categories under ${branch.name}`,
      content,
    })
  );
}

// ========================
// صفحات التصنيفات
// ========================
for (const category of data.categories) {
  const catDir = path.join(DIST_DIR, "categories", category.slug);
  ensureDir(catDir);

  const sites = data.sites.filter(
    (s) => s.categoryId === category.id
  );

  const content = `
  <h1>${category.name}</h1>
  <p>Websites listed under ${category.name}</p>

  <div class="box">
  <ul>
  ${sites
    .map(
      (s) =>
        `<li><a href="/sites/${s.slug}/">${s.name}</a></li>`
    )
    .join("")}
  </ul>
  </div>

  <a href="/">← Back to home</a>
  `;

  fs.writeFileSync(
    path.join(catDir, "index.html"),
    pageTemplate({
      title: `${category.name} – Website Category`,
      description: `Browse sites in ${category.name}`,
      content,
    })
  );
}

// ========================
// صفحات المواقع
// ========================
for (const site of data.sites) {
  const siteDir = path.join(DIST_DIR, "sites", site.slug);
  ensureDir(siteDir);

  const content = `
  <h1>${site.name}</h1>
  <p>This website belongs to our curated directory.</p>

  <div class="box">
    <p><strong>Visit:</strong> <a href="${site.url}">${site.url}</a></p>
  </div>

  <a href="/">← Back to home</a>
  `;

  fs.writeFileSync(
    path.join(siteDir, "index.html"),
    pageTemplate({
      title: `${site.name} – Listed Website`,
      description: `Details and information about ${site.name}`,
      content,
    })
  );
}

console.log("✅ Static HTML pages generated successfully");
