DCS F4U-1D CORSAIR COMPONENTS — OVGME PACKAGE
==============================================

OVGME PACKAGE VERSION {{VERSION}}
Target:  DCS Saved Games directory

This package installs Scott's GUID-qualified WINCTRL CarrierAce PTO2 and dual
Logitech Flight Throttle Quadrant profiles to:

  Config\Input\F4U-1D\joystick

It also installs the photo-backed reference pages to:

  KNEEBOARD\F4U-1D

The PTO2 profile preserves all 25 assignments in Scott's current F4U-1D export:
flaps, approach lights, airbrake, drop-tank lock, stores release selectors,
emergency releases, wing fold and lock, arresting hook, landing gear, and
parking brake.

The primary Logitech quadrant controls mixture, propeller RPM, throttle, battery,
fuel pump, and water injection. The secondary quadrant controls the supercharger;
its middle/outer axes and all rocker inputs remain intentionally unbound. The two
profiles retain their distinct exported GUIDs.

Before enabling the package, back up:

  Saved Games\DCS.openbeta\Config\Input\F4U-1D

If your Saved Games installation uses DCS instead of DCS.openbeta, use that root.

Disable the package in OvGME to remove the managed files.

The three photo-backed OpenKneeboard pages divide airframe/carrier controls from
stores/emergency-release controls and the dual-quadrant engine layout. OpenKneeboard should discover
KNEEBOARD\F4U-1D through its DCS Aircraft tab.
If not, add that directory as a Folder tab.
