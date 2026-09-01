import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pages = ["index.html", "projects/asteroids.html", "projects/last-seed.html"];
const removedProjectNames = ["Emoji Battle", "Tanks Multiplayer", "Galaxy Strike", "Sharp Shooter"];
let failed = false;

const fail = (message) => {
  failed = true;
  console.error(`FAIL: ${message}`);
};

for (const page of pages) {
  const absolutePage = path.join(root, page);
  const html = fs.readFileSync(absolutePage, "utf8");
  const pageDirectory = path.dirname(absolutePage);

  if (/\bATS\b|applicant tracking/i.test(html)) fail(`${page} contains internal recruitment-filter terminology`);
  if (/\bexperience\b|\byears?\b|\bопыт\b|\bдосвід\b|3\s*\+/i.test(html)) fail(`${page} contains prohibited tenure wording`);
  for (const name of removedProjectNames) {
    if (html.includes(name)) fail(`${page} still references removed project ${name}`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|#|data:)/.test(reference)) continue;
    const cleanReference = reference.split(/[?#]/, 1)[0];
    if (cleanReference && !fs.existsSync(path.resolve(pageDirectory, cleanReference))) {
      fail(`${page} references missing file ${reference}`);
    }
  }

  for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    const attributes = match[1];
    const body = match[2].trim();
    if (!body || /\bsrc=/.test(attributes)) continue;
    try {
      if (/application\/ld\+json/.test(attributes)) JSON.parse(body);
      else new Function(body);
    } catch (error) {
      fail(`${page} contains invalid inline script: ${error.message}`);
    }
  }

  const referencedKeys = new Set([...html.matchAll(/data-i18n(?:-html)?="([^"]+)"/g)].map((match) => match[1]));
  let translations = {};
  try {
    const match = html.match(/window\.PORTFOLIO_TRANSLATIONS\s*=\s*({[\s\S]*?});\s*<\/script>/);
    if (!match) throw new Error("translation object not found");
    translations = new Function(`return ${match[1]}`)();
  } catch (error) {
    fail(`${page} translations could not be parsed: ${error.message}`);
  }

  for (const language of ["ru", "uk"]) {
    const missing = [...referencedKeys].filter((key) => !(key in (translations[language] || {})));
    if (missing.length) fail(`${page} ${language.toUpperCase()} missing keys: ${missing.join(", ")}`);
  }

  console.log(`PASS: ${page} (${referencedKeys.size} localized keys)`);
}

for (const script of ["assets/site.js"]) {
  try {
    new Function(fs.readFileSync(path.join(root, script), "utf8"));
    console.log(`PASS: ${script} syntax`);
  } catch (error) {
    fail(`${script} syntax: ${error.message}`);
  }
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
for (const removedName of ["emoji-battle", "tanks", "galaxy", "sharp-shooter"]) {
  if (sitemap.toLowerCase().includes(removedName)) fail(`sitemap still references ${removedName}`);
}

if (failed) process.exitCode = 1;
else console.log("All site validation checks passed.");
