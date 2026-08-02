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
const page = '01-WINCTRL-PTO2';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function hashFile(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

const pngNames = readdirSync(pngDir).filter((name) => name.endsWith('.png')).sort();
const svgNames = readdirSync(svgDir).filter((name) => name.endsWith('.svg')).sort();
assert(JSON.stringify(pngNames) === JSON.stringify([page + '.png']), 'Unexpected kneeboard PNG filename or page count.');
assert(JSON.stringify(svgNames) === JSON.stringify([page + '.svg']), 'Unexpected kneeboard SVG filename or page count.');

const pngPath = join(pngDir, page + '.png');
const svgPath = join(svgDir, page + '.svg');
const metadata = await sharp(pngPath).metadata();
assert(metadata.width === 1200 && metadata.height === 1600, page + '.png must be 1200 x 1600.');

const source = readFileSync(svgPath, 'utf8');
const externalResourceCheck = source.replaceAll('http://www.w3.org/2000/svg', '');
assert(!/https?:\/\//i.test(externalResourceCheck), page + '.svg contains a network dependency.');
assert(source.includes('data:image/png;base64,'), page + '.svg does not embed the PTO2 image.');
assert(source.includes('1 / 1'), page + '.svg has the wrong page number.');
const visibleText = source.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

for (const required of [
  'Wings FOLD',
  'Wings HOLD / stop',
  'Wings SPREAD',
  'Wing hinge-pin LOCK toggle',
  'Arresting hook PARKING',
  'All other PTO2 controls are intentionally unbound',
]) {
  assert(visibleText.includes(required), page + '.svg is missing required text: ' + required);
}

const profileNames = readdirSync(profileDir).filter((name) => name.endsWith('.diff.lua'));
assert(profileNames.length === 1, 'Expected exactly one F4U-1D joystick profile.');
const lua = readFileSync(join(profileDir, profileNames[0]), 'utf8');
const mappedButtons = new Set([...lua.matchAll(/JOY_BTN(\d+)/g)].map((match) => Number(match[1])));
const labelledButtons = new Set([...source.matchAll(/BTN (\d+)/g)].map((match) => Number(match[1])));
for (const button of mappedButtons) {
  assert(labelledButtons.has(button), page + ' is missing its mapped BTN ' + button + ' label.');
}

for (const asset of ['pto2-clean.png', 'pto2-template.svg']) {
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

const before = { svg: hashFile(svgPath), png: hashFile(pngPath) };
const build = spawnSync(process.execPath, [join(scriptDir, 'build-kneeboard.mjs')], {
  cwd: root,
  encoding: 'utf8',
  env: process.env,
});
assert(build.status === 0, 'Deterministic rebuild failed:\n' + build.stdout + '\n' + build.stderr);
const after = { svg: hashFile(svgPath), png: hashFile(pngPath) };
assert(JSON.stringify(after) === JSON.stringify(before), 'Kneeboard output changed across identical builds.');

console.log('Kneeboard validation passed: deterministic page, mapping labels, dimensions, and offline PTO2 asset verified.');
