[CmdletBinding()]
param(
    [string] $Version
)

$ErrorActionPreference = 'Stop'
$RepoRoot = Split-Path -Parent $PSScriptRoot
$Version = node (Join-Path $PSScriptRoot 'version.mjs') resolve $Version
if ($LASTEXITCODE -ne 0) { throw 'Failed to resolve the release-test version.' }
$OvgmeName = "Scott-F4U-1D-Control-Profiles-$Version.zip"
$BundleName = "Scott-F4U-1D-Complete-Package-$Version"
$BundleArchive = Join-Path $RepoRoot "dist/$BundleName.zip"
$VerifyRoot = Join-Path $RepoRoot '.build/release-verify'

if (-not (Test-Path $BundleArchive -PathType Leaf)) { throw "Missing complete release bundle: $BundleArchive" }
Remove-Item $VerifyRoot -Recurse -Force -ErrorAction SilentlyContinue
Expand-Archive $BundleArchive $VerifyRoot
$BundleRoot = Join-Path $VerifyRoot $BundleName

$RequiredFiles = @(
    "OVGME/$OvgmeName",
    'Documentation/README.md',
    'Documentation/CHANGELOG.md',
    'Documentation/INSTALLATION.md',
    'Documentation/CONTROL-MAPPINGS.md',
    'Documentation/OPENKNEEBOARD-VAICOM.md',
    'Documentation/THIRD-PARTY-ASSETS.md',
    'Documentation/devices/LOGITECH-THROTTLE-QUADRANTS.md',
    'Documentation/devices/MOZA-AB9-VKB-F14.md',
    'Documentation/devices/WINCTRL-PTO2.md',
    'SHA256SUMS.txt'
)
foreach ($RelativePath in $RequiredFiles) {
    if (-not (Test-Path (Join-Path $BundleRoot $RelativePath) -PathType Leaf)) {
        throw "Complete release bundle is missing $RelativePath."
    }
}

$Checksums = Get-Content (Join-Path $BundleRoot 'SHA256SUMS.txt')
foreach ($RelativePath in "OVGME/$OvgmeName") {
    $Expected = ($Checksums | Where-Object { $_ -match ('  ' + [regex]::Escape($RelativePath) + '$') }) -replace '\s+.*$', ''
    if ([string]::IsNullOrWhiteSpace($Expected)) { throw "Missing checksum for $RelativePath." }
    $Actual = (Get-FileHash (Join-Path $BundleRoot $RelativePath) -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($Actual -ne $Expected) { throw "Checksum mismatch for $RelativePath." }
}

Write-Host 'Complete release bundle validation passed.'
