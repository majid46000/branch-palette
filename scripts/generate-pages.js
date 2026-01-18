import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST = path.join(__dirname, "../dist");
const DATA = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../src/data/generated.json"), "utf8")
);

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

const baseTemplate = ({ title, description, content, links }) => `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
<meta charset="UTF-8" />
<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="viewport" content="width=device-width,initial-scale=1" />

<style>
:root {
  --bg: #0b0f1a;
  --fg: #e5e7eb;
  --card: #111827;
}
.light {
  --bg:#ffffff;
  --fg:#0f172a;
  --card:#f1f5f9;
}
body {
  margin:0;
  font-family: system-ui;
  background:var(--bg);
  color:var(--fg);
}
header {
  padding:2rem;
  text-align:center;
}
.grid {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:1.5rem;
  padding:2rem;
}
.card {
  background:var(--card);
  padding:1.5rem;
  border-radius:16px;
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
  transition:transform .4s;
}
.card:hover {
  transform: perspective(1000px) rotateX(6deg) rotateY(-6deg);
}
a {
  color:#38bdf8;
  text-decoration:none;
}
.toggle {
  position:fixed;
  top:1rem;
  right:1rem;
}
</style>

<script>
function toggleTheme(){
  document.documentElement.classList.toggle("light")
}
</script>
</head>

<body>
<button class="toggle" onclick="toggleTheme()">🌓</button>

<header>
<h1>${title}</h1>
<p>${description}</p>
</header>

<section class="grid">
${content}
</section>

<footer style="padding:2rem;text-align:center;opacity:.6">
Static Knowledge Directory
</footer>

</body>
</html>
`;

const pageCard = (title, text, url) => `
<div class="card">
<h3>${title}</h3>
<p>${text}</p>
<a href="${url}">Explore</a>
</div>
`;

for (const branch of DATA.branches) {
  const branchDir = path.join(DIST, branch.slug);
  fs.mkdirSync(branchDir, { recursive: true });

  const cats = DATA.categories.filter(c => c.branchId === branch.id);

  const cards = cats.map(c =>
    pageCard(c.name, "In-depth curated knowledge.", `/${branch.slug}/${c.slug}/`)
  ).join("");

  fs.writeFileSync(
    path.join(branchDir, "index.html"),
    baseTemplate({
      title: branch.name,
      description: `Explore ${branch.name} topics and structured resources.`,
      content: cards
    })
  );

  for (const cat of cats) {
    const catDir = path.join(branchDir, cat.slug);
    fs.mkdirSync(catDir, { recursive: true });

    const sites = DATA.sites.filter(s => s.categoryId === cat.id);

    const siteCards = sites.map(s =>
      pageCard(s.name, "Curated long-form informational content.", "#")
    ).join("");

    fs.writeFileSync(
      path.join(catDir, "index.html"),
      baseTemplate({
        title: `${cat.name} – ${branch.name}`,
        description: `Authoritative content about ${cat.name}.`,
        content: siteCards
      })
    );
  }
}

console.log("✅ Static pages generated");
