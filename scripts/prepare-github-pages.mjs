import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const assetsDir = new URL("../dist/client/assets/", import.meta.url);
const files = await readdir(assetsDir);

for (const filename of files.filter((name) => name.endsWith(".js"))) {
  const path = join(assetsDir.pathname, filename);
  const source = await readFile(path, "utf8");
  const patched = source.replaceAll("/assets/", "/strawberry-scrapbook/assets/");
  await writeFile(path, patched);
}

console.log("Prepared asset paths for GitHub Pages.");
