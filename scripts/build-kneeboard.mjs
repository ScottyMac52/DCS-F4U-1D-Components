import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const commonRoot = resolve(process.env.DCS_COMMON_ROOT ?? join(root, '.dcs-common'));
const { renderSharedHardwareInstancesPage, renderSharedHardwarePage } = await import(
  pathToFileURL(join(commonRoot, 'scripts/shared-hardware-consumer.mjs'))
);
const { loadProfileDrivenConfig } = await import(
  pathToFileURL(join(commonRoot, 'scripts/profile-driven-kneeboard.mjs'))
);

const config = loadProfileDrivenConfig('config/kneeboard.json', { consumerRoot: root, commonRoot });
const svgDir = join(root, 'kneeboard/source');
const pngDir = join(root, 'kneeboard/F4U-1D');
mkdirSync(svgDir, { recursive: true });
mkdirSync(pngDir, { recursive: true });

const totalPages = config.pages.length + (config.instancePages?.length ?? 0);

for (const page of config.pages) {
  const number = Number(page.file.slice(0, 2));
  const { svg } = renderSharedHardwarePage({
    ...page,
    commonRoot,
    provenance: { consumer: 'DCS-F4U-1D-Components', page: `${number} / ${totalPages}` },
  });
  writeFileSync(join(svgDir, `${page.file}.svg`), svg);
  await sharp(Buffer.from(svg)).png().toFile(join(pngDir, `${page.file}.png`));
}

for (const page of config.instancePages ?? []) {
  const number = Number(page.file.slice(0, 2));
  const { svg } = renderSharedHardwareInstancesPage({
    ...page,
    commonRoot,
    provenance: { consumer: 'DCS-F4U-1D-Components', page: `${number} / ${totalPages}` },
  });
  writeFileSync(join(svgDir, `${page.file}.svg`), svg);
  await sharp(Buffer.from(svg)).png().toFile(join(pngDir, `${page.file}.png`));
}

console.log(`Generated ${totalPages} F4U-1D OpenKneeboard pages from DCS-Common shared hardware.`);
