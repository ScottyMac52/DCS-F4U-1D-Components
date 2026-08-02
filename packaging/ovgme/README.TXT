DCS F4U-1D CORSAIR COMPONENTS — OVGME PACKAGE
==============================================

OVGME PACKAGE VERSION {{VERSION}}
Target:  DCS Saved Games directory

This package installs Scott's GUID-qualified WINCTRL CarrierAce PTO2, dual
Logitech Flight Throttle Quadrant, MOZA AB9, and separate VKB F-14 grip profiles to:

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

The MOZA AB9 retains the F4U-1D module's native pitch/roll axes and force feedback;
its accidental rudder, propeller, and throttle auto-bindings are removed. The VKB
BlackBox device provides guns on BTN 1, bombs on BTN 3, rockets on the existing
global BTN 7 + BTN 3 modifier combination, and trim on BTN 9-12. Maintained weapon-
selector positions and DLC/surplus inputs remain intentionally unbound.

Before enabling the package, back up:

  Saved Games\DCS.openbeta\Config\Input\F4U-1D

If your Saved Games installation uses DCS instead of DCS.openbeta, use that root.

Disable the package in OvGME to remove the managed files.

The four photo-backed OpenKneeboard pages divide airframe/carrier controls from
stores/emergency-release controls, the dual-quadrant engine layout, and the VKB F-14
grip mapping. OpenKneeboard should discover
KNEEBOARD\F4U-1D through its DCS Aircraft tab.
If not, add that directory as a Folder tab.
