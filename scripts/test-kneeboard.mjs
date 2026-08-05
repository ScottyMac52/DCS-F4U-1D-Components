import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const pngDir = join(root, 'kneeboard', 'F4U-1D');
const svgDir = join(root, 'kneeboard', 'source');
const assetDir = join(root, 'kneeboard', 'assets', 'source');
const profileDir = join(root, 'src', 'Config', 'Input', 'F4U-1D', 'joystick');
const pages = ['01-WINCTRL-PTO2-AIRFRAME', '02-WINCTRL-PTO2-STORES', '03-LOGITECH-DUAL-QUADRANTS', '04-VKB-F14-GRIP'];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function hashFile(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function generatedHashes() {
  return Object.fromEntries(pages.flatMap((page) => [
    [page + '.svg', hashFile(join(svgDir, page + '.svg'))],
    [page + '.png', hashFile(join(pngDir, page + '.png'))],
  ]));
}

const pngNames = readdirSync(pngDir).filter((name) => name.endsWith('.png')).sort();
const svgNames = readdirSync(svgDir).filter((name) => name.endsWith('.svg')).sort();
assert(JSON.stringify(pngNames) === JSON.stringify(pages.map((page) => page + '.png')), 'Unexpected kneeboard PNG filenames or page count.');
assert(JSON.stringify(svgNames) === JSON.stringify(pages.map((page) => page + '.svg')), 'Unexpected kneeboard SVG filenames or page count.');

const sources = [];
for (const [index, page] of pages.entries()) {
  const pngPath = join(pngDir, page + '.png');
  const svgPath = join(svgDir, page + '.svg');
  const metadata = await sharp(pngPath).metadata();
  assert(metadata.width === 1200 && metadata.height === 1600, page + '.png must be 1200 x 1600.');

  const source = readFileSync(svgPath, 'utf8');
  const externalResourceCheck = source.replaceAll('http://www.w3.org/2000/svg', '');
  assert(!/https?:\/\//i.test(externalResourceCheck), page + '.svg contains a network dependency.');
  assert(source.includes('data:image/'), page + '.svg does not embed its hardware image.');
  assert(source.includes((index + 1) + ' / ' + pages.length), page + '.svg has the wrong page number.');
  sources.push(source);
}

const visibleText = sources.join(' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
for (const required of [
  'Shared DCS-Common device: winctrl-pto2',
  'primary-quadrant=logitech-throttle-quadrant',
  'secondary-quadrant=logitech-throttle-quadrant',
  'Shared DCS-Common device: vkb-f14-gunfighter',
]) {
  assert(visibleText.includes(required), 'The PTO2 kneeboard is missing required text: ' + required);
}

const profileNames = readdirSync(profileDir).filter((name) => name.endsWith('.diff.lua'));
assert(profileNames.length === 5, 'Expected PTO2, two Logitech quadrants, MOZA axes, and VKB grip profiles.');
const lua = readFileSync(join(profileDir, profileNames.find((name) => name.startsWith('WINCTRL CarrierAce PTO 2'))), 'utf8');
const mappedButtons = new Set([...lua.matchAll(/JOY_BTN(\d+)/g)].map((match) => Number(match[1])));
for (const button of mappedButtons) {
  assert(lua.includes('JOY_BTN' + button), 'The PTO2 profile is missing mapped BTN ' + button + '.');
}

for (const asset of ['pto2-clean.png', 'pto2-template.svg', 'logitech-flight-throttle-quadrant.png', 'vkb-f14-grip-photo-clean.png', 'vkb-f14-grip-photo.jpeg']) {
  assert(readdirSync(assetDir).includes(asset), 'Missing source asset: ' + asset);
}
assert(
  readdirSync(join(assetDir, 'licenses')).includes('joystick-diagrams-GPL-2.0.txt'),
  'The Joystick Diagrams license is missing.',
);
assert(
  hashFile(join(assetDir, 'pto2-clean.png')) === 'b2b00caeb85e2fcb4f4b5c8101e36f7279558c4543ced3e5934c84f617c1db3e',
  'The verified PTO2 image asset changed unexpectedly.',
);
assert(
  hashFile(join(assetDir, 'logitech-flight-throttle-quadrant.png')) === '053b84c9192c60189fccfc4a87d5b9d6fbe92caf71f8189a775d4953772bed3d',
  'The verified Logitech product image asset changed unexpectedly.',
);
assert(
  hashFile(join(assetDir, 'vkb-f14-grip-photo-clean.png')) === '32850cb9e877b24d3c3ba97b789fa7666f2281dcd221354e956b59260955b4bd',
  'The verified VKB cleaned photograph changed unexpectedly.',
);
assert(
  hashFile(join(assetDir, 'vkb-f14-grip-photo.jpeg')) === '79f18abe2b07a2bcfdc3c8163e4af9e0752f7d22ae03e0bb6eacefd349ecac77',
  'The verified VKB source photograph changed unexpectedly.',
);

const before = generatedHashes();
function runBuildStep(script) {
  const result = spawnSync(process.execPath, [join(scriptDir, script)], {
    cwd: root,
    encoding: 'utf8',
    env: process.env,
  });
  assert(
    result.status === 0,
    `Deterministic rebuild failed in ${script}:\n${result.error?.stack ?? ''}\n${result.stdout ?? ''}\n${result.stderr ?? ''}`,
  );
}
runBuildStep('build-kneeboard.mjs');
const after = generatedHashes();
assert(JSON.stringify(after) === JSON.stringify(before), 'Kneeboard output changed across identical builds.');

console.log('Kneeboard validation passed: four deterministic pages cover the PTO2, quadrants, and VKB F-14 grip.');
