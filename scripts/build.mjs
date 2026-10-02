import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";

const src = new URL("../site/", import.meta.url);
const out = new URL("../dist/", import.meta.url);

if (existsSync(out)) {
  await rm(out, { recursive: true, force: true });
}
await mkdir(out, { recursive: true });
await cp(src, out, { recursive: true });

console.log("CCPA site copied to dist/.");
