import { access, readFile } from "node:fs/promises";

const required = [
  "site/index.html",
  "site/assets/css/style.css",
  "site/assets/js/app.js",
  "site/assets/images/ccpa-logo.png",
  "wrangler.jsonc",
  "package.json"
];

for (const path of required) {
  await access(path);
}

const html = await readFile("site/index.html", "utf8");
if (!html.includes("Carbon & Climate PACT Africa PLC")) {
  throw new Error("Brand name check failed.");
}

console.log("Production package checks passed.");
