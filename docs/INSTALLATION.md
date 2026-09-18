# Installing DCS-F4U-1D-Components

## Requirements

- DCS World with the F4U-1D module installed.
- OvGME configured with the DCS Saved Games directory as its root.
- The hardware profiles you intend to use.
- OpenKneeboard, VoiceAttack, VAICOM PRO, and AutoHotkey are optional.

## Back up existing controls

Before enabling the package, copy these folders somewhere outside Saved Games:

```text
Saved Games\DCS\Config\Input\F4U-1D
Saved Games\DCS\Config\Input\UiLayer
Saved Games\DCS\KNEEBOARD\F4U-1D
```

## Install with OvGME

1. Download `DCS-F4U-1D-Components-<version>-OVGME.zip` from the repository release.
2. Add it to the OvGME configuration rooted at your DCS Saved Games directory.
3. Enable the package.
4. In DCS, open **Options → Controls → F4U-1D** and verify the expected device columns.
5. Confirm that the numbered kneeboard pages appear in game or OpenKneeboard.

The archive writes `Config/Input/F4U-1D`, the applicable `Config/Input/UiLayer` profiles, and `KNEEBOARD/F4U-1D`.

## Device GUIDs

DCS embeds a Windows device-instance GUID in each `.diff.lua` filename. If your GUID differs, use DCS **Load profile** for the matching device or re-scaffold when the repository should adopt a newly captured device set.

## Remove or restore

Disable the package in OvGME before installing another version. Restore the backed-up folders to return to the pre-package state.
