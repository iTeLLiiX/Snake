@echo off
echo 🚀 Bereite Assets für Upload vor...
echo.

REM Erstelle Upload-Ordner
if exist assets-upload rmdir /s /q assets-upload
mkdir assets-upload

REM Kopiere Assets mit vollständiger Ordnerstruktur
echo 📦 Kopiere Assets...

mkdir assets-upload\assets\images\snake 2>nul
mkdir assets-upload\assets\images\food 2>nul
mkdir assets-upload\assets\images\logo 2>nul
mkdir assets-upload\assets\images\ui\messages 2>nul

copy "assets\images\snake\snake_green_head.png" "assets-upload\assets\images\snake\" >nul
copy "assets\images\snake\snake_green_blob.png" "assets-upload\assets\images\snake\" >nul
copy "assets\images\food\apple_green.png" "assets-upload\assets\images\food\" >nul
copy "assets\images\food\Marijuana.png" "assets-upload\assets\images\food\" >nul
copy "assets\images\food\bomb.png" "assets-upload\assets\images\food\" >nul
copy "assets\images\logo\weedgame.png" "assets-upload\assets\images\logo\" >nul
copy "assets\images\ui\messages\Msg01.png" "assets-upload\assets\images\ui\messages\" >nul

echo.
echo ✅ Fertig! Assets sind im Ordner 'assets-upload'
echo.
echo 🚀 Nächster Schritt:
echo    1. Gehe zu GitHub
echo    2. Ziehe den 'assets-upload' Ordner in GitHub
echo    3. Benenne ihn zu 'assets' um
echo    4. Fertig! ✅
echo.
pause

