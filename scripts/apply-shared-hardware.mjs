import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const commonRoot = resolve(process.env.DCS_COMMON_ROOT ?? join(root, '.dcs-common'));
const { renderSharedHardwarePage } = await import(pathToFileURL(join(commonRoot, 'scripts/shared-hardware-consumer.mjs')));
const svgDir = join(root, 'kneeboard/source');
const pngDir = join(root, 'kneeboard/F4U-1D');
mkdirSync(svgDir, { recursive: true });
mkdirSync(pngDir, { recursive: true });

const pages = [
  {
    file: '01-WINCTRL-PTO2-AIRFRAME', deviceId: 'winctrl-pto2',
    title: 'WINCTRL CARRIERACE PTO2', kicker: 'F4U-1D AIRFRAME, CARRIER AND GROUND CONTROLS',
    labels: ['BTN 35/37: Landing gear', 'BTN 5/7: Flaps', 'BTN 8/9: Approach light', 'BTN 10/11: Airbrake', '', 'BTN 32/33/34: Arresting hook', '', '', '', '', '', '', '', 'BTN 28/29/30: Wings', 'BTN 31: Hinge-pin lock', 'BTN 38/39: Parking brake'],
  },
  {
    file: '02-WINCTRL-PTO2-STORES', deviceId: 'winctrl-pto2',
    title: 'WINCTRL CARRIERACE PTO2', kicker: 'F4U-1D STORES, EMERGENCY AND LIGHTING CONTROLS',
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', 'BTN 17/19/22: Drop-tank lock', 'BTN 23/24/25: Release selectors', 'BTN 26/27: Emergency release'],
  },
  {
    file: '04-VKB-F14-GRIP', deviceId: 'vkb-f14-gunfighter',
    title: 'VKB GUNFIGHTER • F-14 GRIP', kicker: 'F4U-1D TRIM AND WEAPONS CONTROLS',
    labels: ['BTN 9–12: Trim', 'BTN 3: Bomb release', 'BTN 13–16: Weapon selector unbound', 'BTN 7 + BTN 3: Rockets fire', '', '', 'BTN 1: Guns fire'],
  },
];

for (const spec of pages) {
  const pageNumber = spec.file.startsWith('01-') ? 1 : spec.file.startsWith('02-') ? 2 : 4;
  const { svg } = renderSharedHardwarePage({ ...spec, commonRoot, footer: `F4U-1D Corsair • shared DCS-Common hardware template • ${pageNumber} / 4` });
  writeFileSync(join(svgDir, `${spec.file}.svg`), svg);
  await sharp(Buffer.from(svg)).png().toFile(join(pngDir, `${spec.file}.png`));
}
