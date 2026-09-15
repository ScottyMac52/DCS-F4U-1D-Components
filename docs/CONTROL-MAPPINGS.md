# F4U-1D Corsair control mappings

This is the device-by-device reference for the profiles packaged by this repository. It reflects `config/kneeboard.json` and the current module `.diff.lua` files; those files remain the executable source of truth.

## Configuration overview

| Device/group | Role |
| --- | --- |
| STICK | MOZA AB9 + VKB F-14 • flight and weapons |
| MFD 1 | Ignition • fuel selector and pump • cowl flaps |
| MFD 2 | Supercharger • oil-cooler controls |
| MFD 3 | Views • zoom • UI Layer controls |
| QUADS | Dual Logitech • engine axes and switches |
| TPR | Rudder • left and right toe brakes |
| PTO2 | Gear • flaps • hook • wing fold • brakes • stores |
| PTT | Viper TQS • AutoHotkey • VoiceAttack / VAICOM PRO |

## Device index

| Device | Profile file | Layers | Documented assignments |
| --- | --- | --- | ---: |
| VKBSim Gunfighter F14 | `VKBSim Gunfighter F14 {2D5CEC70-5189-11f1-8001-444553540000}.diff.lua` | Base, `JOY_BTN7` | 7 |
| Ava [R] Viper | `Ava [R] Viper {F77212B0-00A8-11f1-8001-444553540000}.diff.lua` | Base | 0 |
| F16 MFD 1 | `F16 MFD 1 {51FA60C0-CB32-11ed-800B-444553540000}.diff.lua` | Base | 8 |
| F16 MFD 2 | `F16 MFD 2 {51FA39B0-CB32-11ed-8008-444553540000}.diff.lua` | Base | 4 |
| F16 MFD 3 | `F16 MFD 3 {C5BE49A0-2342-11ee-8001-444553540000}.diff.lua` | Base, `JOY_BTN3` | 2 |
| Logitech Flight Quadrant | `Logitech Flight Quadrant {1C8A8840-5386-11F1-8001-444553540000}.diff.lua` | Base | 1 |
| Logitech Flight Quadrant | `Logitech Flight Quadrant {840BBBD0-2139-11f1-8001-444553540000}.diff.lua` | Base | 9 |
| MOZA AB9 FFB Base | `MOZA AB9 FFB Base {71DA6210-432E-11f1-8001-444553540000}.diff.lua` | Base, `JOY_BTN3` | 16 |
| OnYourTwelve F-14 PDCP | `OnYourTwelve F-14 PDCP {52C96400-3F11-11f1-8001-444553540000}.diff.lua` | Base | 0 |
| T-Pendular-Rudder | `T-Pendular-Rudder {14ED3D40-3F58-11f1-8002-444553540000}.diff.lua` | Base | 3 |
| Viper TQS | `Viper TQS {C0A33440-3F54-11f1-8001-444553540000}.diff.lua` | Base | 0 |
| WINCTRL CarrierAce PTO 2 | `WINCTRL CarrierAce PTO 2 {19B7D090-6120-11F0-8001-444553540000}.diff.lua` | Base, `JOY_BTN3` | 26 |
| WINCTRL ViperAce ICP | `WINCTRL ViperAce ICP {3731E2E0-4D98-11f1-8001-444553540000}.diff.lua` | Base | 0 |

## Reading the tables

- `JOY_BTN#` identifies a physical button; `JOY_X`, `JOY_Y`, and similar names identify axes.
- A modifier before the input means both must be active, for example `JOY_BTN7 + JOY_BTN3`.
- A profile with no module-specific assignments is intentional: it can still receive DCS-Common UI Layer commands, and its page remains available as the place to add future module bindings.
- DCS device GUIDs in filenames are installation-specific. See [Installation](INSTALLATION.md#device-guids) before copying these profiles to another computer.

## Devices

### VKBSim Gunfighter F14

- Profile: `VKBSim Gunfighter F14 {2D5CEC70-5189-11f1-8001-444553540000}.diff.lua`
- Kneeboard page: `01-VKB-F14-GUNFIGHTER.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN1` | Guns | — |
| `JOY_BTN3` | Pickle | — |
| `JOY_BTN9` | Trim Up | — |
| `JOY_BTN12` | Trim Down | — |
| `JOY_BTN10` | Trim Left | — |
| `JOY_BTN11` | Trim Right | — |

#### Modifier layer: `JOY_BTN7`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7 + JOY_BTN3` | Rockets | — |

### Ava [R] Viper

- Profile: `Ava [R] Viper {F77212B0-00A8-11f1-8001-444553540000}.diff.lua`
- Kneeboard page: `02-AVA-BASE-F16C.png`

#### Base layer

No module-specific assignments are present on this layer. The profile is retained so shared UI Layer controls and future assignments can use the device without changing the documentation structure.

### F16 MFD 1

- Profile: `F16 MFD 1 {51FA60C0-CB32-11ed-800B-444553540000}.diff.lua`
- Kneeboard page: `03-TM-MFD-1.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN24` | CON down | — |
| `JOY_BTN23` | CON up | — |
| `JOY_BTN26` | BRT down | — |
| `JOY_BTN25` | BRT up | — |
| `JOY_BTN28` | INT down | — |
| `JOY_BTN27` | SYM up | — |
| `JOY_BTN22` | Fuel Pump Off | — |
| `JOY_BTN21` | Fuel Pump On | — |

### F16 MFD 2

- Profile: `F16 MFD 2 {51FA39B0-CB32-11ed-8008-444553540000}.diff.lua`
- Kneeboard page: `04-TM-MFD-2.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN28` | INT down | — |
| `JOY_BTN27` | SYM up | — |
| `JOY_BTN22` | LVL down | — |
| `JOY_BTN21` | GAIN up | — |

### F16 MFD 3

- Profile: `F16 MFD 3 {C5BE49A0-2342-11ee-8001-444553540000}.diff.lua`
- Kneeboard page: `05-TM-MFD-3.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN23` | CON up | — |

#### Modifier layer: `JOY_BTN3`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN3 + JOY_BTN24` | CON down | — |

### Logitech Flight Quadrant

- Profile: `Logitech Flight Quadrant {1C8A8840-5386-11F1-8001-444553540000}.diff.lua`
- Kneeboard page: `06-LOGITECH-THROTTLE-QUADRANT-1C8A8840-5386-11F1-8001-444553540000.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_Z` | Mixture Axis | — |

### Logitech Flight Quadrant

- Profile: `Logitech Flight Quadrant {840BBBD0-2139-11f1-8001-444553540000}.diff.lua`
- Kneeboard page: `07-LOGITECH-THROTTLE-QUADRANT-840BBBD0-2139-11F1-8001-444553540000.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN2` | Left Rocker (Down) | — |
| `JOY_BTN1` | Left Rocker (Up) | — |
| `JOY_BTN4` | Fuel Pump Off | — |
| `JOY_BTN3` | Fuel Pump On | — |
| `JOY_BTN6` | Right Rocker (Down) | — |
| `JOY_BTN5` | Right Rocker (Up) | — |
| `JOY_Y` | Propeller Axis | deadzone=0; hardwareDetentAB=0; hardwareDetentMax=0; saturationX=1; saturationY=1; curvature=[0]; hardwareDetent=false; invert=true; slider=false |
| `JOY_Z` | Mixture Axis | — |
| `JOY_X` | Throttle Axis | — |

### MOZA AB9 FFB Base

- Profile: `MOZA AB9 FFB Base {71DA6210-432E-11f1-8001-444553540000}.diff.lua`
- Kneeboard page: `08-MOZA-AB9.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN15` | Master arm - ON | — |
| `JOY_BTN17` | Master arm - OFF | — |
| `JOY_BTN6` | Guns fire button | — |
| `JOY_BTN2` | Rockets fire button | — |
| `JOY_BTN1` | Gun camera | — |
| `JOY_BTN16` | Rockets Box Off | — |
| `JOY_BTN18` | Rockets Box On | — |
| `JOY_BTN_POV1_D` | Trim, nose up | — |
| `JOY_BTN_POV1_U` | Trim, nose down | — |
| `JOY_BTN_POV1_L` | Trim, left bank | — |
| `JOY_BTN_POV1_R` | Trim, right bank | — |

#### Modifier layer: `JOY_BTN3`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN3 + JOY_BTN2` | Weapons release button | — |
| `JOY_BTN3 + JOY_BTN_POV1_L` | Glance left | — |
| `JOY_BTN3 + JOY_BTN_POV1_R` | Glance right | — |
| `JOY_BTN3 + JOY_BTN_POV1_U` | Glance up | — |
| `JOY_BTN3 + JOY_BTN_POV1_D` | Glance down | — |

### OnYourTwelve F-14 PDCP

- Profile: `OnYourTwelve F-14 PDCP {52C96400-3F11-11f1-8001-444553540000}.diff.lua`
- Kneeboard page: `09-ONYOURTWELVE-PDCP.png`

#### Base layer

No module-specific assignments are present on this layer. The profile is retained so shared UI Layer controls and future assignments can use the device without changing the documentation structure.

### T-Pendular-Rudder

- Profile: `T-Pendular-Rudder {14ED3D40-3F58-11f1-8002-444553540000}.diff.lua`
- Kneeboard page: `10-TM-TPR.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_Z` | Rudder axis | — |
| `JOY_Y` | Left toe brake axis | deadzone=0; hardwareDetentAB=0; hardwareDetentMax=0; saturationX=1; saturationY=1; curvature=[0]; hardwareDetent=false; invert=true; slider=false |
| `JOY_X` | Right toe brake axis | deadzone=0; hardwareDetentAB=0; hardwareDetentMax=0; saturationX=1; saturationY=1; curvature=[0]; hardwareDetent=false; invert=true; slider=false |

### Viper TQS

- Profile: `Viper TQS {C0A33440-3F54-11f1-8001-444553540000}.diff.lua`
- Kneeboard page: `12-VIPER-TQS-MISSION-PACK.png`

#### Base layer

No module-specific assignments are present on this layer. The profile is retained so shared UI Layer controls and future assignments can use the device without changing the documentation structure.

### WINCTRL CarrierAce PTO 2

- Profile: `WINCTRL CarrierAce PTO 2 {19B7D090-6120-11F0-8001-444553540000}.diff.lua`
- Kneeboard page: `13-WINCTRL-PTO2.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7` | Flaps - | — |
| `JOY_BTN5` | Flaps + | — |
| `JOY_BTN29` | Wings hold | — |
| `JOY_BTN30` | Wings spread | — |
| `JOY_BTN28` | Wings fold | — |
| `JOY_BTN31` | Wings lock/unlock | — |
| `JOY_BTN34` | Hook Down | — |
| `JOY_BTN33` | Hook handle center position | — |
| `JOY_BTN32` | Hook Up | — |
| `JOY_BTN35` | Landing gear up | — |
| `JOY_BTN37` | Landing gear down | — |
| `JOY_BTN11` | Probe retract | — |
| `JOY_BTN10` | Probe extend | — |
| `JOY_BTN9` | Landing gear lower auxiliary input | — |
| `JOY_BTN8` | Landing gear upper auxiliary input | — |
| `JOY_BTN19` | jettison R FUS / MSL | — |
| `JOY_BTN22` | Jet Button | — |
| `JOY_BTN17` | jettison L FUS / MSL | — |
| `JOY_BTN24` | Jet LI | — |
| `JOY_BTN25` | Jet RI | — |
| `JOY_BTN23` | Jet Center | — |
| `JOY_BTN26` | Jet LO | — |
| `JOY_BTN27` | Jet RO | — |
| `JOY_BTN39` | EBrake 2 | — |
| `JOY_BTN38` | EBrake 1 | — |

#### Modifier layer: `JOY_BTN3`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN3 + JOY_BTN31` | Wings lock/unlock | — |

### WINCTRL ViperAce ICP

- Profile: `WINCTRL ViperAce ICP {3731E2E0-4D98-11f1-8001-444553540000}.diff.lua`
- Kneeboard page: `14-WINCTRL-ICP.png`

#### Base layer

No module-specific assignments are present on this layer. The profile is retained so shared UI Layer controls and future assignments can use the device without changing the documentation structure.
