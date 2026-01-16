import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "../src/data/generated.json");
const OUTPUT_FILE = path.join(__dirname, "../public/meta.json");

if (!fs.existsSync(DATA_FILE)) {
  console.error("❌ generated.json not found");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

const meta = {
  title: "Branch Palette – Global Tech Directory",
  description:
    "Discover the best tools, platforms, and services across all technology branches.",
  pages: [],
};

data.branches.forEach((b) => {
  meta.pages.push({
    path: `/${b.slug}`,
    title: `${b.name} Tools`,
    description: `Best tools and platforms for ${b.name}`,
  });
});

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(meta, null, 2), "utf-8");

console.log("✅ generate-meta.js completed successfully");
