const fs = require("fs");
const path = require("path");
const cities = require("../src/data/cities.json");
const BASE_URL = "https://sunsetmoon.today";
// max URLs per sitemap (Google safe)
const CHUNK_SIZE = 10000;
function generateUrls() {
  const urls = [];

  const filteredCities = cities.filter(city => city.population >= 100000);
  filteredCities.forEach((city) => {
    const slug = city.slug;
    urls.push(`${BASE_URL}/sunset/${slug}`);
    urls.push(`${BASE_URL}/golden-hour/${slug}`);
    urls.push(`${BASE_URL}/moon/${slug}`);
  });

  const guideslugs = [
    "golden-hour-dubrovnik-croatia",
    "sunset-photography-dominican-republic",
    "golden-hour-amalfi-coast-italy",
    "sunset-monaco-monte-carlo",
    "golden-hour-kyoto-japan",
    "golden-hour-bangkok-thailand",
    "golden-hour-hong-kong",
    "golden-hour-london-uk",
    "golden-hour-istanbul-turkey",
    "golden-hour-dubai-uae",
    "golden-hour-antalya-turkey",
    "golden-hour-paris-france",
    "golden-hour-kuala-lumpur-malaysia",
    "golden-hour-singapore",
    "golden-hour-seoul-south-korea",
    "golden-hour-new-york-usa",
    "golden-hour-barcelona-spain",
    "golden-hour-amsterdam-netherlands",
    "golden-hour-milan-italy",
    "golden-hour-osaka-japan",
    "golden-hour-taipei-taiwan",
    "golden-hour-rome-italy",
    "golden-hour-shanghai-china",
    "golden-hour-vienna-austria",
    "golden-hour-prague-czech-republic",
    "golden-hour-miami-usa",
    "golden-hour-los-angeles-usa",
    "golden-hour-chennai-india",
    "golden-hour-dublin-ireland",
    "golden-hour-madrid-spain",
    "golden-hour-munich-germany",
    "golden-hour-mumbai-india",
  ];

  urls.push(`${BASE_URL}/guides`);
  guideslugs.forEach((slug) => {
    urls.push(`${BASE_URL}/guide/${slug}`);
  });

  return urls;
}
function createSitemap(urls, index) {
  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
      .map(
        (url) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
      )
      .join("")}
</urlset>`;
  const filePath = path.join(
    __dirname,
    `../public/sitemap-${index}.xml`
  );
  fs.writeFileSync(filePath, content);
}
function createIndex(count) {
  const content = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: count })
      .map(
        (_, i) => `
  <sitemap>
    <loc>${BASE_URL}/sitemap-${i + 1}.xml</loc>
  </sitemap>`
      )
      .join("")}
</sitemapindex>`;
  fs.writeFileSync(
    path.join(__dirname, "../public/sitemap.xml"),
    content
  );
}
function main() {
  const urls = generateUrls();
  const chunks = [];
  for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
    chunks.push(urls.slice(i, i + CHUNK_SIZE));
  }
  chunks.forEach((chunk, i) => {
    createSitemap(chunk, i + 1);
  });
  createIndex(chunks.length);
  console.log(`✅ Generated ${chunks.length} sitemaps`);
}
main();