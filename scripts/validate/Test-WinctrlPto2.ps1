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
    'JOY_BTN5', 'JOY_BTN7', 'JOY_BTN8', 'JOY_BTN9', 'JOY_BTN10', 'JOY_BTN11',
    'JOY_BTN17', 'JOY_BTN19', 'JOY_BTN22', 'JOY_BTN23', 'JOY_BTN24', 'JOY_BTN25',
    'JOY_BTN26', 'JOY_BTN27', 'JOY_BTN28', 'JOY_BTN29', 'JOY_BTN30', 'JOY_BTN31',
    'JOY_BTN32', 'JOY_BTN33', 'JOY_BTN34', 'JOY_BTN35', 'JOY_BTN37', 'JOY_BTN38',
    'JOY_BTN39'
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
    @{ Command='d3512pnilunilcd7vd0.2vpnilvunil'; Button='JOY_BTN5'; Name='Flaps +' },
    @{ Command='d3512pnilunilcd7vd-0.2vpnilvunil'; Button='JOY_BTN7'; Name='Flaps -' },
    @{ Command='d3761pnilunilcd11vd1vpnilvunil'; Button='JOY_BTN8'; Name='Approach light On' },
    @{ Command='d3761pnilunilcd11vd-1vpnilvunil'; Button='JOY_BTN9'; Name='Approach light Off' },
    @{ Command='d3544pnilunilcd7vd0vpnilvunil'; Button='JOY_BTN10'; Name='Airbrake, up' },
    @{ Command='d3543pnilunilcd7vd-1vpnilvunil'; Button='JOY_BTN11'; Name='Airbrake, down' },
    @{ Command='d3932pnilunilcd13vd1vpnilvunil'; Button='JOY_BTN17'; Name='Droppable tank lock: attach' },
    @{ Command='d3932pnilunilcd13vd0.5vpnilvunil'; Button='JOY_BTN19'; Name='Droppable tank lock: lock' },
    @{ Command='d3932pnilunilcd13vd0vpnilvunil'; Button='JOY_BTN22'; Name='Droppable tank lock: release' },
    @{ Command='d3942pnilunilcd13vd1vpnilvunil'; Button='JOY_BTN23'; Name='Pylon, release selector ON' },
    @{ Command='d3940pnilunilcd13vd1vpnilvunil'; Button='JOY_BTN24'; Name='Left wing, release selector ON' },
    @{ Command='d3941pnilunilcd13vd1vpnilvunil'; Button='JOY_BTN25'; Name='Right wing, release selector ON' },
    @{ Command='d3947pnilunilcd13vd1vpnilvunil'; Button='JOY_BTN26'; Name='Left wing, emergency release ON' },
    @{ Command='d3948pnilunilcd13vd1vpnilvunil'; Button='JOY_BTN27'; Name='Right wing, emergency release ON' },
    @{ Command='d3530pnilunilcd7vd1vpnilvunil'; Button='JOY_BTN28'; Name='Wings fold, fold' },
    @{ Command='d3530pnilunilcd7vd0.5vpnilvunil'; Button='JOY_BTN29'; Name='Wings fold, stop' },
    @{ Command='d3530pnilunilcd7vd0vpnilvunil'; Button='JOY_BTN30'; Name='Wings fold, spread' },
    @{ Command='d3535pnilunilcd7vd-1vpnilvunil'; Button='JOY_BTN31'; Name='Wings lock toggle' },
    @{ Command='d3532pnilunilcd7vd1vpnilvunil'; Button='JOY_BTN32'; Name='Hook, up' },
    @{ Command='d3532pnilunilcd7vd0vpnilvunil'; Button='JOY_BTN33'; Name='Hook, parking' },
    @{ Command='d3532pnilunilcd7vd-1vpnilvunil'; Button='JOY_BTN34'; Name='Hook, down' },
    @{ Command='d3533pnilunilcd7vd0vpnilvunil'; Button='JOY_BTN35'; Name='Gears, up' },
    @{ Command='d3533pnilunilcd7vd1vpnilvunil'; Button='JOY_BTN37'; Name='Gears, down' },
    @{ Command='dnilp3542unilcd7vdnilvp0vunil'; Button='JOY_BTN38'; Name='Parking brake OFF' },
    @{ Command='dnilp3541unilcd7vdnilvp1vunil'; Button='JOY_BTN39'; Name='Parking brake ON' }
)
foreach ($Binding in $Expected) {
    $Pattern = '(?ms)\["' + [regex]::Escape($Binding.Command) +
        '"\].*?\["key"\]\s*=\s*"' + $Binding.Button +
        '".*?\["name"\]\s*=\s*"' + [regex]::Escape($Binding.Name) + '"'
    if ($Lua -notmatch $Pattern) { throw "Invalid PTO2 binding: $($Binding.Name)" }
}

Write-Host 'WINCTRL PTO2 validation passed: all 25 exported assignments are preserved.'
