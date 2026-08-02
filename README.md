# DCS F4U-1D Corsair Components

Version-controlled DCS control profiles, OpenKneeboard pages, documentation, and
OvGME packaging for Scott's F4U-1D Corsair cockpit.

## Included in this release

- WINCTRL CarrierAce PTO2 profile using the current DCS F4U-1D command export.
- Independent landing-gear, arresting-hook, wing-fold, and wing-lock controls.
- A photo-backed 1200 x 1600 OpenKneeboard page with the mapped PTO2 controls.
- Deterministic build, mapping, Lua, version, kneeboard, and package validation.
- Tag-authoritative semantic versioning for release archives.

The profile intentionally contains only the controls approved for issue #1. Unrelated
PTO2 controls from the source export are not shipped.

## Install

The release ZIP is an OvGME component targeting the DCS Saved Games root. Back up the
existing F4U-1D input directory, add the ZIP to your OvGME repository, and enable it.

See [Installation](docs/INSTALLATION.md), [Control mappings](docs/CONTROL-MAPPINGS.md),
and [OpenKneeboard/VAICOM](docs/OPENKNEEBOARD-VAICOM.md) for details.

## Build and validate

Requirements: Node.js 22, PowerShell 7, and Lua 5.4.

1. Run npm ci.
2. Run npm run test:profile.
3. Run npm run build:kneeboard.
4. Run npm run test:kneeboard.
5. Run ./scripts/Build-OvGME.ps1.
6. Run ./scripts/Test-Package.ps1.

Generated archives are written to dist and are excluded from source control.
