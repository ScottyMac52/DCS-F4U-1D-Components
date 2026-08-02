[CmdletBinding()]
param([Parameter(Mandatory)][string] $Joystick)

$ErrorActionPreference = 'Stop'
$PrimaryFile = 'Logitech Flight Quadrant {840BBBD0-2139-11f1-8001-444553540000}.diff.lua'
$SecondaryFile = 'Logitech Flight Quadrant {1C8A8840-5386-11F1-8001-444553540000}.diff.lua'
$PrimaryPath = Join-Path $Joystick $PrimaryFile
$SecondaryPath = Join-Path $Joystick $SecondaryFile

if (-not (Test-Path $PrimaryPath -PathType Leaf)) { throw "Missing primary quadrant profile: $PrimaryFile" }
if (-not (Test-Path $SecondaryPath -PathType Leaf)) { throw "Missing secondary quadrant profile: $SecondaryFile" }
if (Get-ChildItem $Joystick -Filter 'Saitek Pro Flight Quadrant*.diff.lua') {
    throw 'The package must not contain the legacy Saitek alias for the primary quadrant GUID.'
}

$Primary = Get-Content -LiteralPath $PrimaryPath -Raw
$Secondary = Get-Content -LiteralPath $SecondaryPath -Raw

function Assert-Binding {
    param(
        [Parameter(Mandatory)][string] $Lua,
        [Parameter(Mandatory)][string] $Command,
        [Parameter(Mandatory)][string] $InputName,
        [Parameter(Mandatory)][string] $DcsName
    )

    $Pattern = '(?ms)\["' + [regex]::Escape($Command) +
        '"\].*?\["key"\]\s*=\s*"' + [regex]::Escape($InputName) +
        '".*?\["name"\]\s*=\s*"' + [regex]::Escape($DcsName) + '"'
    if ($Lua -notmatch $Pattern) { throw "Invalid quadrant binding: $DcsName -> $InputName" }
}

$PrimaryBindings = @(
    @{ Command='a3230cd3'; Input='JOY_Z'; Name='Mixture handle' },
    @{ Command='a3224cd3'; Input='JOY_Y'; Name='Propeller governor handle' },
    @{ Command='a3236cd3'; Input='JOY_X'; Name='Throttle Lever' },
    @{ Command='d3003pnilunilcd1vd1vpnilvunil'; Input='JOY_BTN1'; Name='Battery, on' },
    @{ Command='d3003pnilunilcd1vd0vpnilvunil'; Input='JOY_BTN2'; Name='Battery, off' },
    @{ Command='d3228pnilunilcd3vd1vpnilvunil'; Input='JOY_BTN3'; Name='Fuel pump, on' },
    @{ Command='d3228pnilunilcd3vd0vpnilvunil'; Input='JOY_BTN4'; Name='Fuel pump, off' },
    @{ Command='d3244pnilunilcd3vd1vpnilvunil'; Input='JOY_BTN5'; Name='Enable water injection' },
    @{ Command='d3244pnilunilcd3vd0vpnilvunil'; Input='JOY_BTN6'; Name='Disable water injection' }
)
foreach ($Binding in $PrimaryBindings) {
    Assert-Binding $Primary $Binding.Command $Binding.Input $Binding.Name
}

if (([regex]::Matches($Primary, '\["invert"\]\s*=\s*true')).Count -ne 1) {
    throw 'Only the primary propeller axis may preserve an inversion.'
}

Assert-Binding $Secondary 'a3235cd3' 'JOY_Z' 'Supercharger handle'
if ($Secondary -match '\["keyDiffs"\]') { throw 'Secondary quadrant buttons must remain unbound.' }
if ($Secondary -match '(?ms)\["added"\].*?\["key"\]\s*=\s*"JOY_[XY]"') {
    throw 'Secondary JOY_X and JOY_Y must remain unbound.'
}

foreach ($Removal in @(
    @{ Command='a2001cdnil'; Input='JOY_Y'; Name='Pitch' },
    @{ Command='a2002cdnil'; Input='JOY_X'; Name='Roll' }
)) {
    $Pattern = '(?ms)\["' + $Removal.Command + '"\].*?\["name"\]\s*=\s*"' +
        $Removal.Name + '".*?\["removed"\].*?\["key"\]\s*=\s*"' + $Removal.Input + '"'
    if ($Secondary -notmatch $Pattern) {
        throw "Secondary $($Removal.Input) does not remove the accidental $($Removal.Name) auto-binding."
    }
}

Write-Host 'Dual Logitech quadrant validation passed.'
