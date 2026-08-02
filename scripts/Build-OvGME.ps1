[CmdletBinding()]
param([string] $Version)

$ErrorActionPreference = 'Stop'
$RepoRoot = Split-Path -Parent $PSScriptRoot
$Version = node (Join-Path $PSScriptRoot 'version.mjs') resolve $Version
if ($LASTEXITCODE -ne 0) { throw 'Failed to resolve the OvGME package version.' }

$PackageName = "Scott-F4U-1D-Control-Profiles-$Version"
$BuildRoot = Join-Path $RepoRoot '.build/ovgme'
$StageRoot = Join-Path $BuildRoot 'stage'
$Container = Join-Path $StageRoot $PackageName
$Dist = Join-Path $RepoRoot 'dist'
$Archive = Join-Path $Dist "$PackageName.zip"

Remove-Item $BuildRoot -Recurse -Force -ErrorAction SilentlyContinue
New-Item (Join-Path $Container 'Config/Input/F4U-1D') -ItemType Directory -Force | Out-Null
New-Item (Join-Path $Container 'KNEEBOARD/F4U-1D') -ItemType Directory -Force | Out-Null
New-Item $Dist -ItemType Directory -Force | Out-Null

$SourceJoystick = Join-Path $RepoRoot 'src/Config/Input/F4U-1D/joystick'
$TargetJoystick = Join-Path $Container 'Config/Input/F4U-1D/joystick'
New-Item $TargetJoystick -ItemType Directory -Force | Out-Null
foreach ($Profile in Get-ChildItem -LiteralPath $SourceJoystick -File) {
    [IO.File]::Copy($Profile.FullName, [IO.Path]::Combine($TargetJoystick, $Profile.Name), $true)
}
$ExpectedVkbName = ' VKBSim Gunfighter F14   {2D5CEC70-5189-11f1-8001-444553540000}.diff.lua'
if (-not [IO.File]::Exists([IO.Path]::Combine($TargetJoystick, $ExpectedVkbName))) {
    throw 'The exact leading-space VKB device filename was not preserved during staging.'
}
Copy-Item (Join-Path $RepoRoot 'kneeboard/F4U-1D/*') (Join-Path $Container 'KNEEBOARD/F4U-1D')

$ReadmeTemplate = Get-Content (Join-Path $RepoRoot 'packaging/ovgme/README.TXT') -Raw
if (-not $ReadmeTemplate.Contains('{{VERSION}}')) {
    throw 'OvGME README.TXT does not contain the {{VERSION}} token.'
}
$ReadmeTemplate.Replace('{{VERSION}}', $Version) |
    Set-Content (Join-Path $StageRoot 'README.TXT') -Encoding utf8
$Version | Set-Content (Join-Path $StageRoot 'VERSION.TXT') -Encoding utf8

Remove-Item $Archive -Force -ErrorAction SilentlyContinue
Compress-Archive -Path $Container, (Join-Path $StageRoot 'README.TXT'), (Join-Path $StageRoot 'VERSION.TXT') -DestinationPath $Archive -CompressionLevel Optimal

$Hash = Get-FileHash $Archive -Algorithm SHA256
"$($Hash.Hash.ToLowerInvariant())  $([IO.Path]::GetFileName($Archive))" |
    Set-Content (Join-Path $Dist 'SHA256SUMS.txt') -Encoding utf8

Write-Host "Created $Archive"
