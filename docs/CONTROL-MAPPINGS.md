# F4U-1D control mappings

This reference is generated from the effective DCS `.diff.lua` profiles used by IPI. Those profiles remain the executable source of truth.

## Device index

| Device | Profile file | Layers | Assignments |
| --- | --- | --- | ---: |
| [Ava [R] Viper](devices/AVA-BASE-F16C-MAPPINGS.md) | `Ava [R] Viper {F77212B0-00A8-11f1-8001-444553540000}.diff.lua` | Base | 0 |
| [F16 MFD 1](devices/TM-MFD-1-MAPPINGS.md) | `F16 MFD 1 {51FA60C0-CB32-11ed-800B-444553540000}.diff.lua` | Base, JOY_BTN7 | 23 |
| [F16 MFD 2](devices/TM-MFD-2-MAPPINGS.md) | `F16 MFD 2 {51FA39B0-CB32-11ed-8008-444553540000}.diff.lua` | Base, JOY_BTN7 | 53 |
| [F16 MFD 3](devices/TM-MFD-3-MAPPINGS.md) | `F16 MFD 3 {C5BE49A0-2342-11ee-8001-444553540000}.diff.lua` | Base, JOY_BTN3, JOY_BTN7 | 29 |
| [Logitech Flight Quadrant](devices/LOGITECH-THROTTLE-QUADRANT-1C8A8840-5386-11F1-8001-444553540000-MAPPINGS.md) | `Logitech Flight Quadrant {1C8A8840-5386-11F1-8001-444553540000}.diff.lua` | Base, JOY_BTN7 | 14 |
| [Logitech Flight Quadrant](devices/LOGITECH-THROTTLE-QUADRANT-840BBBD0-2139-11F1-8001-444553540000-MAPPINGS.md) | `Logitech Flight Quadrant {840BBBD0-2139-11f1-8001-444553540000}.diff.lua` | JOY_BTN7, Base | 14 |
| [MOZA AB9 FFB Base](devices/MOZA-AB9-MAPPINGS.md) | `MOZA AB9 FFB Base {71DA6210-432E-11f1-8001-444553540000}.diff.lua` | Base, JOY_BTN3 | 18 |
| [T-Pendular-Rudder](devices/TM-TPR-MAPPINGS.md) | `T-Pendular-Rudder {14ED3D40-3F58-11f1-8002-444553540000}.diff.lua` | Base | 3 |
| [Throttle - HOTAS Warthog](devices/TM-WARTHOG-THROTTLE-MAPPINGS.md) | `Throttle - HOTAS Warthog {5200C960-CB32-11ed-8020-444553540000}.diff.lua` | Base | 0 |
| [Ava [R] Viper](devices/VJOY-DEVICE-MAPPINGS.md) | `vJoy Device {00DE48B0-724A-11f1-8002-444553540000}.diff.lua` | Base | 0 |
| [ VKBSim Gunfighter F14](devices/VKB-F14-GUNFIGHTER-MAPPINGS.md) | `VKBSim Gunfighter F14 {2D5CEC70-5189-11f1-8001-444553540000}.diff.lua` | Base, JOY_BTN7 | 18 |
| [WINCTRL CarrierAce PTO 2](devices/WINCTRL-PTO2-MAPPINGS.md) | `WINCTRL CarrierAce PTO 2 {19B7D090-6120-11F0-8001-444553540000}.diff.lua` | Base, JOY_BTN3, JOY_BTN7 | 37 |
| [WINCTRL ViperAce ICP](devices/WINCTRL-ICP-MAPPINGS.md) | `WINCTRL ViperAce ICP {3731E2E0-4D98-11f1-8001-444553540000}.diff.lua` | Base, JOY_BTN7 | 42 |

## Reading the tables

- `JOY_BTN#` identifies a button; `JOY_X`, `JOY_Y`, and similar names identify axes.
- A modifier before an input means both must be active.
- Empty/default profiles are documented explicitly rather than omitted.
- DCS device GUIDs in filenames are installation-specific; see [Installation](INSTALLATION.md#device-guids).

## Devices

### Ava [R] Viper

- Profile: `Ava [R] Viper {F77212B0-00A8-11f1-8001-444553540000}.diff.lua`
- Shared hardware: `ava-base-f16c`
- Physical instance: `f77212b0-00a8-11f1-8001-444553540000`
- Kneeboard page: `not generated`

#### Base layer

No module-specific assignments are present. The profile remains available for shared UI Layer controls and future module bindings.

### F16 MFD 1

- Profile: `F16 MFD 1 {51FA60C0-CB32-11ed-800B-444553540000}.diff.lua`
- Shared hardware: `tm-mfd`
- Physical instance: `51fa60c0-cb32-11ed-800b-444553540000`
- Kneeboard page: `01-TM-MFD-1.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN24` | Ign Sw- | — |
| `JOY_BTN23` | Ign Sw+ | — |
| `JOY_BTN26` | Fuel- | — |
| `JOY_BTN25` | Fuel+ | — |
| `JOY_BTN28` | Cwl Flps- | — |
| `JOY_BTN27` | Cwl Flps+ | — |
| `JOY_BTN22` | Fuel Pmp- | — |
| `JOY_BTN21` | Fuel Pmp+ | — |
| `JOY_BTN3` | Canopy | — |
| `JOY_BTN11` | R Off | — |
| `JOY_BTN12` | R On | — |
| `JOY_BTN15` | L Off | — |
| `JOY_BTN14` | L On | — |
| `JOY_BTN13` | Ctr | — |
| `JOY_BTN1` | Chrt Brd- | — |
| `JOY_BTN2` | Chrt Brd+ | — |

#### Modifier layer: `JOY_BTN7`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7 + JOY_BTN27` | MA On | — |
| `JOY_BTN7 + JOY_BTN28` | MA Off | — |
| `JOY_BTN7 + JOY_BTN23` | Gun Sght On | — |
| `JOY_BTN7 + JOY_BTN24` | Gun Sght Off | — |
| `JOY_BTN7 + JOY_BTN13` | Inbrd | — |
| `JOY_BTN7 + JOY_BTN26` | Gun Sght- | — |
| `JOY_BTN7 + JOY_BTN25` | Gun Sght+ | — |

### F16 MFD 2

- Profile: `F16 MFD 2 {51FA39B0-CB32-11ed-8008-444553540000}.diff.lua`
- Shared hardware: `tm-mfd`
- Physical instance: `51fa39b0-cb32-11ed-8008-444553540000`
- Kneeboard page: `02-TM-MFD-2.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN28` | SprChgr- | — |
| `JOY_BTN27` | SprChgr+ | — |
| `JOY_BTN22` | Oil Cls | — |
| `JOY_BTN21` | Oil Opn | — |
| `JOY_BTN14` | Start Cov  | — |
| `JOY_BTN15` | Mag- | — |
| `JOY_BTN13` | Primer | — |
| `JOY_BTN12` | Cowl Flps | — |
| `JOY_BTN11` | Fuel- | — |
| `JOY_BTN25` | Tnk Pres Opn | — |
| `JOY_BTN26` | CLOSE | — |
| `JOY_BTN23` | Whl Lck | — |
| `JOY_BTN24` | Unlckd | — |
| `JOY_BTN1` | ReArm | — |
| `JOY_BTN2` | Score | — |
| `JOY_BTN3` | Shw cntrls | — |
| `JOY_BTN4` | pilot body | — |
| `JOY_BTN5` | Sound | — |
| `JOY_BTN20` | Left panel light + | — |
| `JOY_BTN19` | Left panel light - | — |
| `JOY_BTN17` | Left instr. board light + | — |
| `JOY_BTN16` | Left instr. board light - | — |
| `JOY_BTN9` | Right instr. board light + | — |
| `JOY_BTN10` | Right instr. board light - | — |
| `JOY_BTN6` | Right panel light + | — |
| `JOY_BTN7` | Right panel light - | — |
| `JOY_BTN18` | Torch | — |

#### Modifier layer: `JOY_BTN7`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7 + JOY_BTN14` | Close | — |
| `JOY_BTN7 + JOY_BTN15` | Mag+ | — |
| `JOY_BTN7 + JOY_BTN12` | Close | — |
| `JOY_BTN7 + JOY_BTN11` | Fuel+ | — |
| `JOY_BTN7 + JOY_BTN13` | Starter | — |
| `JOY_BTN7 + JOY_BTN3` | Brief | — |
| `JOY_BTN7 + JOY_BTN1` | New | — |
| `JOY_BTN7 + JOY_BTN2` | Info Bar | — |
| `JOY_BTN7 + JOY_BTN4` | Jump | — |
| `JOY_BTN7 + JOY_BTN5` | Mouse | — |
| `JOY_BTN7 + JOY_BTN27` | Cockpit lights ON | — |
| `JOY_BTN7 + JOY_BTN28` | Cockpit lights OFF | — |
| `JOY_BTN7 + JOY_BTN21` | Exterior lights On | — |
| `JOY_BTN7 + JOY_BTN22` | Exterior lights Off | — |
| `JOY_BTN7 + JOY_BTN25` | Formation Bright | — |
| `JOY_BTN7 + JOY_BTN26` | Formation Dim | — |
| `JOY_BTN7 + JOY_BTN24` | Formation Off | — |
| `JOY_BTN7 + JOY_BTN23` | Formation cycle | — |
| `JOY_BTN7 + JOY_BTN20` | Recognition lights - amber - cycle | — |
| `JOY_BTN7 + JOY_BTN19` | Recognition lights - amber - Flash | — |
| `JOY_BTN7 + JOY_BTN18` | Recognition lights - amber - Off | — |
| `JOY_BTN7 + JOY_BTN17` | Recognition lights - amber - Steady | — |
| `JOY_BTN7 + JOY_BTN6` | Recognition lights - green - cycle | — |
| `JOY_BTN7 + JOY_BTN7` | Recognition lights - green - Flash | — |
| `JOY_BTN7 + JOY_BTN8` | Recognition lights - green - Off | — |
| `JOY_BTN7 + JOY_BTN9` | Recognition lights - green - Steady | — |

### F16 MFD 3

- Profile: `F16 MFD 3 {C5BE49A0-2342-11ee-8001-444553540000}.diff.lua`
- Shared hardware: `tm-mfd`
- Physical instance: `c5be49a0-2342-11ee-8001-444553540000`
- Kneeboard page: `03-TM-MFD-3.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN3` | Srch | — |
| `JOY_BTN21` | Scp On | — |
| `JOY_BTN4` | Scp ON | — |
| `JOY_BTN22` | Scp Off | — |
| `JOY_BTN5` | Scp OFF | — |
| `JOY_BTN27` | Scp Gain+ | — |
| `JOY_BTN28` | Scp Gain- | — |
| `JOY_BTN25` | Scp Brght+ | — |
| `JOY_BTN26` | Scp Brght- | — |
| `JOY_BTN1` | Lock | — |
| `JOY_BTN13` | REL | — |
| `JOY_BTN14` | ATTCH | — |
| `JOY_BTN12` | LOCK | — |
| `JOY_BTN20` | Rd Crs+ | — |
| `JOY_BTN19` | Rd Crs- | — |
| `JOY_BTN17` | Cage | — |
| `JOY_BTN18` | Pitch Up | — |
| `JOY_BTN16` | Pitch Dwn | — |
| `JOY_BTN6` | Recognition lights - red - cycle | — |
| `JOY_BTN7` | Recognition lights - red - Steady | — |
| `JOY_BTN9` | Exterior lights cycle | — |
| `JOY_BTN10` | Section cycle | — |
| `JOY_BTN11` | Section Bright | — |

#### Modifier layer: `JOY_BTN3`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN3 + JOY_BTN24` | CON down | — |

#### Modifier layer: `JOY_BTN7`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7 + JOY_BTN17` | Uncage | — |
| `JOY_BTN7 + JOY_BTN6` | Recognition lights - red - Flash | — |
| `JOY_BTN7 + JOY_BTN7` | Recognition lights - red - Off | — |
| `JOY_BTN7 + JOY_BTN9` | Exterior lights Flash | — |
| `JOY_BTN7 + JOY_BTN11` | Section Dim | — |

### Logitech Flight Quadrant

- Profile: `Logitech Flight Quadrant {1C8A8840-5386-11F1-8001-444553540000}.diff.lua`
- Shared hardware: `logitech-throttle-quadrant`
- Physical instance: `1c8a8840-5386-11f1-8001-444553540000`
- Kneeboard page: `04-LOGITECH-THROTTLE-QUADRANT-1C8A8840-5386-11F1-8001-444553540000.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN6` | Close | — |
| `JOY_BTN5` | Starter cover | — |
| `JOY_BTN1` | Oil cooler | — |
| `JOY_BTN2` | Close | — |
| `JOY_BTN3` | Primer | — |
| `JOY_BTN4` | Starter | — |
| `JOY_Z` | Supercharger | — |

#### Modifier layer: `JOY_BTN7`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7 + JOY_BTN3` | Cowl flaps | — |
| `JOY_BTN7 + JOY_BTN4` | Close | — |
| `JOY_BTN7 + JOY_BTN5` | Intercooler: open | — |
| `JOY_BTN7 + JOY_BTN6` | Close | — |
| `JOY_BTN7 + JOY_BTN1` | Autostart | — |
| `JOY_BTN7 + JOY_BTN2` | Autostop | — |
| `JOY_BTN7 + JOY_Z` | Supercharger | — |

### Logitech Flight Quadrant

- Profile: `Logitech Flight Quadrant {840BBBD0-2139-11f1-8001-444553540000}.diff.lua`
- Shared hardware: `logitech-throttle-quadrant`
- Physical instance: `840bbbd0-2139-11f1-8001-444553540000`
- Kneeboard page: `05-LOGITECH-THROTTLE-QUADRANT-840BBBD0-2139-11F1-8001-444553540000.png`

#### Modifier layer: `JOY_BTN7`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7 + JOY_BTN2` | Uncage | — |
| `JOY_BTN7 + JOY_BTN1` | Gyro Cage | — |
| `JOY_BTN7 + JOY_BTN6` | Drop Tank Rel | — |
| `JOY_BTN7 + JOY_BTN3` | Mag+ | — |
| `JOY_BTN7 + JOY_BTN4` | Mag- | — |

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN2` | Off | — |
| `JOY_BTN1` | Battery | — |
| `JOY_BTN4` | Off | — |
| `JOY_BTN3` | Fuel Pump | — |
| `JOY_BTN6` | Off | — |
| `JOY_BTN5` | Water Inj | — |
| `JOY_Y` | Propeller | deadzone=0; hardwareDetentAB=0; hardwareDetentMax=0; saturationX=1; saturationY=1; curvature=[0]; hardwareDetent=false; invert=true; slider=false |
| `JOY_X` | Throttle | — |
| `JOY_Z` | Mixture | — |

### MOZA AB9 FFB Base

- Profile: `MOZA AB9 FFB Base {71DA6210-432E-11f1-8001-444553540000}.diff.lua`
- Shared hardware: `moza-ab9`
- Physical instance: `71da6210-432e-11f1-8001-444553540000`
- Kneeboard page: `06-MOZA-AB9.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN15` |  | — |
| `JOY_BTN17` |  | — |
| `JOY_BTN6` |  | — |
| `JOY_BTN2` |  | — |
| `JOY_BTN1` |  | — |
| `JOY_BTN16` |  | — |
| `JOY_BTN18` |  | — |
| `JOY_BTN_POV1_D` |  | — |
| `JOY_BTN_POV1_U` |  | — |
| `JOY_BTN_POV1_L` |  | — |
| `JOY_BTN_POV1_R` |  | — |
| `JOY_Y` | Pitch | — |
| `JOY_X` | Roll | — |

#### Modifier layer: `JOY_BTN3`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN3 + JOY_BTN2` |  | — |
| `JOY_BTN3 + JOY_BTN_POV1_L` |  | — |
| `JOY_BTN3 + JOY_BTN_POV1_R` |  | — |
| `JOY_BTN3 + JOY_BTN_POV1_U` |  | — |
| `JOY_BTN3 + JOY_BTN_POV1_D` |  | — |

### T-Pendular-Rudder

- Profile: `T-Pendular-Rudder {14ED3D40-3F58-11f1-8002-444553540000}.diff.lua`
- Shared hardware: `tm-tpr`
- Physical instance: `14ed3d40-3f58-11f1-8002-444553540000`
- Kneeboard page: `07-TM-TPR.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_Z` | Rudder | — |
| `JOY_Y` | Left toe brake | deadzone=0; hardwareDetentAB=0; hardwareDetentMax=0; saturationX=1; saturationY=1; curvature=[0]; hardwareDetent=false; invert=true; slider=false |
| `JOY_X` | Right toe brake | deadzone=0; hardwareDetentAB=0; hardwareDetentMax=0; saturationX=1; saturationY=1; curvature=[0]; hardwareDetent=false; invert=true; slider=false |

### Throttle - HOTAS Warthog

- Profile: `Throttle - HOTAS Warthog {5200C960-CB32-11ed-8020-444553540000}.diff.lua`
- Shared hardware: `tm-warthog-throttle`
- Physical instance: `5200c960-cb32-11ed-8020-444553540000`
- Kneeboard page: `08-TM-WARTHOG-THROTTLE.png`

#### Base layer

No module-specific assignments are present. The profile remains available for shared UI Layer controls and future module bindings.

### Ava [R] Viper

- Profile: `vJoy Device {00DE48B0-724A-11f1-8002-444553540000}.diff.lua`
- Shared hardware: `ava-base-f16c`
- Physical instance: ``
- Kneeboard page: `02-AVA-BASE-F16C.png`

#### Base layer

No module-specific assignments are present. The profile remains available for shared UI Layer controls and future module bindings.

###  VKBSim Gunfighter F14

- Profile: `VKBSim Gunfighter F14 {2D5CEC70-5189-11f1-8001-444553540000}.diff.lua`
- Shared hardware: `vkb-f14-gunfighter`
- Physical instance: `2d5cec70-5189-11f1-8001-444553540000`
- Kneeboard page: `09-VKB-F14-GUNFIGHTER.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN2` | Shoot | — |
| `JOY_BTN1` | Gun camera | — |
| `JOY_BTN16` | OFF | — |
| `JOY_BTN14` | On | — |
| `JOY_BTN15` | Safe | — |
| `JOY_BTN13` | Arm | — |
| `JOY_BTN4` | Rckts Auto | — |
| `JOY_BTN3` | Pickle | — |
| `JOY_BTN8` | Reset | — |
| `JOY_BTN11` | Nose Up | — |
| `JOY_BTN10` | Nose Down | — |
| `JOY_BTN12` | LWD | — |
| `JOY_BTN9` | RWD | — |
| `JOY_BTN5` | Tail wheel lock | — |
| `JOY_BTN6` | Airbrake | — |

#### Modifier layer: `JOY_BTN7`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7 + JOY_BTN3` | Rckts Fire | — |
| `JOY_BTN7 + JOY_BTN4` | Single | — |
| `JOY_BTN7 + JOY_BTN5` | Unlocked | — |

### WINCTRL CarrierAce PTO 2

- Profile: `WINCTRL CarrierAce PTO 2 {19B7D090-6120-11F0-8001-444553540000}.diff.lua`
- Shared hardware: `winctrl-pto2`
- Physical instance: `19b7d090-6120-11f0-8001-444553540000`
- Kneeboard page: `10-WINCTRL-PTO2.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN1` | Lower-left panel pushbutton | — |
| `JOY_BTN13` | bypass carrier | — |
| `JOY_BTN12` | bypass field | — |
| `JOY_BTN7` | Flaps - | — |
| `JOY_BTN5` | Flaps + | — |
| `JOY_BTN29` | Wings hold | — |
| `JOY_BTN30` | Wings spread | — |
| `JOY_BTN28` | Wings fold | — |
| `JOY_BTN31` | Wings lock/unlock | — |
| `JOY_BTN34` | Hook Down | — |
| `JOY_BTN33` | Hook Park | — |
| `JOY_BTN32` | Hook Up | — |
| `JOY_BTN35` | Landing gear up | — |
| `JOY_BTN37` | Landing gear down | — |
| `JOY_BTN11` | Probe retract | — |
| `JOY_BTN10` | Probe extend | — |
| `JOY_BTN9` | Landing gear lower auxiliary input | — |
| `JOY_BTN8` | Landing gear upper auxiliary input | — |
| `JOY_BTN19` | Drop Tank Lock | — |
| `JOY_BTN22` | Drop Tank Release | — |
| `JOY_BTN17` | jettison L FUS / MSL | — |
| `JOY_BTN24` | L Wing Release On | — |
| `JOY_BTN25` | R Wing Release On | — |
| `JOY_BTN23` | Pylon Release On | — |
| `JOY_BTN26` | L Wing E Rel On | — |
| `JOY_BTN27` | R Wing E Rel On | — |
| `JOY_BTN4` | Launch bar extend | — |
| `JOY_BTN3` | Launch bar retract | — |
| `JOY_BTN39` | EBrake 2 | — |
| `JOY_BTN38` | EBrake 1 | — |

#### Modifier layer: `JOY_BTN3`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN3 + JOY_BTN31` | Wings lock/unlock | — |

#### Modifier layer: `JOY_BTN7`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7 + JOY_BTN2` | Master caution pushbutton | — |
| `JOY_BTN7 + JOY_BTN24` | OFF | — |
| `JOY_BTN7 + JOY_BTN25` | OFF | — |
| `JOY_BTN7 + JOY_BTN23` | OFF | — |
| `JOY_BTN7 + JOY_BTN26` | OFF | — |
| `JOY_BTN7 + JOY_BTN27` | OFF | — |

### WINCTRL ViperAce ICP

- Profile: `WINCTRL ViperAce ICP {3731E2E0-4D98-11f1-8001-444553540000}.diff.lua`
- Shared hardware: `winctrl-icp`
- Physical instance: `3731e2e0-4d98-11f1-8001-444553540000`
- Kneeboard page: `11-WINCTRL-ICP.png`

#### Base layer

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN32` | NOSE/TAIL | — |
| `JOY_BTN33` | SAFE | — |
| `JOY_BTN34` | TAIL | — |
| `JOY_BTN28` | Release | — |
| `JOY_BTN27` | Lock | — |
| `JOY_BTN26` | Attach | — |
| `JOY_BTN1` | Scope ON | — |
| `JOY_BTN2` | Search Mode | — |
| `JOY_BTN19` | Scope Bright+ | — |
| `JOY_BTN20` | Scope Bright- | — |
| `JOY_BTN31` | Scope Gain- | — |
| `JOY_BTN30` | Scope Gain+ | — |
| `JOY_BTN21` | Autolevel | — |
| `JOY_BTN24` | Autopilot Off | — |
| `JOY_BTN23` | Autothrottle | — |
| `JOY_BTN25` | Hold Attitude | — |
| `JOY_BTN7` | Kneeboard Jump To Shortcut 1 | — |
| `JOY_BTN8` | Kneeboard Jump To Shortcut 2 | — |
| `JOY_BTN9` | Kneeboard Jump To Shortcut 3 | — |
| `JOY_BTN11` | Kneeboard Jump To Shortcut 4 | — |
| `JOY_BTN12` | Kneeboard Jump To Shortcut 5 | — |
| `JOY_BTN13` | Kneeboard Jump To Shortcut 6 | — |
| `JOY_BTN15` | Kneeboard Jump To Shortcut 7 | — |
| `JOY_BTN16` | Kneeboard Jump To Shortcut 8 | — |
| `JOY_BTN17` | Kneeboard Jump To Shortcut 9 | — |
| `JOY_BTN18` | Kneeboard Jump To Shortcut 10 | — |
| `JOY_BTN14` | Kneeboard Make Shortcut | — |
| `JOY_BTN29` | Kneeboard glance view | — |
| `JOY_Y` | Left Board Int | — |
| `JOY_X` | Right Board Int | — |
| `JOY_RY` | Left Pnl Int | — |
| `JOY_RX` | Right Pnl Int | — |

#### Modifier layer: `JOY_BTN7`

| Physical input | Assignment | Axis/filter settings |
| --- | --- | --- |
| `JOY_BTN7 + JOY_BTN1` | Scope OFF | — |
| `JOY_BTN7 + JOY_BTN24` | Kneeboard Next Page | — |
| `JOY_BTN7 + JOY_BTN22` | Kneeboard Previous Page | — |
| `JOY_BTN7 + JOY_BTN23` | Kneeboard Next Shortcut | — |
| `JOY_BTN7 + JOY_BTN25` | Kneeboard Previous Shortcut | — |
| `JOY_BTN7 + JOY_BTN21` | Kneeboard ON/OFF | — |
| `JOY_BTN7 + JOY_RX` | Gunsght Lght Int | — |
| `JOY_BTN7 + JOY_RY` | Gyro hor ptch | — |
| `JOY_BTN7 + JOY_Y` | Chrtbrd lght int | — |
| `JOY_BTN7 + JOY_X` | Trim yaw | — |
