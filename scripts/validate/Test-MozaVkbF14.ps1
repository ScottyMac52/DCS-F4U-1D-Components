[CmdletBinding()]
param([Parameter(Mandatory)][string] $Joystick)

$ErrorActionPreference = 'Stop'

function Assert-Match([string] $Text, [string] $Pattern, [string] $Message) {
    if ($Text -notmatch $Pattern) { throw $Message }
}

function Assert-NotMatch([string] $Text, [string] $Pattern, [string] $Message) {
    if ($Text -match $Pattern) { throw $Message }
}

$MozaPath = Join-Path $Joystick 'MOZA AB9 FFB Base {71DA6210-432E-11f1-8001-444553540000}.diff.lua'
$VkbPath = Join-Path $Joystick ' VKBSim Gunfighter F14   {2D5CEC70-5189-11f1-8001-444553540000}.diff.lua'
if (-not (Test-Path -LiteralPath $MozaPath -PathType Leaf)) { throw 'Missing exact MOZA AB9 profile.' }
if (-not (Test-Path -LiteralPath $VkbPath -PathType Leaf)) { throw 'Missing exact VKB F-14 grip profile.' }

$Moza = Get-Content -LiteralPath $MozaPath -Raw
$Vkb = Get-Content -LiteralPath $VkbPath -Raw

Assert-NotMatch $Moza '\["keyDiffs"\]' 'The MOZA profile must not contain grip-button assignments.'
Assert-NotMatch $Moza '\["a200[12]cdnil"\]' 'The MOZA profile must leave native pitch and roll assignments unchanged.'
foreach ($Removal in @(
    @{ Command = 'a2003cdnil'; Key = 'JOY_RZ' },
    @{ Command = 'a3224cd3'; Key = 'JOY_SLIDER1' },
    @{ Command = 'a3236cd3'; Key = 'JOY_Z' }
)) {
    Assert-Match $Moza ('\["' + $Removal.Command + '"\][\s\S]*?\["removed"\][\s\S]*?\["key"\]\s*=\s*"' + $Removal.Key + '"') "MOZA is missing the $($Removal.Key) removal."
}

$Assignments = @(
    @{ Command = 'd3918pnilu3918cd13vd1vpnilvu0'; Key = 'JOY_BTN1' },
    @{ Command = 'd3958pnilu3958cd13vd1vpnilvu0'; Key = 'JOY_BTN3' },
    @{ Command = 'd3919pnilu3919cd13vd1vpnilvu0'; Key = 'JOY_BTN3' },
    @{ Command = 'dnilp3519unilcd7vdnilvp-0.002vunil'; Key = 'JOY_BTN9' },
    @{ Command = 'dnilp3520unilcd7vdnilvp-0.002vunil'; Key = 'JOY_BTN10' },
    @{ Command = 'dnilp3520unilcd7vdnilvp0.002vunil'; Key = 'JOY_BTN11' },
    @{ Command = 'dnilp3519unilcd7vdnilvp0.002vunil'; Key = 'JOY_BTN12' }
)
foreach ($Assignment in $Assignments) {
    Assert-Match $Vkb ('\["' + [regex]::Escape($Assignment.Command) + '"\][\s\S]*?\["key"\]\s*=\s*"' + $Assignment.Key + '"') "VKB is missing $($Assignment.Key) for $($Assignment.Command)."
}
Assert-Match $Vkb '\["d3919pnilu3919cd13vd1vpnilvu0"\][\s\S]*?\["reformers"\][\s\S]*?\[1\]\s*=\s*"JOY_BTN7"' 'Rockets must use the existing JOY_BTN7 modifier.'
foreach ($Unused in @(5, 6, 13, 14, 15, 16)) {
    Assert-NotMatch $Vkb ('\["key"\]\s*=\s*"JOY_BTN' + $Unused + '"') "JOY_BTN$Unused must remain unbound."
}
$VkbAxisDiffs = ($Vkb -split '\["keyDiffs"\]', 2)[0]
Assert-NotMatch $VkbAxisDiffs '\["added"\]\s*=\s*\{' 'The VKB profile must not add axes.'

Write-Host 'MOZA AB9 and VKB F-14 grip validation passed.'
