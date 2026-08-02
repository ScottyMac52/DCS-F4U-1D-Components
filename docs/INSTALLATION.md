# Installation

## OvGME

1. Back up Saved Games\DCS.openbeta\Config\Input\F4U-1D.
2. If your installation uses Saved Games\DCS, use that root instead.
3. Configure an OvGME game entry whose root is the selected DCS Saved Games folder.
4. Add the release ZIP to that entry's mod repository.
5. Enable the Scott F4U-1D Control Profiles component.
6. Start DCS and verify the WINCTRL CarrierAce PTO2 column under F4U-1D controls.

The package installs:

- Config\Input\F4U-1D\joystick
- KNEEBOARD\F4U-1D

The GUID-qualified filename matches Scott's exported device. A different Windows
device GUID requires exporting one binding in DCS and renaming the supplied profile
to match that device filename.

## Verification

- Move the gear lever through UP and DOWN.
- Move the hook lever through UP, PARK, and DOWN.
- Move the wing-fold lever through FOLD, HOLD, and SPREAD.
- Push the wing-fold control separately to toggle the wing hinge-pin lock.
- Confirm no other PTO2 control received an assignment from this package.

Disable the component in OvGME to remove the managed files.
