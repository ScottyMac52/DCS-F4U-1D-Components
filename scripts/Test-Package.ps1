param(
  [Parameter(Mandatory = $true)][string]$Version
)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $root 'dist'
$pkgName = 'DCS-F4U-1D-Components'
$archiveBase = "$pkgName-$Version-OVGME"
$zip = Join-Path $dist "$archiveBase.zip"
if (-not (Test-Path $zip)) { throw "Missing package $zip" }
$sums = Get-Content (Join-Path $dist 'SHA256SUMS.txt')
$leaf = Split-Path $zip -Leaf
$hashLine = $sums | Where-Object { $_ -match [regex]::Escape($leaf) } | Select-Object -First 1
if (-not $hashLine) { throw 'SHA256SUMS.txt does not list the package archive.' }
$expected = ($hashLine -split '\s+')[0].ToLowerInvariant()
$actual = (Get-FileHash $zip -Algorithm SHA256).Hash.ToLowerInvariant()
if ($expected -ne $actual) { throw 'SHA256SUMS.txt does not match the package archive.' }

Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead($zip)
try {
  $entries = @($archive.Entries | ForEach-Object { $_.FullName.Replace('\', '/') })
  $payloadPrefix = "$archiveBase/"
  $unexpected = @($entries | Where-Object {
    $_ -ne 'README.TXT' -and
    $_ -ne 'VERSION.TXT' -and
    -not $_.StartsWith($payloadPrefix, [System.StringComparison]::Ordinal)
  })
  if ($unexpected.Count -gt 0) {
    throw "Invalid OVGME archive root. Expected '$archiveBase/' but found '$($unexpected[0])'."
  }
  if (-not ($entries | Where-Object { $_.StartsWith("${payloadPrefix}Config/Input/F4U-1D/joystick/", [System.StringComparison]::Ordinal) })) {
    throw 'OVGME archive is missing the F4U-1D joystick profile payload.'
  }
  if ($entries -notcontains "${payloadPrefix}Config/Input/F4U-1D/modifiers.lua") {
    throw 'OVGME archive is missing the F4U-1D modifiers.lua.'
  }
  $quadrantProfiles = @(
    'Logitech Flight Quadrant {1C8A8840-5386-11F1-8001-444553540000}.diff.lua',
    'Logitech Flight Quadrant {840BBBD0-2139-11f1-8001-444553540000}.diff.lua'
  )
  foreach ($profile in $quadrantProfiles) {
    if ($entries -notcontains "${payloadPrefix}Config/Input/F4U-1D/joystick/$profile") {
      throw "OVGME archive is missing Logitech quadrant profile '$profile'."
    }
  }
  if (-not ($entries | Where-Object { $_.StartsWith("${payloadPrefix}Config/Input/UiLayer/joystick/", [System.StringComparison]::Ordinal) })) {
    throw 'OVGME archive is missing the shared UI Layer joystick payload.'
  }
  if ($entries -notcontains "${payloadPrefix}Config/Input/UiLayer/modifiers.lua") {
    throw 'OVGME archive is missing the shared UI Layer modifiers.lua.'
  }
  if (-not ($entries | Where-Object { $_.StartsWith("${payloadPrefix}KNEEBOARD/F4U-1D/", [System.StringComparison]::Ordinal) })) {
    throw 'OVGME archive is missing the kneeboard payload.'
  }
  if ($entries -notcontains 'README.TXT') { throw 'OVGME archive is missing README.TXT.' }
  if ($entries -notcontains 'VERSION.TXT') { throw 'OVGME archive is missing VERSION.TXT.' }
}
finally {
  $archive.Dispose()
}

Write-Host "Package checksum and OVGME structure OK for $leaf"
