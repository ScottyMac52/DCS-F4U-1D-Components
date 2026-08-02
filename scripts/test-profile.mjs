import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const profileDir = join(root, 'src', 'Config', 'Input', 'F4U-1D', 'joystick');
const controlMappings = readFileSync(join(root, 'docs', 'CONTROL-MAPPINGS.md'), 'utf8');
const pto2File = 'WINCTRL CarrierAce PTO 2 {19B7D090-6120-11F0-8001-444553540000}.diff.lua';
const primaryFile = 'Logitech Flight Quadrant {840BBBD0-2139-11f1-8001-444553540000}.diff.lua';
const secondaryFile = 'Logitech Flight Quadrant {1C8A8840-5386-11F1-8001-444553540000}.diff.lua';
const expectedFiles = [primaryFile, secondaryFile, pto2File].sort();
const files = readdirSync(profileDir).filter((name) => name.endsWith('.diff.lua')).sort();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^$()|[\]\\]/g, '\\$&');
}

function assertBinding(lua, command, input, name, label) {
  const pattern = new RegExp(
    '\\\["' + escapeRegex(command) + '"\\\][\\s\\S]*?' +
    '\\\["key"\\\]\\s*=\\s*"' + escapeRegex(input) + '"[\\s\\S]*?' +
    '\\\["name"\\\]\\s*=\\s*"' + escapeRegex(name) + '"',
  );
  assert(pattern.test(lua), 'Invalid ' + label + ' binding: ' + name);
  assert(controlMappings.includes(input), 'Control-mapping documentation is missing ' + input + '.');
  assert(controlMappings.includes(command), 'Control-mapping documentation is missing command ' + command + '.');
  assert(controlMappings.includes(name), 'Control-mapping documentation is missing DCS name: ' + name);
}

assert(JSON.stringify(files) === JSON.stringify(expectedFiles), 'Unexpected or missing F4U-1D joystick profile.');
assert(!files.some((name) => name.startsWith('Saitek Pro Flight Quadrant')), 'Do not package the legacy Saitek alias for the primary quadrant GUID.');

const pto2 = readFileSync(join(profileDir, pto2File), 'utf8');
const expectedPto2 = [
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

const pto2Buttons = [...pto2.matchAll(/\["key"\]\s*=\s*"(JOY_BTN\d+)"/g)].map((match) => match[1]);
assert(pto2Buttons.length === expectedPto2.length, 'PTO2 must preserve all 25 exported assignments.');
assert(new Set(pto2Buttons).size === expectedPto2.length, 'PTO2 assignments must use unique buttons.');
for (const [command, button, name] of expectedPto2) assertBinding(pto2, command, button, name, 'PTO2');

const primary = readFileSync(join(profileDir, primaryFile), 'utf8');
const expectedPrimary = [
  ['a3230cd3', 'JOY_Z', 'Mixture handle'],
  ['a3224cd3', 'JOY_Y', 'Propeller governor handle'],
  ['a3236cd3', 'JOY_X', 'Throttle Lever'],
  ['d3003pnilunilcd1vd1vpnilvunil', 'JOY_BTN1', 'Battery, on'],
  ['d3003pnilunilcd1vd0vpnilvunil', 'JOY_BTN2', 'Battery, off'],
  ['d3228pnilunilcd3vd1vpnilvunil', 'JOY_BTN3', 'Fuel pump, on'],
  ['d3228pnilunilcd3vd0vpnilvunil', 'JOY_BTN4', 'Fuel pump, off'],
  ['d3244pnilunilcd3vd1vpnilvunil', 'JOY_BTN5', 'Enable water injection'],
  ['d3244pnilunilcd3vd0vpnilvunil', 'JOY_BTN6', 'Disable water injection'],
];
for (const binding of expectedPrimary) assertBinding(primary, ...binding, 'primary quadrant');
assert(primary.includes('["invert"] = true'), 'Primary propeller axis must preserve the exported inversion.');
assert((primary.match(/\["invert"\]\s*=\s*true/g) ?? []).length === 1, 'Only the exported primary propeller axis may be inverted.');

const secondary = readFileSync(join(profileDir, secondaryFile), 'utf8');
assertBinding(secondary, 'a3235cd3', 'JOY_Z', 'Supercharger handle', 'secondary quadrant');
assert(!secondary.includes('["keyDiffs"]'), 'The secondary quadrant buttons must remain unbound.');
assert(!/\["added"\][\s\S]*?\["key"\]\s*=\s*"JOY_[XY]"/.test(secondary), 'Secondary middle and outer axes must remain unbound.');
for (const [command, axis, name] of [
  ['a2001cdnil', 'JOY_Y', 'Pitch'],
  ['a2002cdnil', 'JOY_X', 'Roll'],
]) {
  const removal = new RegExp(
    '\\\["' + command + '"\\\][\\s\\S]*?\\\["name"\\\]\\s*=\\s*"' + name + '"[\\s\\S]*?' +
    '\\\["removed"\\\][\\s\\S]*?\\\["key"\\\]\\s*=\\s*"' + axis + '"',
  );
  assert(removal.test(secondary), 'Secondary ' + axis + ' must explicitly remove the accidental ' + name + ' auto-binding.');
}

console.log('Profile validation passed: PTO2 plus both GUID-qualified Logitech quadrant exports are complete and isolated.');
