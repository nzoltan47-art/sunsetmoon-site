import fs from "fs";
import path from "path";

const baseUrl = "https://sunsetmoon.today";

// Resolve project root
const root = process.cwd();

// Load cities JSON
const citiesPath = path.join(root, "src", "data", "cities.json");
const cities = JSON.parse(fs.readFileSync(citiesPath, "utf-8"));

const staticPages = [
  "",
  "/cities",
  "/about",
  "/privacy",
  "/terms",
  "/contact"
];

const urls = [
  ...staticPages.map(page => `${baseUrl}${page}`),
  ...cities.flatMap(city => [
    `${baseUrl}/sunset/${city.slug}`,
    `${baseUrl}/moon/${city.slug}`,
    `${baseUrl}/golden-hour/${city.slug}`
  ])
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `<url><loc>${url}</loc></url>`).join("\n")}
</urlset>`;

// Write sitemap
const sitemapPath = path.join(root, "public", "sitemap.xml");
fs.writeFileSync(sitemapPath, sitemap);

console.log("Sitemap generated with", urls.length, "URLs");