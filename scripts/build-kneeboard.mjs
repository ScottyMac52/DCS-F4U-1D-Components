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
  .replaceAll('&', '&')
  .replaceAll('<', '<')
  .replaceAll('>', '>')
  .replaceAll('"', '"');

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
      callout(29, 'Wings SPREAD', 'right', [780, 790], 'orange'),
      callout(30, 'Hook UP', 'right', [720, 720], 'cyan'),
      callout(31, 'Hook DOWN', 'right', [720, 720], 'cyan'),
      callout(32, 'Parking brake ON', 'right', [680, 850], 'red'),
      callout(33, 'Parking brake OFF', 'right', [680, 850], 'red'),
      callout(36, 'Canopy OPEN', 'right', [650, 480], 'gold'),
      callout(38, 'Canopy CLOSE', 'right', [650, 480], 'gold'),
    ],
  },
  {
    file: '02-WINCTRL-PTO2-STORES',
    title: 'WINCTRL CARRIERACE PTO2',
    kicker: 'F4U-1D STORES, EMERGENCY AND LIGHTING CONTROLS',
    callouts: [
      callout(1, 'Bomb bay doors', 'left', [480, 520], 'gold'),
      callout(2, 'Emergency release', 'left', [520, 580], 'red'),
      callout(3, 'Stores jettison', 'left', [560, 640], 'red'),
      callout(4, 'Master arm', 'left', [600, 700], 'orange'),
      callout(12, 'Nav lights', 'right', [700, 500], 'cyan'),
      callout(13, 'Formation lights', 'right', [740, 560], 'cyan'),
      callout(14, 'Landing light', 'right', [780, 620], 'gold'),
      callout(15, 'Cockpit lights', 'right', [720, 700], 'gold'),
    ],
  },
  {
    file: '03-LOGITECH-DUAL-QUADRANTS',
    kind: 'quadrants',
    title: 'DUAL LOGITECH THROTTLE QUADRANTS',
    kicker: 'F4U-1D ENGINE, POWER AND SUPERCHARGER CONTROLS',
  },
  {
    file: '04-VKB-F14-GRIP',
    kind: 'vkb-f14',
    title: 'VKB GUNFIGHTER • F-14 GRIP',
    kicker: 'F4U-1D TRIM AND WEAPONS CONTROLS',
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
  body += '<text x="56" y="126" font-family="DejaVu Sans,Arial,sans-serif" font-size="20" font-weight="700" fill="#ffc95c">' + esc(page.kicker) + '</text>';
  body += '<line x1="54" y1="156" x2="1146" y2="156" stroke="#263a52" stroke-width="3"/>';
  body += '<g font-family="DejaVu Sans,Arial,sans-serif">';
  body += '<image x="320" y="200" width="560" height="980" href="' + image + '" preserveAspectRatio="xMidYMid meet"/>';
  for (const marker of markerGroups(page.callouts)) {
    const label = marker.buttons.join('/');
    const width = Math.max(48, label.length * 9 + 18);
    body += '<rect x="' + (marker.anchor[0] - width / 2) + '" y="' + (marker.anchor[1] - 17) + '" width="' + width + '" height="34" rx="9" fill="#06101d" stroke="' + marker.color + '" stroke-width="2"/>';
    body += '<text x="' + marker.anchor[0] + '" y="' + marker.anchor[1] + '" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="800" fill="' + marker.color + '">' + label + '</text>';
  }
  body += calloutCards(page, 'left');
  body += calloutCards(page, 'right');
  body += '</g>';
  body += '<line x1="54" y1="1518" x2="1146" y2="1518" stroke="#263a52" stroke-width="2"/>';
  body += '<text x="54" y="1560" font-family="DejaVu Sans,Arial,sans-serif" font-size="18" fill="#8ea5bd">F4U-1D Corsair • Scott\'s cockpit • Package ' + version + '</text>';
  body += '<text x="1146" y="1560" text-anchor="end" font-family="DejaVu Sans,Arial,sans-serif" font-size="18" fill="#8ea5bd">' + (index + 1) + ' / ' + pages.length + '</text>';
  return '<?xml version="1.0" encoding="UTF-8"?>' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">' +
    body +
    '</svg>';
}

function renderQuadrantPage(page, index) {
  const quadrant = imageDataUri(join(assetDir, 'logitech-flight-throttle-quadrant.png'));
  const text = (x, y, value, size = 18, color = '#f2f7ff', weight = 650, anchor = 'start') =>
    '<text x="' + x + '" y="' + y + '" text-anchor="' + anchor + '" font-size="' + size + '" font-weight="' + weight + '" fill="' + color + '">' + esc(value) + '</text>';
  const card = (x, y, width, height, color, heading, lines) => {
    let body = '<rect x="' + x + '" y="' + y + '" width="' + width + '" height="' + height + '" rx="14" fill="#101f33" stroke="' + color + '" stroke-width="2"/>';
    body += text(x + 20, y + 34, heading, 18, color, 800);
    lines.forEach((line, lineIndex) => {
      body += text(x + 20, y + 70 + lineIndex * 30, line, 16, '#f2f7ff', 650);
    });
    return body;
  };

  let body = '';
  body += '<rect width="1200" height="1600" fill="#071220"/>';
  body += '<rect width="1200" height="16" fill="#46d8ff"/>';
  body += text(54, 82, page.title, 39, '#f5f9ff', 800);
  body += text(56, 126, page.kicker, 20, '#ffc95c', 700);
  body += '<line x1="54" y1="156" x2="1146" y2="156" stroke="#263a52" stroke-width="3"/>';
  body += '<g font-family="DejaVu Sans,Arial,sans-serif">';

  body += '<rect x="40" y="182" width="545" height="615" rx="22" fill="#0a1726" stroke="#46d8ff" stroke-width="3"/>';
  body += text(68, 225, 'PRIMARY QUADRANT', 24, '#46d8ff', 800);
  body += text(557, 225, 'GUID …840BBBD0', 14, '#8ea5bd', 700, 'end');
  body += '<image x="86" y="242" width="455" height="335" href="' + quadrant + '" preserveAspectRatio="xMidYMid meet"/>';
  body += card(68, 585, 489, 188, '#6ce5a3', 'AXES — INBOARD TO OUTBOARD', [
    'Mixture • JOY_Z',
    'Propeller RPM • JOY_Y • INVERTED',
    'Throttle • JOY_X',
  ]);

  body += '<rect x="615" y="182" width="545" height="615" rx="22" fill="#0a1726" stroke="#ffc95c" stroke-width="3"/>';
  body += text(643, 225, 'SECONDARY QUADRANT', 24, '#ffc95c', 800);
  body += text(1132, 225, 'GUID …1C8A8840', 14, '#8ea5bd', 700, 'end');
  body += '<image x="661" y="242" width="455" height="335" href="' + quadrant + '" preserveAspectRatio="xMidYMid meet"/>';
  body += card(643, 585, 489, 188, '#ffc95c', 'AXES — INBOARD TO OUTBOARD', [
    'Supercharger • JOY_Z',
    'JOY_X / JOY_Y intentionally unbound',
    'All six rocker inputs intentionally unbound',
  ]);

  body += '<rect x="54" y="833" width="1092" height="420" rx="18" fill="#101f33" stroke="#ff8f66" stroke-width="2"/>';
  body += text(82, 878, 'PRIMARY ROCKER SWITCHES', 23, '#ff8f66', 800);
  body += text(82, 912, 'Native discrete commands from Scott\'s current export — no macros', 16, '#8ea5bd', 650);
  body += card(82, 946, 320, 250, '#46d8ff', 'LEFT ROCKER', [
    'T1 / BTN 1',
    'Battery ON',
    '',
    'T2 / BTN 2',
    'Battery OFF',
  ]);
  body += card(440, 946, 320, 250, '#ffc95c', 'CENTER ROCKER', [
    'T3 / BTN 3',
    'Fuel pump ON',
    '',
    'T4 / BTN 4',
    'Fuel pump OFF',
  ]);
  body += card(798, 946, 320, 250, '#6ce5a3', 'RIGHT ROCKER', [
    'T5 / BTN 5',
    'Water injection ON',
    '',
    'T6 / BTN 6',
    'Water injection OFF',
  ]);
  body += '</g>';
  body += '<line x1="54" y1="1518" x2="1146" y2="1518" stroke="#263a52" stroke-width="2"/>';
  body += text(54, 1560, 'F4U-1D Corsair • Scott\'s cockpit • Package ' + version, 18, '#8ea5bd', 400);
  body += text(1146, 1560, (index + 1) + ' / ' + pages.length, 18, '#8ea5bd', 400, 'end');

  return '<?xml version="1.0" encoding="UTF-8"?>' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">' +
    body +
    '</svg>';
}

function renderVkbF14Page(page, index) {
  const grip = imageDataUri(join(assetDir, 'vkb-f14-grip-photo-clean.png'));
  const text = (x, y, value, size = 18, color = '#f2f7ff', weight = 650, anchor = 'start') =>
    '<text x="' + x + '" y="' + y + '" text-anchor="' + anchor + '" font-size="' + size + '" font-weight="' + weight + '" fill="' + color + '">' + esc(value) + '</text>';
  const card = (x, y, width, height, color, heading, lines) => {
    let body = '<rect x="' + x + '" y="' + y + '" width="' + width + '" height="' + height + '" rx="14" fill="#101f33" stroke="' + color + '" stroke-width="2"/>';
    body += text(x + 20, y + 34, heading, 18, color, 800);
    lines.forEach((line, lineIndex) => {
      body += text(x + 20, y + 68 + lineIndex * 29, line, 16, '#f2f7ff', 650);
    });
    return body;
  };
  const pointer = (fromX, fromY, toX, toY, color) =>
    '<path d="M ' + fromX + ' ' + fromY + ' L ' + toX + ' ' + toY + '" fill="none" stroke="' + color + '" stroke-width="2.5" opacity="0.9"/>';
  const marker = (ax, ay, label, color) => {
    const width = Math.max(48, label.length * 9 + 18);
    let body = '<rect x="' + (ax - width / 2) + '" y="' + (ay - 17) + '" width="' + width + '" height="34" rx="9" fill="#06101d" stroke="' + color + '" stroke-width="2"/>';
    body += text(ax, ay, label, 12, color, 800, 'middle');
    return body;
  };

  // Physical control locations on the upright F-14 grip photo
  // (image box: x=92..486, y=270..1056). Calibrated against the cleaned
  // product photo so leader lines hit the trigger, store-release (red),
  // modifier region, and four-way trim HAT — matching the F-14B(U)
  // kneeboard convention.
  const anchors = {
    trigger: [268, 760],   // main trigger face, lower grip
    store: [402, 348],     // red store-release button, top-right of head
    modifier: [195, 395],  // BTN 7 region on left side of head
    trimHat: [295, 332],   // four-way trim HAT, top center of head
  };

  let body = '';
  body += '<rect width="1200" height="1600" fill="#071220"/>';
  body += '<rect width="1200" height="16" fill="#46d8ff"/>';
  body += text(54, 82, page.title, 42, '#f5f9ff', 800);
  body += text(56, 126, page.kicker, 20, '#ffc95c', 700);
  body += '<line x1="54" y1="156" x2="1146" y2="156" stroke="#263a52" stroke-width="3"/>';
  body += '<g font-family="DejaVu Sans,Arial,sans-serif">';

  body += '<rect x="54" y="190" width="470" height="965" rx="22" fill="#0a1726" stroke="#46d8ff" stroke-width="3"/>';
  body += text(289, 238, 'SEPARATE VKB BLACKBOX DEVICE', 19, '#46d8ff', 800, 'middle');
  body += '<image x="92" y="270" width="394" height="786" href="' + grip + '" preserveAspectRatio="xMidYMid meet"/>';
  body += text(289, 1105, 'MOZA AB9 owns X / Y axes and FFB', 17, '#8ea5bd', 700, 'middle');

  body += pointer(558, 256, anchors.trigger[0], anchors.trigger[1], '#ff6b76');
  body += pointer(558, 408, anchors.store[0], anchors.store[1], '#ffc95c');
  body += pointer(558, 573, anchors.modifier[0], anchors.modifier[1], '#ff8f66');
  body += pointer(558, 750, anchors.trimHat[0], anchors.trimHat[1], '#6ce5a3');
  body += pointer(868, 750, anchors.trimHat[0], anchors.trimHat[1], '#6ce5a3');
  body += pointer(558, 926, anchors.trimHat[0], anchors.trimHat[1], '#46d8ff');
  body += pointer(868, 926, anchors.trimHat[0], anchors.trimHat[1], '#46d8ff');

  body += marker(anchors.trigger[0], anchors.trigger[1], '1', '#ff6b76');
  body += marker(anchors.store[0], anchors.store[1], '3', '#ffc95c');
  body += marker(anchors.modifier[0], anchors.modifier[1], '7', '#ff8f66');
  body += marker(anchors.trimHat[0], anchors.trimHat[1], '9/10/11/12', '#6ce5a3');

  body += card(558, 190, 588, 132, '#ff6b76', 'BTN 1', [
    'Guns fire',
  ]);
  body += card(558, 342, 588, 132, '#ffc95c', 'BTN 3', [
    'Bomb release',
  ]);
  body += card(558, 494, 588, 158, '#ff8f66', 'BTN 7 + BTN 3', [
    'Rockets fire',
    'Hold the existing global DCS modifier',
  ]);
  body += card(558, 672, 278, 156, '#6ce5a3', 'BTN 9', [
    'Trim nose up',
  ]);
  body += card(868, 672, 278, 156, '#6ce5a3', 'BTN 12', [
    'Trim nose down',
  ]);
  body += card(558, 848, 278, 156, '#46d8ff', 'BTN 10', [
    'Trim left bank',
  ]);
  body += card(868, 848, 278, 156, '#46d8ff', 'BTN 11', [
    'Trim right bank',
  ]);
  body += card(558, 1024, 588, 131, '#8ea5bd', 'DLC / SURPLUS INPUTS', [
    'Intentionally unbound for the Corsair',
  ]);

  body += '<rect x="54" y="1192" width="1092" height="243" rx="16" fill="#101f33" stroke="#ff6b76" stroke-width="2"/>';
  body += text(78, 1238, 'BTN 13–16', 20, '#ff6b76', 800);
  body += text(78, 1281, 'Weapon selector intentionally unbound', 19, '#f2f7ff', 700);
  body += text(78, 1322, 'No verified reliable direct F4U-1D selector commands are available.', 17, '#f2f7ff', 650);
  body += text(78, 1363, 'Use the cockpit armament controls; do not map maintained positions to momentary commands.', 17, '#f2f7ff', 650);
  body += text(78, 1404, 'BTN 5, BTN 6 and JOY_RX also remain unused.', 17, '#8ea5bd', 650);
  body += '</g>';
  body += '<line x1="54" y1="1518" x2="1146" y2="1518" stroke="#263a52" stroke-width="2"/>';
  body += text(54, 1560, 'F4U-1D Corsair • Scott\'s cockpit • Package ' + version, 18, '#8ea5bd', 400);
  body += text(1146, 1560, (index + 1) + ' / ' + pages.length, 18, '#8ea5bd', 400, 'end');

  return '<?xml version="1.0" encoding="UTF-8"?>' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">' +
    body +
    '</svg>';
}

for (const [index, page] of pages.entries()) {
  const svg = page.kind === 'quadrants'
    ? renderQuadrantPage(page, index)
    : page.kind === 'vkb-f14'
      ? renderVkbF14Page(page, index)
      : renderPage(page, index);
  const svgPath = join(svgDir, page.file + '.svg');
  const pngPath = join(pngDir, page.file + '.png');
  writeFileSync(svgPath, svg, 'utf8');
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9, adaptiveFiltering: false }).toFile(pngPath);
}

console.log('Generated ' + pages.length + ' F4U-1D OpenKneeboard pages for package ' + version + '.');
