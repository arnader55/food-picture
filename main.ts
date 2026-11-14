// food-picture-01 — hand the burger photo to the grader.
//
// The picture itself is already in this repo as entry.png: a double smash
// burger close-up, molten cheddar dripping off the patties, glossy sesame
// brioche, a little steam, warm light on dark slate. This program's whole
// job is to place those exact bytes at <output>/entry.png, where the gate
// and the judge read them. Nothing is drawn, fetched, or altered here —
// the bytes in are the bytes out, so running it twice always agrees.
// No network, no clock, no randomness, Node 22 standard library only.

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The grader's output folder. Outside the sandbox the env var stands in
// for /output; inside the sandbox /output is the default.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = "entry.png";

// The photo sits next to this script in the repo, whatever the cwd is.
const repoDir = dirname(fileURLToPath(import.meta.url));
const photoPath = resolve(repoDir, "entry.png");
const destPath = resolve(outDir, outFile);

if (!existsSync(photoPath)) {
  console.error(`picture missing: ${photoPath}`);
  process.exit(1);
}

const photoBytes = readFileSync(photoPath);

mkdirSync(outDir, { recursive: true });
writeFileSync(destPath, photoBytes);

// Self-check: the gate rejects a short or partial file, so confirm the
// copy landed whole before reporting success.
if (statSync(destPath).size !== photoBytes.length) {
  console.error(`short write: ${destPath}`);
  process.exit(1);
}
console.log(`wrote ${destPath} (${photoBytes.length} bytes)`);
