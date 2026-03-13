import fs from "fs";
import cities from "../src/data/cities.json" assert { type: "json" };

const baseUrl = "https://sunsetmoon.today";

const staticPages = [
  "",
  "/cities",
  "/about",
  "/privacy",
  "/terms",
  "/contact"
];

const urls = [
  ...staticPages.map((page) => `${baseUrl}${page}`),
  ...cities.flatMap((city) => [
    `${baseUrl}/sunset/${city.slug}`,
    `${baseUrl}/moon/${city.slug}`,
    `${baseUrl}/golden-hour/${city.slug}`
  ])
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => `<url><loc>${url}</loc></url>`)
  .join("\n")}
</urlset>`;

fs.writeFileSync("./public/sitemap.xml", sitemap);

console.log("Sitemap generated with", urls.length, "URLs");