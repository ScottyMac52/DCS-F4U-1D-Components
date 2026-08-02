# F4U-1D control mappings

## WINCTRL CarrierAce PTO2

| Physical control | HID input | DCS command | Exported command identifier |
|---|---|---|---|
| WING FOLD — FOLD | JOY_BTN28 | Wings fold, fold | d3530pnilunilcd7vd1vpnilvunil |
| WING FOLD — HOLD | JOY_BTN29 | Wings fold, stop | d3530pnilunilcd7vd0.5vpnilvunil |
| WING FOLD — SPREAD | JOY_BTN30 | Wings fold, spread | d3530pnilunilcd7vd0vpnilvunil |
| WING FOLD — push | JOY_BTN31 | Wings lock toggle | d3535pnilunilcd7vd-1vpnilvunil |
| HOOK — UP | JOY_BTN32 | Hook, up | d3532pnilunilcd7vd1vpnilvunil |
| HOOK — PARK | JOY_BTN33 | Hook, parking | d3532pnilunilcd7vd0vpnilvunil |
| HOOK — DOWN | JOY_BTN34 | Hook, down | d3532pnilunilcd7vd-1vpnilvunil |
| GEAR — UP | JOY_BTN35 | Gears, up | d3533pnilunilcd7vd0vpnilvunil |
| GEAR — DOWN | JOY_BTN37 | Gears, down | d3533pnilunilcd7vd1vpnilvunil |

These identifiers and HID inputs come directly from Scott's current F4U-1D DCS
export. The center hook position is retained because DCS exposes a native parking
command. Wing movement and the hinge-pin lock remain independent.

All other PTO2 controls are intentionally unbound in this profile.
