import fs from "fs";
import path from "path";

const baseUrl = "https://sunsetmoon.today";
const root = process.cwd();

const cities = JSON.parse(
  fs.readFileSync(path.join(root, "src", "data", "cities.json"), "utf8")
);

const staticPages = [
  "",
  "/cities",
  "/about",
  "/privacy",
  "/terms",
  "/contact"
];

const urls = [
  ...staticPages.map(p => `${baseUrl}${p}`),
  ...cities.flatMap(city => [
    `${baseUrl}/sunset/${city.slug}`,
    `${baseUrl}/moon/${city.slug}`,
    `${baseUrl}/golden-hour/${city.slug}`
  ])
];

const CHUNK_SIZE = 15000;
const sitemapFiles = [];

for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
  const chunk = urls.slice(i, i + CHUNK_SIZE);
  const fileName = `sitemap-${Math.floor(i / CHUNK_SIZE) + 1}.xml`;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk
  .map(
    url =>
      `<url><loc>${url}</loc><lastmod>${new Date().toISOString()}</lastmod></url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(root, "public", fileName), sitemap);
  sitemapFiles.push(fileName);
}

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles
  .map(file => `<sitemap><loc>${baseUrl}/${file}</loc></sitemap>`)
  .join("\n")}
</sitemapindex>`;

fs.writeFileSync(path.join(root, "public", "sitemap.xml"), sitemapIndex);

console.log("Generated", sitemapFiles.length, "sitemaps");
