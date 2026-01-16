const fs = require('fs');
const path = require('path');

// Seeded RNG function
function seededRandom(seed) {
  return function () {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // استبدال المسافات بشرطة
    .replace(/[^\w-]+/g, '')     // حذف أي شيء غير حروف/أرقام/_
    .replace(/-+/g, '-');        // دمج الشرطات المتكررة
}

const generateData = (seed) => {
  const random = seededRandom(seed);
  const branches = [];
  const categoriesCount = 5;
  const sitesCount = 10;

  for (let i = 0; i < 40; i++) {
    const branchId = `branch-${i + 1}`;
    const branch = {
      id: branchId,
      name: `Branch ${i + 1}`,
      categories: [],
    };

    for (let j = 0; j < categoriesCount; j++) {
      const categoryId = `category-${j + 1}`;
      const category = {
        id: categoryId,
        name: `Category ${j + 1}`,
        sites: [],
      };

      for (let k = 0; k < sitesCount; k++) {
        const siteId = `site-${k + 1}`;
        const name = `Site ${k + 1} in ${category.name}`;
        const site = {
          id: siteId,
          name,
          slug: slugify(name),
          fullText: `Detailed description for ${name}`,
        };
        category.sites.push(site);
      }

      branch.categories.push(category);
    }

    branches.push(branch);
  }

  return { branches };
};

// توليد البيانات وكتابة الملفات
const data = generateData(2026);

const branchesPath = path.join(__dirname, '../public/data/branches.json');
const sitesPath = path.join(__dirname, '../public/data/sites.json');
const generatedTsPath = path.join(__dirname, '../src/data/generated.ts');

// تأكد من وجود المجلدات
fs.mkdirSync(path.dirname(branchesPath), { recursive: true });
fs.mkdirSync(path.dirname(generatedTsPath), { recursive: true });

fs.writeFileSync(branchesPath, JSON.stringify(data.branches, null, 2));
fs.writeFileSync(
  sitesPath,
  JSON.stringify(
    data.branches.flatMap((b) => b.categories.flatMap((c) => c.sites)),
    null,
    2
  )
);

const generatedTsContent =
  '// Auto-generated data file\n' +
  'export const generatedData = ' +
  JSON.stringify(data.branches, null, 2) +
  ';\n';

fs.writeFileSync(generatedTsPath, generatedTsContent);

console.log('Data generation is complete.');
