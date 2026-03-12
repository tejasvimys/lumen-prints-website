$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$distPath = Join-Path $root 'dist'
$zipPath = Join-Path $root 'dist.zip'

if (-not (Test-Path $distPath)) {
    throw "dist folder not found. Run npm run build first."
}

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Compress-Archive -Path (Join-Path $distPath '*') -DestinationPath $zipPath -Force
Write-Output "Created $zipPath"
