[CmdletBinding()]
param([string] $Version)

$ErrorActionPreference = 'Stop'
$RepoRoot = Split-Path -Parent $PSScriptRoot
$Version = node (Join-Path $PSScriptRoot 'version.mjs') resolve $Version
if ($LASTEXITCODE -ne 0) { throw 'Failed to resolve the package-test version.' }

$PackageName = "Scott-F4U-1D-Control-Profiles-$Version"
$Archive = Join-Path $RepoRoot "dist/$PackageName.zip"
$VerifyRoot = Join-Path $RepoRoot '.build/verify'

if (-not (Test-Path $Archive -PathType Leaf)) { throw "Missing package: $Archive" }
Remove-Item $VerifyRoot -Recurse -Force -ErrorAction SilentlyContinue
New-Item $VerifyRoot -ItemType Directory -Force | Out-Null
[IO.Compression.ZipFile]::ExtractToDirectory($Archive, $VerifyRoot)

$Container = Join-Path $VerifyRoot $PackageName
$Joystick = Join-Path $Container 'Config/Input/F4U-1D/joystick'
$Kneeboard = Join-Path $Container 'KNEEBOARD/F4U-1D'
if (-not (Test-Path $Joystick -PathType Container)) { throw 'Missing F4U-1D joystick directory.' }
if (-not (Test-Path $Kneeboard -PathType Container)) { throw 'Missing F4U-1D kneeboard directory.' }

$Profiles = @(Get-ChildItem $Joystick -Filter '*.diff.lua')
if ($Profiles.Count -ne 5) { throw "Expected exactly five joystick profiles, found $($Profiles.Count)." }
$Pages = @(Get-ChildItem $Kneeboard -Filter '*.png' | Sort-Object Name)
$ExpectedPages = @(
    '01-WINCTRL-PTO2-AIRFRAME.png',
    '02-WINCTRL-PTO2-STORES.png',
    '03-LOGITECH-DUAL-QUADRANTS.png',
    '04-VKB-F14-GRIP.png'
)
if ($Pages.Count -ne $ExpectedPages.Count) {
    throw "Expected exactly $($ExpectedPages.Count) kneeboard pages, found $($Pages.Count)."
}
if (Compare-Object $Pages.Name $ExpectedPages) {
    throw 'The package contains an unexpected or missing F4U-1D kneeboard page.'
}

if ((Get-Content (Join-Path $VerifyRoot 'VERSION.TXT') -Raw).Trim() -ne $Version) {
    throw 'VERSION.TXT mismatch.'
}
$PackageReadme = Get-Content (Join-Path $VerifyRoot 'README.TXT') -Raw
if ($PackageReadme.Contains('{{VERSION}}')) { throw 'README.TXT contains an unresolved version token.' }
if ($PackageReadme -notmatch ('OVGME PACKAGE VERSION ' + [regex]::Escape($Version))) {
    throw 'README.TXT does not contain the package version.'
}

# Build-OvGME writes a single-line SHA256SUMS for the package zip.
# Build-Release rewrites dist/SHA256SUMS.txt with every dist/*.zip (package + complete).
# Accept either form by requiring a matching line for this archive, not whole-file equality.
$ArchiveName = [IO.Path]::GetFileName($Archive)
$ActualHash = (Get-FileHash $Archive -Algorithm SHA256).Hash.ToLowerInvariant()
$SumsPath = Join-Path $RepoRoot 'dist/SHA256SUMS.txt'
if (-not (Test-Path $SumsPath -PathType Leaf)) { throw 'Missing dist/SHA256SUMS.txt.' }
$HashLines = @(Get-Content $SumsPath | ForEach-Object { $_.Trim() } | Where-Object { $_ })
$MatchingLine = $HashLines | Where-Object {
    $_ -match ('^[0-9a-fA-F]{64}\s+' + [regex]::Escape($ArchiveName) + '$')
} | Select-Object -First 1
if (-not $MatchingLine) {
    throw "SHA256SUMS.txt is missing an entry for $ArchiveName."
}
$ListedHash = ($MatchingLine -split '\s+', 2)[0].ToLowerInvariant()
if ($ListedHash -ne $ActualHash) {
    throw "SHA256SUMS.txt hash for $ArchiveName does not match the package archive."
}

foreach ($Profile in $Profiles) {
    $Lua = Get-Content -LiteralPath $Profile.FullName -Raw
    if ($Lua -notmatch '^local diff\s*=\s*\{' -or $Lua -notmatch 'return diff\s*$') {
        throw "$($Profile.Name) does not have the expected DCS diff.lua structure."
    }
}

foreach ($Validator in Get-ChildItem (Join-Path $RepoRoot 'scripts/validate') -Filter '*.ps1' | Sort-Object Name) {
    & $Validator.FullName -Joystick $Joystick
}

Write-Host 'Package validation passed.'
