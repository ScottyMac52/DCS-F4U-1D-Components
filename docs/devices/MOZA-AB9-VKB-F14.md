# MOZA AB9 with VKB F-14 Gunfighter grip

Scott's active F4U-1D center-stick configuration is two DCS devices working together:

| Responsibility | DCS device | GUID |
|---|---|---|
| X/Y flight axes and force feedback | MOZA AB9 FFB Base | 71DA6210-432E-11f1-8001-444553540000 |
| Grip buttons and HAT states | VKBSim Gunfighter F14 | 2D5CEC70-5189-11f1-8001-444553540000 |

The grip buttons travel through the VKB BlackBox/adapter path; they do not share the
MOZA device filename. The two profiles therefore cannot overwrite each other.

## Flight controls

The MOZA profile leaves the module's native `JOY_X` roll and `JOY_Y` pitch/FFB setup
unchanged. It removes only the exported accidental rudder, propeller, and throttle
auto-bindings. Force-feedback tuning is outside this package.

The VKB profile explicitly removes accidental axis assignments from the BlackBox
device and does not bind the DLC wheel axis.

## Weapons and trim

- `JOY_BTN1` fires the guns.
- `JOY_BTN3` operates the native F4U-1D weapons-release command for bombs.
- Hold the existing global `JOY_BTN7` modifier and press `JOY_BTN3` for the native
  rockets-fire command.
- `JOY_BTN9`–`JOY_BTN12` provide nose-up, left-bank, right-bank, and nose-down trim.

The button numbering comes from Scott's working F-14B(U) profile for this exact VKB
device. The aircraft commands come only from current F4U-1D exports.

## Intentionally unused controls

The F-14 weapon selector exposes maintained position buttons 13–16. The current
F4U-1D bindings do not provide reliable direct armament-selector commands, and user
reports indicate several early-access weapon-selector binds do not actuate the
cockpit controls. Those positions remain unbound; use cockpit controls for arming and
selection. DLC, catapult salute, paddle, NWS, and surplus grip inputs also remain
unbound unless a later tested F4U-specific workflow is approved.

## Future F/A-18C grip variant

Issue #3 is deferred. A future F/A-18C grip profile will put grip buttons back through
the MOZA device identity, so it must be packaged as an alternate mutually exclusive
MOZA profile. It must not replace this VKB/BlackBox configuration silently.
