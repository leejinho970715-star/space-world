import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const outputDirectory = join(process.cwd(), "dist", "client");
const prerenderDirectory = join(process.cwd(), "dist", "server", "prerendered-routes");
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

// Vinext keeps pre-rendered route documents beside the server build. GitHub
// Pages only serves the uploaded client directory, so merge those documents
// into the static artifact before rewriting repository-relative URLs.
for (const file of await filesIn(prerenderDirectory)) {
  const destination = join(outputDirectory, relative(prerenderDirectory, file));
  await mkdir(join(destination, ".."), { recursive: true });
  await copyFile(file, destination);
}

for (const file of await filesIn(outputDirectory)) {
  if (!textExtensions.has(extname(file))) continue;
  const source = await readFile(file, "utf8");
  let prefixed = source
    .replace(/(["'`])\/(?!\/|space-world(?:\/|["'`]))(?=[A-Za-z0-9_.-])/g, `$1${basePath}/`)
    .replace(/(["'])\/\1/g, `$1${basePath}/$1`);
  // Vite removes quotes around CSS URLs, so handle those paths explicitly.
  if (extname(file) === ".css") {
    prefixed = prefixed.replace(/url\(\/(?!\/|space-world(?:\/|\)))(?=[A-Za-z0-9_.-])/g, `url(${basePath}/`);
  }
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
