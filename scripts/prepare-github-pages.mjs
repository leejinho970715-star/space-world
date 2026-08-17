import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const outputDirectory = join(process.cwd(), "dist", "client");
const basePath = "/space-world";
const textExtensions = new Set([".html", ".css", ".js", ".json", ".txt", ".rsc", ".map", ".xml", ".svg"]);

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(path));
    else files.push(path);
  }
  return files;
}

for (const file of await filesIn(outputDirectory)) {
  if (!textExtensions.has(extname(file))) continue;
  const source = await readFile(file, "utf8");
  const prefixed = source
    .replace(/(["'`])\/(?!\/|space-world(?:\/|["'`]))(?=[A-Za-z0-9_.-])/g, `$1${basePath}/`)
    .replace(/(["'])\/\1/g, `$1${basePath}/$1`);
  if (prefixed !== source) await writeFile(file, prefixed);
}

for (const file of await filesIn(outputDirectory)) {
  if (extname(file) !== ".html" || file.endsWith("index.html") || file.endsWith("404.html")) continue;
  const route = relative(outputDirectory, file).replace(/\.html$/, "");
  const routeDirectory = join(outputDirectory, route);
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(join(routeDirectory, "index.html"), await readFile(file));
}

await writeFile(join(outputDirectory, ".nojekyll"), "");
