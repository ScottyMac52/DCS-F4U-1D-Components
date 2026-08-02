# Installation

## OvGME

1. Back up Saved Games\DCS.openbeta\Config\Input\F4U-1D.
2. If your installation uses Saved Games\DCS, use that root instead.
3. Configure an OvGME game entry whose root is the selected DCS Saved Games folder.
4. Add the release ZIP to that entry's mod repository.
5. Enable the Scott F4U-1D Control Profiles component.
6. Start DCS and verify the WINCTRL CarrierAce PTO2 and both GUID-distinct Logitech
   Flight Quadrant columns under F4U-1D controls.

The package installs:

- Config\Input\F4U-1D\joystick
- KNEEBOARD\F4U-1D

The GUID-qualified filenames match Scott's exported devices. A different Windows
device GUID requires exporting one binding in DCS and renaming only the corresponding
supplied profile to match that device filename.

The package deliberately omits the stale `Saitek Pro Flight Quadrant` alias for the
primary `{840BBBD0-2139-11f1-8001-444553540000}` device. Its six working rocker
assignments are consolidated into the current `Logitech Flight Quadrant` profile.

## Verification

- Move the gear lever through UP and DOWN.
- Move the hook lever through UP, PARK, and DOWN.
- Move the wing-fold lever through FOLD, HOLD, and SPREAD.
- Push the wing-fold control separately to toggle the wing hinge-pin lock.
- Verify flaps, approach lights, airbrake, and parking brake in both directions.
- Verify the drop-tank lock positions and the three stores release selectors.
- Test left/right emergency release only with a safe training loadout and deliberate
  switch handling.
- On the primary quadrant, verify mixture, propeller RPM, and throttle travel in the
  requested inboard-to-outboard order; confirm only propeller RPM is inverted.
- Verify primary rocker pairs for battery, fuel pump, and water injection.
- On the secondary quadrant, verify only the inner lever operates the supercharger;
  the middle/outer levers and all six rockers must remain inactive.

Disable the component in OvGME to remove the managed files.
