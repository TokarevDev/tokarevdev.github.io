import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pages = ["index.html", "projects/asteroids.html", "projects/emoji-battle.html", "projects/last-seed.html"];
let failed = false;

const fail = (message) => {
  failed = true;
  console.error(`FAIL: ${message}`);
};

for (const page of pages) {
  const absolutePage = path.join(root, page);
  const html = fs.readFileSync(absolutePage, "utf8");
  const pageDirectory = path.dirname(absolutePage);

  if (/\bATS\b|applicant tracking/i.test(html)) {
    fail(`${page} contains internal recruitment-filter terminology`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|#|data:)/.test(reference)) {
      continue;
    }
    const cleanReference = reference.split(/[?#]/, 1)[0];
    if (cleanReference && !fs.existsSync(path.resolve(pageDirectory, cleanReference))) {
      fail(`${page} references missing file ${reference}`);
    }
  }

  for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    const attributes = match[1];
    const body = match[2].trim();
    if (!body || /\bsrc=/.test(attributes)) {
      continue;
    }
    try {
      if (/application\/ld\+json/.test(attributes)) {
        JSON.parse(body);
      } else {
        new Function(body);
      }
    } catch (error) {
      fail(`${page} contains invalid inline script: ${error.message}`);
    }
  }

  const referencedKeys = new Set([...html.matchAll(/data-i18n(?:-html)?="([^"]+)"/g)].map((match) => match[1]));
  let translations = {};

  try {
    if (page === "index.html") {
      const start = html.indexOf("const translations = ") + "const translations = ".length;
      const end = html.indexOf("\n    const translatableElements", start);
      translations = new Function(`return ${html.slice(start, end).trim().replace(/;$/, "")}`)();
    } else {
      const match = html.match(/window\.caseStudyTranslations = ({[\s\S]*?});\s*<\/script>/);
      translations = new Function("window", `${match[0].replace(/<\/script>$/, "")} return window.caseStudyTranslations;`)({});
    }
  } catch (error) {
    fail(`${page} translations could not be parsed: ${error.message}`);
  }

  for (const language of ["ru", "uk"]) {
    const missing = [...referencedKeys].filter((key) => !(key in (translations[language] || {})));
    if (missing.length) {
      fail(`${page} ${language.toUpperCase()} missing keys: ${missing.join(", ")}`);
    }
  }

  console.log(`PASS: ${page} (${referencedKeys.size} localized keys)`);
}

for (const script of ["assets/case-study.js"]) {
  try {
    new Function(fs.readFileSync(path.join(root, script), "utf8"));
    console.log(`PASS: ${script} syntax`);
  } catch (error) {
    fail(`${script} syntax: ${error.message}`);
  }
}

if (failed) {
  process.exitCode = 1;
} else {
  console.log("All site validation checks passed.");
}
