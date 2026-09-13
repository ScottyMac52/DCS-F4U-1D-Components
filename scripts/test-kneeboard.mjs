import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('build:kneeboard produces source SVG and PNG folders', () => {
  const result = spawnSync('npm', ['run', 'build:kneeboard'], {
    cwd: root,
    encoding: 'utf8',
    shell: true,
    env: process.env,
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.ok(existsSync(join(root, 'kneeboard', 'source')));
  const pngRoot = join(root, 'kneeboard');
  const dirs = readdirSync(pngRoot).filter((name) => name !== 'source');
  assert.ok(dirs.length >= 1, 'expected a kneeboard PNG folder');
});

test('summary pages reflect the active F4U hardware without the Warthog throttle', () => {
  const config = JSON.parse(readFileSync(join(root, 'config', 'kneeboard.json'), 'utf8'));
  const summaryText = JSON.stringify(config.summaryPages);

  assert.equal(config.summaryPages.length, 2);
  assert.match(summaryText, /F4U-1D USED DEVICES/);
  assert.match(summaryText, /VAICOM PRO \+ VIPER TQS PTT/);
  assert.doesNotMatch(summaryText, /Warthog/i);
  assert.equal(config.profiles['tm-warthog-throttle'], undefined);
  assert.equal(config.pages.some(({ deviceId }) => deviceId === 'tm-warthog-throttle'), false);
  assert.equal(
    existsSync(join(root, 'src', 'Config', 'Input', 'F4U-1D', 'joystick',
      'Throttle - HOTAS Warthog {5200C960-CB32-11ed-8020-444553540000}.diff.lua')),
    false,
  );
});
