# DCS F4U-1D Corsair Components

Version-controlled DCS control profiles, OpenKneeboard pages, documentation, and
OvGME packaging for Scott's F4U-1D Corsair cockpit.

## Included in this release

- WINCTRL CarrierAce PTO2 profile preserving all 25 assignments in the current
  DCS F4U-1D export.
- Two GUID-qualified Logitech Flight Throttle Quadrant profiles preserving the
  exported mixture, propeller RPM, throttle, supercharger, battery, fuel-pump,
  and water-injection assignments.
- Explicitly unbound secondary middle/outer axes and rocker inputs, with conflicting
  DCS auto-bindings removed.
- Airframe, carrier, lighting, parking-brake, stores-selector, and emergency-release
  controls on their analogous physical PTO2 controls.
- Three photo-backed 1200 x 1600 OpenKneeboard pages covering the PTO2 and both
  Logitech quadrants.
- Deterministic build, mapping, Lua, version, kneeboard, and package validation.
- Tag-authoritative semantic versioning for release archives.

The exported command identifiers, device GUID, button numbers, and mappings are
preserved without substituting commands from another DCS module.

## Install

The release ZIP is an OvGME component targeting the DCS Saved Games root. Back up the
existing F4U-1D input directory, add the ZIP to your OvGME repository, and enable it.

See [Installation](docs/INSTALLATION.md), [Control mappings](docs/CONTROL-MAPPINGS.md),
the [dual-quadrant device guide](docs/devices/LOGITECH-THROTTLE-QUADRANTS.md), and
[OpenKneeboard/VAICOM](docs/OPENKNEEBOARD-VAICOM.md) for details.

## Build and validate

Requirements: Node.js 22, PowerShell 7, and Lua 5.4.

1. Run npm ci.
2. Run npm run test:profile.
3. Run npm run build:kneeboard.
4. Run npm run test:kneeboard.
5. Run ./scripts/Build-OvGME.ps1.
6. Run ./scripts/Test-Package.ps1.

Generated archives are written to dist and are excluded from source control.
