[CmdletBinding()]
param([Parameter(Mandatory)][string] $Joystick)

$ErrorActionPreference = 'Stop'
$File = 'WINCTRL CarrierAce PTO 2 {19B7D090-6120-11F0-8001-444553540000}.diff.lua'
$Path = Join-Path $Joystick $File
if (-not (Test-Path $Path -PathType Leaf)) { throw "Missing profile: $File" }

$Lua = Get-Content $Path -Raw
$Buttons = [regex]::Matches($Lua, '\["key"\]\s*=\s*"(?<Key>JOY_BTN\d+)"') |
    ForEach-Object { $_.Groups['Key'].Value }
$ExpectedButtons = @(
    'JOY_BTN28', 'JOY_BTN29', 'JOY_BTN30', 'JOY_BTN31', 'JOY_BTN32',
    'JOY_BTN33', 'JOY_BTN34', 'JOY_BTN35', 'JOY_BTN37'
)

if ($Buttons.Count -ne $ExpectedButtons.Count) {
    throw "PTO2 must contain exactly $($ExpectedButtons.Count) assignments."
}
if (($Buttons | Sort-Object -Unique).Count -ne $ExpectedButtons.Count) {
    throw 'PTO2 assignments must use unique buttons.'
}
if (Compare-Object ($Buttons | Sort-Object) ($ExpectedButtons | Sort-Object)) {
    throw 'PTO2 contains an unexpected or missing button.'
}

$Expected = @(
    @{ Command='d3530pnilunilcd7vd1vpnilvunil'; Button='JOY_BTN28'; Name='Wings fold, fold' },
    @{ Command='d3530pnilunilcd7vd0.5vpnilvunil'; Button='JOY_BTN29'; Name='Wings fold, stop' },
    @{ Command='d3530pnilunilcd7vd0vpnilvunil'; Button='JOY_BTN30'; Name='Wings fold, spread' },
    @{ Command='d3535pnilunilcd7vd-1vpnilvunil'; Button='JOY_BTN31'; Name='Wings lock toggle' },
    @{ Command='d3532pnilunilcd7vd1vpnilvunil'; Button='JOY_BTN32'; Name='Hook, up' },
    @{ Command='d3532pnilunilcd7vd0vpnilvunil'; Button='JOY_BTN33'; Name='Hook, parking' },
    @{ Command='d3532pnilunilcd7vd-1vpnilvunil'; Button='JOY_BTN34'; Name='Hook, down' },
    @{ Command='d3533pnilunilcd7vd0vpnilvunil'; Button='JOY_BTN35'; Name='Gears, up' },
    @{ Command='d3533pnilunilcd7vd1vpnilvunil'; Button='JOY_BTN37'; Name='Gears, down' }
)
foreach ($Binding in $Expected) {
    $Pattern = '(?ms)\["' + [regex]::Escape($Binding.Command) +
        '"\].*?\["key"\]\s*=\s*"' + $Binding.Button +
        '".*?\["name"\]\s*=\s*"' + [regex]::Escape($Binding.Name) + '"'
    if ($Lua -notmatch $Pattern) { throw "Invalid PTO2 binding: $($Binding.Name)" }
}

foreach ($Forbidden in @(
    'Flaps', 'Airbrake', 'Approach light', 'Droppable tank',
    'release selector', 'emergency release', 'Parking brake'
)) {
    if ($Lua.Contains($Forbidden)) { throw "Out-of-scope PTO2 assignment found: $Forbidden" }
}

Write-Host 'WINCTRL PTO2 validation passed.'
