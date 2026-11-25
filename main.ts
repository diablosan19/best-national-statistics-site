// main.ts — hands the entry in.
// Copies the static site (app/) and its screenshots (screenshots/) from this
// repository into the output directory, then writes the dossier the judge
// reads, built by the kit's own library so it matches byte for byte.
// The grader runs this program twice and expects identical bytes both times:
// nothing here depends on the clock, the network or the working directory.
// MAKEFUN_OUTPUT_DIR stands in for /output when run outside the grader.

import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });

for (const part of ['app', 'screenshots']) {
  const target = join(outputDir, part);
  rmSync(target, { recursive: true, force: true });
  cpSync(join(repoDir, part), target, { recursive: true });
}

const dossierBytes = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
  app_path_max_bytes: 1000,
});

writeFileSync(join(outputDir, 'dossier.json'), dossierBytes);
console.log(`handed in: app/ and screenshots/ copied, dossier.json written (${dossierBytes.length} bytes)`);
