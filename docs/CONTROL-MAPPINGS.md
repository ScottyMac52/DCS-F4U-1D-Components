# F4U-1D control mappings

## WINCTRL CarrierAce PTO2

| Physical control | HID input | DCS command | Exported command identifier |
|---|---|---|---|
| FLAP — increase | JOY_BTN5 | Flaps + | d3512pnilunilcd7vd0.2vpnilvunil |
| FLAP — decrease | JOY_BTN7 | Flaps - | d3512pnilunilcd7vd-0.2vpnilvunil |
| LDG/TAXI LIGHT — ON | JOY_BTN8 | Approach light On | d3761pnilunilcd11vd1vpnilvunil |
| LDG/TAXI LIGHT — OFF | JOY_BTN9 | Approach light Off | d3761pnilunilcd11vd-1vpnilvunil |
| ANTI SKID — up | JOY_BTN10 | Airbrake, up | d3544pnilunilcd7vd0vpnilvunil |
| ANTI SKID — down | JOY_BTN11 | Airbrake, down | d3543pnilunilcd7vd-1vpnilvunil |
| Droppable-tank lock — ATTACH | JOY_BTN17 | Droppable tank lock: attach | d3932pnilunilcd13vd1vpnilvunil |
| Droppable-tank lock — LOCK | JOY_BTN19 | Droppable tank lock: lock | d3932pnilunilcd13vd0.5vpnilvunil |
| Droppable-tank lock — RELEASE | JOY_BTN22 | Droppable tank lock: release | d3932pnilunilcd13vd0vpnilvunil |
| Pylon release selector — ON | JOY_BTN23 | Pylon, release selector ON | d3942pnilunilcd13vd1vpnilvunil |
| Left-wing release selector — ON | JOY_BTN24 | Left wing, release selector ON | d3940pnilunilcd13vd1vpnilvunil |
| Right-wing release selector — ON | JOY_BTN25 | Right wing, release selector ON | d3941pnilunilcd13vd1vpnilvunil |
| Left-wing emergency release — ON | JOY_BTN26 | Left wing, emergency release ON | d3947pnilunilcd13vd1vpnilvunil |
| Right-wing emergency release — ON | JOY_BTN27 | Right wing, emergency release ON | d3948pnilunilcd13vd1vpnilvunil |
| WING FOLD — FOLD | JOY_BTN28 | Wings fold, fold | d3530pnilunilcd7vd1vpnilvunil |
| WING FOLD — HOLD | JOY_BTN29 | Wings fold, stop | d3530pnilunilcd7vd0.5vpnilvunil |
| WING FOLD — SPREAD | JOY_BTN30 | Wings fold, spread | d3530pnilunilcd7vd0vpnilvunil |
| WING FOLD — push | JOY_BTN31 | Wings lock toggle | d3535pnilunilcd7vd-1vpnilvunil |
| HOOK — UP | JOY_BTN32 | Hook, up | d3532pnilunilcd7vd1vpnilvunil |
| HOOK — PARK | JOY_BTN33 | Hook, parking | d3532pnilunilcd7vd0vpnilvunil |
| HOOK — DOWN | JOY_BTN34 | Hook, down | d3532pnilunilcd7vd-1vpnilvunil |
| GEAR — UP | JOY_BTN35 | Gears, up | d3533pnilunilcd7vd0vpnilvunil |
| GEAR — DOWN | JOY_BTN37 | Gears, down | d3533pnilunilcd7vd1vpnilvunil |
| PARK BRK — OFF | JOY_BTN38 | Parking brake OFF | dnilp3542unilcd7vdnilvp0vunil |
| PARK BRK — ON | JOY_BTN39 | Parking brake ON | dnilp3541unilcd7vdnilvp1vunil |

These identifiers and HID inputs come directly from Scott's current F4U-1D DCS
export. The center hook position is retained because DCS exposes a native parking
command. Wing movement and the hinge-pin lock remain independent. No assignment from
the supplied working PTO2 export is removed or substituted.

## Logitech Flight Quadrant — primary

Device filename: `Logitech Flight Quadrant {840BBBD0-2139-11f1-8001-444553540000}.diff.lua`

### Axes

| Physical lever | HID input | DCS command | Exported command identifier | Exported tuning |
|---|---|---|---|---|
| Inner | JOY_Z | Mixture handle | a3230cd3 | Default |
| Middle | JOY_Y | Propeller governor handle | a3224cd3 | Inverted; zero curvature/deadzone; full saturation |
| Outer/end | JOY_X | Throttle Lever | a3236cd3 | Default |

### Rocker switches

| Physical rocker | HID input | DCS command | Exported command identifier |
|---|---|---|---|
| Left — upper (T1) | JOY_BTN1 | Battery, on | d3003pnilunilcd1vd1vpnilvunil |
| Left — lower (T2) | JOY_BTN2 | Battery, off | d3003pnilunilcd1vd0vpnilvunil |
| Middle — upper (T3) | JOY_BTN3 | Fuel pump, on | d3228pnilunilcd3vd1vpnilvunil |
| Middle — lower (T4) | JOY_BTN4 | Fuel pump, off | d3228pnilunilcd3vd0vpnilvunil |
| Right — upper (T5) | JOY_BTN5 | Enable water injection | d3244pnilunilcd3vd1vpnilvunil |
| Right — lower (T6) | JOY_BTN6 | Disable water injection | d3244pnilunilcd3vd0vpnilvunil |

The current export contained these six button assignments under the legacy `Saitek
Pro Flight Quadrant` device name with the same `{840BBBD0-2139-11f1-8001-444553540000}`
GUID. They are consolidated into the current `Logitech Flight Quadrant` filename so
the package contains one authoritative profile for that physical device.

## Logitech Flight Quadrant — secondary

Device filename: `Logitech Flight Quadrant {1C8A8840-5386-11F1-8001-444553540000}.diff.lua`

| Physical lever | HID input | DCS command | Exported command identifier | State |
|---|---|---|---|---|
| Inner | JOY_Z | Supercharger handle | a3235cd3 | Bound |
| Middle | JOY_Y | — | — | Intentionally unbound; accidental Pitch auto-binding removed |
| Outer/end | JOY_X | — | — | Intentionally unbound; accidental Roll auto-binding removed |

All secondary-quadrant rocker switches remain intentionally unbound. Both quadrant
profiles also remove accidental rudder bindings and other conflicting DCS defaults
recorded in Scott's export.
