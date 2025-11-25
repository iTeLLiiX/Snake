# PowerShell Script: Kopiert nur die benötigten Assets
# Einfach ausführen: .\prepare-assets.ps1

Write-Host "🚀 Bereite Assets für Upload vor..." -ForegroundColor Green

# Erstelle Upload-Ordner
$uploadDir = "assets-upload"
if (Test-Path $uploadDir) {
    Remove-Item $uploadDir -Recurse -Force
}
New-Item -ItemType Directory -Path $uploadDir -Force | Out-Null

# Benötigte Assets (7 Dateien)
$assets = @(
    "assets/images/snake/snake_green_head.png",
    "assets/images/snake/snake_green_blob.png",
    "assets/images/food/apple_green.png",
    "assets/images/food/Marijuana.png",
    "assets/images/food/bomb.png",
    "assets/images/logo/weedgame.png",
    "assets/images/ui/messages/Msg01.png"
)

# Kopiere Assets
$copied = 0
foreach ($asset in $assets) {
    if (Test-Path $asset) {
        $dest = Join-Path $uploadDir $asset
        $destDir = Split-Path $dest -Parent
        if (-not (Test-Path $destDir)) {
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        }
        Copy-Item $asset $dest -Force
        $copied++
        Write-Host "✅ $asset" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Fehlt: $asset" -ForegroundColor Red
    }
}

Write-Host "`n✅ Fertig! $copied von $($assets.Count) Assets kopiert." -ForegroundColor Green
Write-Host "📦 Upload-Ordner: $uploadDir" -ForegroundColor Yellow
Write-Host "`n🚀 Nächster Schritt:" -ForegroundColor Green
Write-Host "   1. Gehe zu GitHub" -ForegroundColor White
Write-Host "   2. Ziehe den '$uploadDir' Ordner in GitHub" -ForegroundColor White
Write-Host "   3. Benenne ihn zu 'assets' um" -ForegroundColor White
Write-Host "   4. Fertig! ✅" -ForegroundColor White

