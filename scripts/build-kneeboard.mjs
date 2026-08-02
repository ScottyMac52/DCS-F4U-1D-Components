import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { resolvePackageVersion } from './version.mjs';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const assetDir = join(root, 'kneeboard', 'assets', 'source');
const svgDir = join(root, 'kneeboard', 'source');
const pngDir = join(root, 'kneeboard', 'F4U-1D');
const version = resolvePackageVersion(process.env.PACKAGE_VERSION);
const pageName = '01-WINCTRL-PTO2';

mkdirSync(svgDir, { recursive: true });
mkdirSync(pngDir, { recursive: true });

const esc = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function wrap(text, max = 25) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    if (!line) line = word;
    else if ((line + ' ' + word).length <= max) line += ' ' + word;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function imageDataUri(path) {
  return 'data:image/png;base64,' + readFileSync(path).toString('base64');
}

const callouts = [
  { button: 35, text: 'Landing gear UP', side: 'left', anchor: [418, 536], color: '#ffc95c' },
  { button: 37, text: 'Landing gear DOWN', side: 'left', anchor: [418, 536], color: '#ffc95c' },
  { button: 32, text: 'Arresting hook UP', side: 'left', anchor: [740, 623], color: '#46d8ff' },
  { button: 33, text: 'Arresting hook PARKING', side: 'left', anchor: [740, 623], color: '#46d8ff' },
  { button: 34, text: 'Arresting hook DOWN', side: 'left', anchor: [740, 623], color: '#46d8ff' },
  { button: 28, text: 'Wings FOLD', side: 'right', anchor: [782, 795], color: '#ff8f66' },
  { button: 29, text: 'Wings HOLD / stop', side: 'right', anchor: [782, 795], color: '#ff8f66' },
  { button: 30, text: 'Wings SPREAD', side: 'right', anchor: [782, 795], color: '#ff8f66' },
  { button: 31, text: 'Wing hinge-pin LOCK toggle', side: 'right', anchor: [782, 795], color: '#ff6b76' },
];

function markerGroups() {
  const groups = new Map();
  for (const entry of callouts) {
    const key = entry.anchor.join(',');
    const group = groups.get(key) ?? { anchor: entry.anchor, buttons: [], color: entry.color };
    group.buttons.push(entry.button);
    groups.set(key, group);
  }
  return [...groups.values()];
}

function calloutCards(side) {
  const entries = callouts.filter((entry) => entry.side === side);
  const x = side === 'left' ? 38 : 842;
  const cardWidth = 320;
  const startY = 190;
  const spacing = 197;
  let body = '';

  entries.forEach((entry, index) => {
    const y = startY + index * spacing;
    const edgeX = side === 'left' ? x + cardWidth : x;
    const lines = wrap(entry.text);
    body += '<path d="M ' + edgeX + ' ' + (y + 55) + ' L ' + entry.anchor[0] + ' ' + entry.anchor[1] + '" fill="none" stroke="' + entry.color + '" stroke-width="2.5" opacity="0.72"/>';
    body += '<rect x="' + x + '" y="' + y + '" width="' + cardWidth + '" height="110" rx="13" fill="#101f33" stroke="' + entry.color + '" stroke-width="2"/>';
    body += '<rect x="' + (x + 12) + '" y="' + (y + 17) + '" width="96" height="76" rx="9" fill="#06101d" stroke="' + entry.color + '" stroke-width="2"/>';
    body += '<text x="' + (x + 60) + '" y="' + (y + 55) + '" text-anchor="middle" dominant-baseline="middle" font-size="18" font-weight="800" fill="' + entry.color + '">BTN ' + entry.button + '</text>';
    const firstY = y + 47 - ((lines.length - 1) * 12);
    lines.forEach((line, lineIndex) => {
      body += '<text x="' + (x + 122) + '" y="' + (firstY + lineIndex * 24) + '" font-size="18" font-weight="650" fill="#f2f7ff">' + esc(line) + '</text>';
    });
  });

  return body;
}

const image = imageDataUri(join(assetDir, 'pto2-clean.png'));
let body = '';
body += '<rect width="1200" height="1600" fill="#071220"/>';
body += '<rect width="1200" height="16" fill="#46d8ff"/>';
body += '<text x="54" y="82" font-family="DejaVu Sans,Arial,sans-serif" font-size="43" font-weight="800" fill="#f5f9ff">WINCTRL CARRIERACE PTO2</text>';
body += '<text x="56" y="126" font-family="DejaVu Sans,Arial,sans-serif" font-size="20" font-weight="700" letter-spacing="1.2" fill="#ffc95c">F4U-1D CARRIER AND GROUND-HANDLING CONTROLS</text>';
body += '<line x1="54" y1="156" x2="1146" y2="156" stroke="#263a52" stroke-width="3"/>';
body += '<g font-family="DejaVu Sans,Arial,sans-serif">';
body += '<rect x="225" y="390" width="750" height="565" rx="28" fill="#0a1726" stroke="#1b334a" stroke-width="3"/>';
body += '<image x="250" y="420" width="700" height="489" href="' + image + '" preserveAspectRatio="xMidYMid meet" opacity="0.82"/>';
body += calloutCards('left');
body += calloutCards('right');

for (const marker of markerGroups()) {
  const label = marker.buttons.join('/');
  const width = Math.max(48, label.length * 10 + 18);
  body += '<rect x="' + (marker.anchor[0] - width / 2) + '" y="' + (marker.anchor[1] - 18) + '" width="' + width + '" height="36" rx="10" fill="#06101d" stroke="' + marker.color + '" stroke-width="2"/>';
  body += '<text x="' + marker.anchor[0] + '" y="' + marker.anchor[1] + '" text-anchor="middle" dominant-baseline="middle" font-size="13" font-weight="800" fill="' + marker.color + '">' + label + '</text>';
}

body += '<rect x="54" y="1215" width="1092" height="220" rx="16" fill="#101f33" stroke="#ff6b76" stroke-width="2"/>';
body += '<text x="78" y="1262" font-size="20" font-weight="800" fill="#ff6b76">INTENTIONAL SCOPE</text>';
body += '<text x="78" y="1305" font-size="19" font-weight="600" fill="#f2f7ff">Wing movement and the hinge-pin lock are separate commands.</text>';
body += '<text x="78" y="1343" font-size="19" font-weight="600" fill="#f2f7ff">The hook center position uses DCS native PARKING.</text>';
body += '<text x="78" y="1381" font-size="19" font-weight="600" fill="#f2f7ff">All other PTO2 controls are intentionally unbound.</text>';
body += '</g>';
body += '<line x1="54" y1="1518" x2="1146" y2="1518" stroke="#263a52" stroke-width="2"/>';
body += '<text x="54" y="1560" font-family="DejaVu Sans,Arial,sans-serif" font-size="18" fill="#8ea5bd">F4U-1D Corsair • Scott&#39;s cockpit • Package ' + esc(version) + '</text>';
body += '<text x="1146" y="1560" text-anchor="end" font-family="DejaVu Sans,Arial,sans-serif" font-size="18" fill="#8ea5bd">1 / 1</text>';

const svg = '<?xml version="1.0" encoding="UTF-8"?>' +
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">' +
  body +
  '</svg>';

const svgPath = join(svgDir, pageName + '.svg');
const pngPath = join(pngDir, pageName + '.png');
writeFileSync(svgPath, svg, 'utf8');
await sharp(Buffer.from(svg)).png({ compressionLevel: 9, adaptiveFiltering: false }).toFile(pngPath);
console.log('Generated ' + pageName + '.svg and ' + pageName + '.png for package ' + version + '.');
