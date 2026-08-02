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
