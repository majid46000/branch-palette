import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_FILE = path.join(__dirname, "../src/data/directory.ts");

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
  Array.from({ length: 5 }, (_, i) => ({
    id: `${branch.id}-cat-${i + 1}`,
    branchId: branch.id,
    name: `Category ${i + 1}`,
    slug: slugify(`Category ${i + 1}`),
  }))
);

const sites = categories.flatMap((cat) =>
  Array.from({ length: 10 }, (_, i) => ({
    id: `${cat.id}-site-${i + 1}`,
    categoryId: cat.id,
    name: `Site ${i + 1}`,
    slug: slugify(`Site ${i + 1}`),
    url: `https://example.com/${cat.slug}/site-${i + 1}`,
  }))
);

const content = `
// ⚠️ THIS FILE IS AUTO-GENERATED — DO NOT EDIT MANUALLY
// Generated at: ${new Date().toISOString()}

export const branches = ${JSON.stringify(branches, null, 2)} as const;

export const categories = ${JSON.stringify(categories, null, 2)} as const;

export const sites = ${JSON.stringify(sites, null, 2)} as const;
`;

fs.writeFileSync(OUTPUT_FILE, content.trim() + "\n", "utf-8");

console.log("✅ directory.ts regenerated successfully");
