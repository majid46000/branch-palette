import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, "../src/data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "generated.json");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const branches = Array.from({ length: 40 }, (_, i) => ({
  id: `branch-${i + 1}`,
  name: `Branch ${i + 1}`,
  slug: slugify(`Branch ${i + 1}`),
}));

const categories = branches.flatMap((branch) =>
  Array.from({ length: 10 }, (_, i) => ({
    id: `${branch.id}-cat-${i + 1}`,
    branchId: branch.id,
    name: `Category ${i + 1}`,
    slug: slugify(`Category ${i + 1}`),
  }))
);

const sites = categories.flatMap((cat) =>
  Array.from({ length: 25 }, (_, i) => ({
    id: `${cat.id}-site-${i + 1}`,
    categoryId: cat.id,
    name: `Site ${i + 1}`,
    slug: slugify(`Site ${i + 1}`),
    url: "#",
    description: `Detailed overview of ${cat.name} Site ${i + 1}, including classification, usage, and relevance.`,
  }))
);

fs.writeFileSync(
  OUTPUT_FILE,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      branches,
      categories,
      sites,
    },
    null,
    2
  ),
  "utf-8"
);

console.log("✅ generate-data.js completed");
