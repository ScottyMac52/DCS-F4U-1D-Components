import { mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
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

mkdirSync(svgDir, { recursive: true });
mkdirSync(pngDir, { recursive: true });
for (const name of readdirSync(svgDir)) {
  if (name.endsWith('.svg')) unlinkSync(join(svgDir, name));
}
for (const name of readdirSync(pngDir)) {
  if (name.endsWith('.png')) unlinkSync(join(pngDir, name));
}

const esc = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function wrap(text, max = 24) {
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

const colors = {
  cyan: '#46d8ff',
  gold: '#ffc95c',
  orange: '#ff8f66',
  red: '#ff6b76',
  green: '#6ce5a3',
};

const callout = (button, text, side, anchor, color) => ({
  button,
  text,
  side,
  anchor,
  color: colors[color],
});

const pages = [
  {
    file: '01-WINCTRL-PTO2-AIRFRAME',
    title: 'WINCTRL CARRIERACE PTO2',
    kicker: 'F4U-1D AIRFRAME, CARRIER AND GROUND CONTROLS',
    callouts: [
      callout(5, 'Flaps increase', 'left', [525, 550], 'green'),
      callout(7, 'Flaps decrease', 'left', [525, 550], 'green'),
      callout(8, 'Approach light ON', 'left', [490, 620], 'cyan'),
      callout(9, 'Approach light OFF', 'left', [490, 620], 'cyan'),
      callout(10, 'Airbrake UP', 'left', [535, 635], 'cyan'),
      callout(11, 'Airbrake DOWN', 'left', [535, 635], 'cyan'),
      callout(35, 'Landing gear UP', 'left', [420, 540], 'gold'),
      callout(37, 'Landing gear DOWN', 'left', [420, 540], 'gold'),
      callout(28, 'Wings FOLD', 'right', [780, 790], 'orange'),
      callout(29, 'Wings HOLD / stop', 'right', [780, 790], 'orange'),
      callout(30, 'Wings SPREAD', 'right', [780, 790], 'orange'),
      callout(31, 'Wing hinge-pin lock toggle', 'right', [780, 790], 'red'),
      callout(32, 'Arresting hook UP', 'right', [740, 585], 'cyan'),
      callout(33, 'Arresting hook PARKING', 'right', [740, 585], 'cyan'),
      callout(34, 'Arresting hook DOWN', 'right', [740, 585], 'cyan'),
      callout(38, 'Parking brake OFF', 'right', [680, 720], 'gold'),
      callout(39, 'Parking brake ON', 'right', [680, 720], 'gold'),
    ],
    notes: [
      'Wing movement and hinge-pin locking remain independent.',
      'The hook center position uses the native DCS PARKING command.',
    ],
  },
  {
    file: '02-WINCTRL-PTO2-STORES',
    title: 'WINCTRL CARRIERACE PTO2',
    kicker: 'F4U-1D STORES SELECTION AND EMERGENCY RELEASE',
    callouts: [
      callout(17, 'Drop-tank lock ATTACH', 'left', [625, 620], 'green'),
      callout(19, 'Drop-tank lock LOCK', 'left', [625, 620], 'green'),
      callout(22, 'Drop-tank lock RELEASE', 'left', [625, 620], 'green'),
      callout(23, 'Pylon release selector ON', 'left', [720, 700], 'cyan'),
      callout(24, 'Left-wing selector ON', 'left', [720, 700], 'cyan'),
      callout(25, 'Right-wing selector ON', 'left', [720, 700], 'cyan'),
      callout(26, 'Left-wing EMERGENCY RELEASE', 'right', [615, 705], 'red'),
      callout(27, 'Right-wing EMERGENCY RELEASE', 'right', [615, 705], 'red'),
    ],
    notes: [
      'These are the native stores commands in Scott\'s current export.',
      'Use emergency release deliberately and verify with a safe training loadout.',
    ],
  },
];

function markerGroups(callouts) {
  const groups = new Map();
  for (const entry of callouts) {
    const key = entry.anchor.join(',');
    const group = groups.get(key) ?? { anchor: entry.anchor, buttons: [], color: entry.color };
    group.buttons.push(entry.button);
    groups.set(key, group);
  }
  return [...groups.values()];
}

function calloutCards(page, side) {
  const entries = page.callouts.filter((entry) => entry.side === side);
  const x = side === 'left' ? 30 : 840;
  const cardWidth = 330;
  const top = 174;
  const bottom = 1192;
  const spacing = (bottom - top) / entries.length;
  const cardHeight = Math.min(92, spacing - 8);
  let body = '';

  entries.forEach((entry, index) => {
    const y = top + index * spacing + (spacing - cardHeight) / 2;
    const edgeX = side === 'left' ? x + cardWidth : x;
    const lines = wrap(entry.text);
    body += '<path d="M ' + edgeX + ' ' + (y + cardHeight / 2) + ' L ' + entry.anchor[0] + ' ' + entry.anchor[1] + '" fill="none" stroke="' + entry.color + '" stroke-width="2.2" opacity="0.68"/>';
    body += '<rect x="' + x + '" y="' + y + '" width="' + cardWidth + '" height="' + cardHeight + '" rx="12" fill="#101f33" stroke="' + entry.color + '" stroke-width="2"/>';
    body += '<rect x="' + (x + 10) + '" y="' + (y + 10) + '" width="92" height="' + (cardHeight - 20) + '" rx="8" fill="#06101d" stroke="' + entry.color + '" stroke-width="1.8"/>';
    body += '<text x="' + (x + 56) + '" y="' + (y + cardHeight / 2) + '" text-anchor="middle" dominant-baseline="middle" font-size="16" font-weight="800" fill="' + entry.color + '">BTN ' + entry.button + '</text>';
    const firstY = y + cardHeight / 2 + 5 - ((lines.length - 1) * 10);
    lines.forEach((line, lineIndex) => {
      body += '<text x="' + (x + 116) + '" y="' + (firstY + lineIndex * 20) + '" font-size="15" font-weight="650" fill="#f2f7ff">' + esc(line) + '</text>';
    });
  });

  return body;
}

function renderPage(page, index) {
  const image = imageDataUri(join(assetDir, 'pto2-clean.png'));
  let body = '';
  body += '<rect width="1200" height="1600" fill="#071220"/>';
  body += '<rect width="1200" height="16" fill="#46d8ff"/>';
  body += '<text x="54" y="82" font-family="DejaVu Sans,Arial,sans-serif" font-size="43" font-weight="800" fill="#f5f9ff">' + esc(page.title) + '</text>';
  body += '<text x="56" y="126" font-family="DejaVu Sans,Arial,sans-serif" font-size="20" font-weight="700" letter-spacing="1.2" fill="#ffc95c">' + esc(page.kicker) + '</text>';
  body += '<line x1="54" y1="156" x2="1146" y2="156" stroke="#263a52" stroke-width="3"/>';
  body += '<g font-family="DejaVu Sans,Arial,sans-serif">';
  body += '<rect x="225" y="360" width="750" height="610" rx="28" fill="#0a1726" stroke="#1b334a" stroke-width="3"/>';
  body += '<image x="255" y="420" width="690" height="482" href="' + image + '" preserveAspectRatio="xMidYMid meet" opacity="0.82"/>';
  body += calloutCards(page, 'left');
  body += calloutCards(page, 'right');

  for (const marker of markerGroups(page.callouts)) {
    const label = marker.buttons.join('/');
    const width = Math.max(48, label.length * 9 + 18);
    body += '<rect x="' + (marker.anchor[0] - width / 2) + '" y="' + (marker.anchor[1] - 17) + '" width="' + width + '" height="34" rx="9" fill="#06101d" stroke="' + marker.color + '" stroke-width="2"/>';
    body += '<text x="' + marker.anchor[0] + '" y="' + marker.anchor[1] + '" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="800" fill="' + marker.color + '">' + label + '</text>';
  }

  body += '<rect x="54" y="1230" width="1092" height="205" rx="16" fill="#101f33" stroke="#ff6b76" stroke-width="2"/>';
  body += '<text x="78" y="1276" font-size="20" font-weight="800" fill="#ff6b76">OPERATIONAL NOTES</text>';
  page.notes.forEach((note, noteIndex) => {
    body += '<text x="78" y="' + (1320 + noteIndex * 42) + '" font-size="18" font-weight="600" fill="#f2f7ff">' + esc(note) + '</text>';
  });
  body += '</g>';
  body += '<line x1="54" y1="1518" x2="1146" y2="1518" stroke="#263a52" stroke-width="2"/>';
  body += '<text x="54" y="1560" font-family="DejaVu Sans,Arial,sans-serif" font-size="18" fill="#8ea5bd">F4U-1D Corsair • Scott&#39;s cockpit • Package ' + esc(version) + '</text>';
  body += '<text x="1146" y="1560" text-anchor="end" font-family="DejaVu Sans,Arial,sans-serif" font-size="18" fill="#8ea5bd">' + (index + 1) + ' / ' + pages.length + '</text>';

  return '<?xml version="1.0" encoding="UTF-8"?>' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">' +
    body +
    '</svg>';
}

for (const [index, page] of pages.entries()) {
  const svg = renderPage(page, index);
  const svgPath = join(svgDir, page.file + '.svg');
  const pngPath = join(pngDir, page.file + '.png');
  writeFileSync(svgPath, svg, 'utf8');
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9, adaptiveFiltering: false }).toFile(pngPath);
}

console.log('Generated ' + pages.length + ' PTO2 OpenKneeboard pages for package ' + version + '.');
