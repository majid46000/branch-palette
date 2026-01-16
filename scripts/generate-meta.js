#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { GENERATED_DIRECTORY } from "../src/data/generated.js";

const metaDir = path.join(process.cwd(), "public", "meta");
fs.mkdirSync(metaDir, { recursive: true });

GENERATED_DIRECTORY.sites.forEach(site => {
  const meta = {
    title: site.name,
    description: site.description,
    keywords: site.tags.join(", "),
    url: site.url,
    lastUpdated: site.metadata.lastUpdated
  };
  fs.writeFileSync(path.join(metaDir, `${site.id}.json`), JSON.stringify(meta, null, 2));
});

console.log("✅ Meta files generated.");
