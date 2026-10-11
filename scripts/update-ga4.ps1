$ErrorActionPreference = "Stop"
if (!(Test-Path ".\index.html") -or !(Test-Path ".\vercel.json")) {
    throw "Open PowerShell inside your existing deployed website folder first."
}
$config = Get-Content ".\vercel.json" -Raw | ConvertFrom-Json
if ($config.buildCommand) {
    throw "This updater is for the extracted static Vercel package. For a source checkout, pull the latest GitHub commit instead."
}
$base = "https://raw.githubusercontent.com/ganewaththagajindu2011-glitch/1099-tax-calculator-/main"
$files = @("index.html", "about/index.html", "contact/index.html", "privacy/index.html", "guides/quarterly-taxes/index.html", "guides/1099-tax-deductions/index.html", "assets/analytics.js", "assets/analytics.css")
$stage = Join-Path $env:TEMP ("cleartax-ga4-" + [guid]::NewGuid())
foreach ($file in $files) {
    $target = Join-Path $stage $file
    New-Item -ItemType Directory -Force -Path (Split-Path $target) | Out-Null
    Invoke-WebRequest -UseBasicParsing -Uri "$base/$file" -OutFile $target
}
foreach ($file in $files) {
    $target = Join-Path (Get-Location).Path $file
    New-Item -ItemType Directory -Force -Path (Split-Path $target) | Out-Null
    Copy-Item -LiteralPath (Join-Path $stage $file) -Destination $target -Force
}
Write-Host "GA4 files updated. Disable Enhanced measurement in GA4, then run: npx vercel --prod" -ForegroundColor Green
