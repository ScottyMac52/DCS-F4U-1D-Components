import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const profileDir = join(root, 'src', 'Config', 'Input', 'F4U-1D', 'joystick');
const controlMappings = readFileSync(join(root, 'docs', 'CONTROL-MAPPINGS.md'), 'utf8');
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
  ['d3512pnilunilcd7vd0.2vpnilvunil', 'JOY_BTN5', 'Flaps +'],
  ['d3512pnilunilcd7vd-0.2vpnilvunil', 'JOY_BTN7', 'Flaps -'],
  ['d3761pnilunilcd11vd1vpnilvunil', 'JOY_BTN8', 'Approach light On'],
  ['d3761pnilunilcd11vd-1vpnilvunil', 'JOY_BTN9', 'Approach light Off'],
  ['d3544pnilunilcd7vd0vpnilvunil', 'JOY_BTN10', 'Airbrake, up'],
  ['d3543pnilunilcd7vd-1vpnilvunil', 'JOY_BTN11', 'Airbrake, down'],
  ['d3932pnilunilcd13vd1vpnilvunil', 'JOY_BTN17', 'Droppable tank lock: attach'],
  ['d3932pnilunilcd13vd0.5vpnilvunil', 'JOY_BTN19', 'Droppable tank lock: lock'],
  ['d3932pnilunilcd13vd0vpnilvunil', 'JOY_BTN22', 'Droppable tank lock: release'],
  ['d3942pnilunilcd13vd1vpnilvunil', 'JOY_BTN23', 'Pylon, release selector ON'],
  ['d3940pnilunilcd13vd1vpnilvunil', 'JOY_BTN24', 'Left wing, release selector ON'],
  ['d3941pnilunilcd13vd1vpnilvunil', 'JOY_BTN25', 'Right wing, release selector ON'],
  ['d3947pnilunilcd13vd1vpnilvunil', 'JOY_BTN26', 'Left wing, emergency release ON'],
  ['d3948pnilunilcd13vd1vpnilvunil', 'JOY_BTN27', 'Right wing, emergency release ON'],
  ['d3530pnilunilcd7vd1vpnilvunil', 'JOY_BTN28', 'Wings fold, fold'],
  ['d3530pnilunilcd7vd0.5vpnilvunil', 'JOY_BTN29', 'Wings fold, stop'],
  ['d3530pnilunilcd7vd0vpnilvunil', 'JOY_BTN30', 'Wings fold, spread'],
  ['d3535pnilunilcd7vd-1vpnilvunil', 'JOY_BTN31', 'Wings lock toggle'],
  ['d3532pnilunilcd7vd1vpnilvunil', 'JOY_BTN32', 'Hook, up'],
  ['d3532pnilunilcd7vd0vpnilvunil', 'JOY_BTN33', 'Hook, parking'],
  ['d3532pnilunilcd7vd-1vpnilvunil', 'JOY_BTN34', 'Hook, down'],
  ['d3533pnilunilcd7vd0vpnilvunil', 'JOY_BTN35', 'Gears, up'],
  ['d3533pnilunilcd7vd1vpnilvunil', 'JOY_BTN37', 'Gears, down'],
  ['dnilp3542unilcd7vdnilvp0vunil', 'JOY_BTN38', 'Parking brake OFF'],
  ['dnilp3541unilcd7vdnilvp1vunil', 'JOY_BTN39', 'Parking brake ON'],
];

const assignedButtons = [...lua.matchAll(/\["key"\]\s*=\s*"(JOY_BTN\d+)"/g)].map((match) => match[1]);
assert(assignedButtons.length === expected.length, 'PTO2 must preserve all 25 exported assignments.');
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
  assert(controlMappings.includes(button), 'Control-mapping documentation is missing ' + button + '.');
  assert(controlMappings.includes(command), 'Control-mapping documentation is missing command ' + command + '.');
  assert(controlMappings.includes(name), 'Control-mapping documentation is missing DCS name: ' + name);
}

console.log('WINCTRL PTO2 profile validation passed: all 25 assignments from Scott\'s current F4U-1D export are preserved.');
