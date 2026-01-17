import fs from "fs";
import data from "../src/data/generated.json" assert { type: "json" };

const base = "https://majid46000.github.io/branch-palette";
let urls = [`${base}/`];

data.branches.forEach((b) => {
  urls.push(`${base}/branches/${b.slug}/`);

  data.categories
    .filter((c) => c.branchId === b.id)
    .forEach((c) => {
      urls.push(`${base}/branches/${b.slug}/categories/${c.slug}/`);

      data.sites
        .filter((s) => s.categoryId === c.id)
        .forEach((s) => {
          urls.push(
            `${base}/branches/${b.slug}/categories/${c.slug}/sites/${s.slug}.html`
          );
        });
    });
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `<url><loc>${u}</loc></url>`).join("\n")}
</urlset>`;

fs.writeFileSync("dist/sitemap.xml", xml);
console.log("✅ sitemap generated");
