import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const profileDir = join(root, 'src', 'Config', 'Input', 'F4U-1D', 'joystick');
const expectedFile = 'WINCTRL CarrierAce PTO 2 {19B7D090-6120-11F0-8001-444553540000}.diff.lua';
const files = readdirSync(profileDir).filter((name) => name.endsWith('.diff.lua'));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^$()|[\]\\]/g, '\\$&');
}

assert(files.length === 1, 'Expected exactly one F4U-1D joystick profile.');
assert(files[0] === expectedFile, 'The PTO2 profile filename or GUID does not match Scott\'s export.');
const lua = readFileSync(join(profileDir, expectedFile), 'utf8');

const expected = [
  ['d3530pnilunilcd7vd1vpnilvunil', 'JOY_BTN28', 'Wings fold, fold'],
  ['d3530pnilunilcd7vd0.5vpnilvunil', 'JOY_BTN29', 'Wings fold, stop'],
  ['d3530pnilunilcd7vd0vpnilvunil', 'JOY_BTN30', 'Wings fold, spread'],
  ['d3535pnilunilcd7vd-1vpnilvunil', 'JOY_BTN31', 'Wings lock toggle'],
  ['d3532pnilunilcd7vd1vpnilvunil', 'JOY_BTN32', 'Hook, up'],
  ['d3532pnilunilcd7vd0vpnilvunil', 'JOY_BTN33', 'Hook, parking'],
  ['d3532pnilunilcd7vd-1vpnilvunil', 'JOY_BTN34', 'Hook, down'],
  ['d3533pnilunilcd7vd0vpnilvunil', 'JOY_BTN35', 'Gears, up'],
  ['d3533pnilunilcd7vd1vpnilvunil', 'JOY_BTN37', 'Gears, down'],
];

const assignedButtons = [...lua.matchAll(/\["key"\]\s*=\s*"(JOY_BTN\d+)"/g)].map((match) => match[1]);
assert(assignedButtons.length === expected.length, 'PTO2 must contain exactly nine assignments.');
assert(new Set(assignedButtons).size === expected.length, 'PTO2 assignments must use unique buttons.');
assert(
  JSON.stringify([...assignedButtons].sort()) === JSON.stringify(expected.map((entry) => entry[1]).sort()),
  'PTO2 contains an unexpected or missing button.',
);

for (const [command, button, name] of expected) {
  const pattern = new RegExp(
    '\\["' + escapeRegex(command) + '"\\][\\s\\S]*?' +
    '\\["key"\\]\\s*=\\s*"' + button + '"[\\s\\S]*?' +
    '\\["name"\\]\\s*=\\s*"' + escapeRegex(name) + '"',
  );
  assert(pattern.test(lua), 'Invalid PTO2 binding: ' + name);
}

for (const forbidden of [
  'Flaps',
  'Airbrake',
  'Approach light',
  'Droppable tank',
  'release selector',
  'emergency release',
  'Parking brake',
]) {
  assert(!lua.includes(forbidden), 'Out-of-scope PTO2 assignment found: ' + forbidden);
}

console.log('WINCTRL PTO2 profile validation passed: nine verified native F4U-1D bindings and no out-of-scope assignments.');
