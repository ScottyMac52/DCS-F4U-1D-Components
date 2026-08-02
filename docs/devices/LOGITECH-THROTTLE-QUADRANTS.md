# Dual Logitech Flight Throttle Quadrants

Scott's F4U-1D engine controls use two physically separate Logitech Flight Throttle
Quadrants. DCS identifies them by GUID; their profiles are not interchangeable.

| Role | Device GUID | Active controls |
|---|---|---|
| Primary | 840BBBD0-2139-11f1-8001-444553540000 | Mixture, propeller RPM, throttle, six engine-system rocker inputs |
| Secondary | 1C8A8840-5386-11F1-8001-444553540000 | Supercharger only |

## Primary layout

From the pilot's inboard side toward the outboard/end position, the levers are
mixture (`JOY_Z`), propeller RPM (`JOY_Y`), and throttle (`JOY_X`). Only the
propeller axis preserves an exported inversion.

The three two-way rocker switches operate battery, fuel pump, and water injection.
Each direction is a native, discrete F4U-1D command; the profile contains no macros.

## Secondary layout

The inner `JOY_Z` lever operates the native absolute supercharger axis. `JOY_Y` and
`JOY_X` remain unbound, and the profile explicitly removes DCS's accidental pitch and
roll auto-bindings from them. The six rocker inputs are also unbound.

## Legacy Saitek filename

Scott's current export contained a legacy `Saitek Pro Flight Quadrant` file and a
current `Logitech Flight Quadrant` file for the same primary GUID. The axis settings
were in the current Logitech file while the six rocker assignments remained in the
legacy alias. This package consolidates both parts into the current Logitech filename
and deliberately omits the duplicate alias.

If Windows assigns a new GUID, export one temporary F4U-1D binding for that device,
close DCS, and rename only the corresponding supplied profile to the newly exported
filename. Do not give both quadrants the same filename or GUID.
