# DCS F4U-1D Corsair Components

Version-controlled DCS control profiles, OpenKneeboard pages, documentation, and
OvGME packaging for Scott's F4U-1D Corsair cockpit.

## Included in this release

- WINCTRL CarrierAce PTO2 profile preserving all 25 assignments in the current
  DCS F4U-1D export.
- Two GUID-qualified Logitech Flight Throttle Quadrant profiles preserving the
  exported mixture, propeller RPM, throttle, supercharger, battery, fuel-pump,
  and water-injection assignments.
- Separate MOZA AB9 and VKB BlackBox profiles: the base retains native X/Y axes and
  force feedback while the F-14 grip supplies verified weapon and trim buttons.
- Later option to use the ThrustMaster grips aka F-16C Viper or F/A-18C Hornet grips with the MOZA AB9.
- Guns on BTN 1, bombs on BTN 3, rockets on global modifier BTN 7 + BTN 3, and trim
  on BTN 9–12; maintained weapon-selector positions remain intentionally unbound.
- Explicitly unbound secondary middle/outer axes and rocker inputs, with conflicting
  DCS auto-bindings removed.
- Airframe, carrier, lighting, parking-brake, stores-selector, and emergency-release
  controls on their analogous physical PTO2 controls.
- Four photo-backed 1200 x 1600 OpenKneeboard pages covering the PTO2, both Logitech
  quadrants, and the VKB F-14 grip.
- Deterministic build, mapping, Lua, version, kneeboard, and package validation.
- Tag-authoritative semantic versioning for release archives.

The exported command identifiers, device GUID, button numbers, and mappings are
preserved without substituting commands from another DCS module.

## Install

The release ZIP is an OvGME component targeting the DCS Saved Games root. Back up the
existing F4U-1D input directory, add the ZIP to your OvGME repository, and enable it.

See [Installation](docs/INSTALLATION.md), [Control mappings](docs/CONTROL-MAPPINGS.md),
the [dual-quadrant device guide](docs/devices/LOGITECH-THROTTLE-QUADRANTS.md), the
[MOZA/VKB F-14 guide](docs/devices/MOZA-AB9-VKB-F14.md), and
[OpenKneeboard/VAICOM](docs/OPENKNEEBOARD-VAICOM.md) for details.

## Shared kneeboard pipeline

One script builds every page: `scripts/build-kneeboard.mjs`.

It reads `config/kneeboard.json` and renders canonical device diagrams from
[DCS-Common](https://github.com/ScottyMac52/DCS-Common) (`shared-hardware-consumer.mjs`
and `profile-driven-kneeboard.mjs`), including dual Logitech instances on one page.

DCS-Common is located via `DCS_COMMON_ROOT` or the CI checkout at `.dcs-common`.

## Build and validate

Requirements: Node.js 22, PowerShell 7, and a DCS-Common checkout.

```powershell
npm ci
$env:DCS_COMMON_ROOT = 'C:\path\to\DCS-Common'
npm run test:profile
npm run build:kneeboard
npm run test:kneeboard
npm run test:versioning
./scripts/Build-OvGME.ps1 -Version 0.0.0-local
./scripts/Test-Package.ps1 -Version 0.0.0-local
./scripts/Build-Release.ps1 -Version 0.0.0-local
./scripts/Test-Package.ps1 -Version 0.0.0-local
```

There is no separate `apply-shared-hardware` step and no `Test-Release.ps1`.
`Test-Package.ps1` validates both the OVGME package and the complete release bundle.

Generated archives are written to `dist` and are excluded from source control.
